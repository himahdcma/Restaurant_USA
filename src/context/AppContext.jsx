import React, { createContext, useContext, useState, useEffect } from 'react';
import { restaurantInfo } from '../data/restaurantData';
import { mockRewardsUser } from '../data/rewardsData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // LocalStorage initialization helper
  const getInitialState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [cart, setCart] = useState(() => getInitialState('ember_oak_cart', []));
  const [fulfillmentMode, setFulfillmentMode] = useState(() => getInitialState('ember_oak_fulfillment', 'pickup'));
  const [selectedLocation, setSelectedLocation] = useState(restaurantInfo.locations[0]);
  
  // UI Overlays state
  const [cartOpen, setCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [finderOpen, setFinderOpen] = useState(false);
  const [groupOrderOpen, setGroupOrderOpen] = useState(false);
  
  // User state
  const [user, setUser] = useState(mockRewardsUser);
  
  // Tip state: default 18% (0.18)
  const [tipPercentage, setTipPercentage] = useState(0.18);
  const [customTipAmount, setCustomTipAmount] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ember_oak_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist fulfillment mode to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ember_oak_fulfillment', JSON.stringify(fulfillmentMode));
    } catch (e) {
      console.error('Failed to save fulfillment to localStorage', e);
    }
  }, [fulfillmentMode]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Add item to cart with specific customizations & quantity
  const addToCart = (item, selectedOptions = {}, quantity = 1, specialInstructions = '') => {
    // Calculate total price per item including extras
    let basePrice = item.price;
    
    // Add extra prices if selected
    if (selectedOptions.extras && Array.isArray(selectedOptions.extras)) {
      selectedOptions.extras.forEach(extra => {
        basePrice += extra.price || 0;
      });
    }

    if (selectedOptions.patty && selectedOptions.patty.priceOffset) {
      basePrice += selectedOptions.patty.priceOffset;
    }
    if (selectedOptions.cheese && selectedOptions.cheese.priceOffset) {
      basePrice += selectedOptions.cheese.priceOffset;
    }
    if (selectedOptions.base && selectedOptions.base.priceOffset) {
      basePrice += selectedOptions.base.priceOffset;
    }
    if (selectedOptions.protein && selectedOptions.protein.priceOffset) {
      basePrice += selectedOptions.protein.priceOffset;
    }

    const cartId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    
    const newItem = {
      cartId,
      item,
      unitPrice: basePrice,
      quantity,
      selectedOptions,
      specialInstructions,
      totalItemPrice: basePrice * quantity
    };

    setCart(prev => [...prev, newItem]);
    showToast(`Added ${quantity}x ${item.name} to order`);
  };

  const updateCartQuantity = (cartId, delta) => {
    setCart(prev => {
      return prev.map(cartItem => {
        if (cartItem.cartId === cartId) {
          const newQty = cartItem.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...cartItem,
            quantity: newQty,
            totalItemPrice: cartItem.unitPrice * newQty
          };
        }
        return cartItem;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Item removed from order', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Current Order state for confirmation & order tracking handoff
  const [currentOrder, setCurrentOrder] = useState(() => getInitialState('ember_oak_current_order', null));

  // Persist current order to localStorage
  useEffect(() => {
    try {
      if (currentOrder) {
        localStorage.setItem('ember_oak_current_order', JSON.stringify(currentOrder));
      }
    } catch (e) {
      console.error('Failed to save current order to localStorage', e);
    }
  }, [currentOrder]);

  const placeOrder = (orderData) => {
    const pointsEarned = Math.round(orderData.cartSubtotal || 0);
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'Order Received',
      statusStep: 1
    };

    setCurrentOrder(newOrder);

    // Update user rewards points
    if (pointsEarned > 0) {
      setUser(prev => ({
        ...prev,
        points: (prev.points || 0) + pointsEarned
      }));
    }

    // Clear cart after setting order
    setCart([]);
    return newOrder.orderId;
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalItemPrice, 0);
  const cartQuantityCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const taxAmount = cartSubtotal * restaurantInfo.taxRate;
  
  const tipAmount = customTipAmount !== null 
    ? customTipAmount 
    : (fulfillmentMode === 'dine-in' ? cartSubtotal * 0.20 : cartSubtotal * tipPercentage);
    
  const deliveryFee = fulfillmentMode === 'delivery' && cartSubtotal > 0 ? 3.99 : 0;
  const orderTotal = cartSubtotal + taxAmount + tipAmount + deliveryFee;

  return (
    <AppContext.Provider value={{
      cart,
      cartQuantityCount,
      cartSubtotal,
      taxAmount,
      tipAmount,
      tipPercentage,
      setTipPercentage,
      customTipAmount,
      setCustomTipAmount,
      deliveryFee,
      orderTotal,
      fulfillmentMode,
      setFulfillmentMode,
      selectedLocation,
      setSelectedLocation,
      cartOpen,
      setCartOpen,
      customizingItem,
      setCustomizingItem,
      finderOpen,
      setFinderOpen,
      groupOrderOpen,
      setGroupOrderOpen,
      user,
      setUser,
      currentOrder,
      setCurrentOrder,
      placeOrder,
      toast,
      showToast,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
