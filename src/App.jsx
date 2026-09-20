import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { CartDrawer } from './components/ordering/CartDrawer';
import { FoodCustomizer } from './components/food/FoodCustomizer';
import { SmartFoodFinder } from './components/smartFinder/SmartFoodFinder';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { RewardsPage } from './pages/RewardsPage';
import { CateringPage } from './pages/CateringPage';
import { NotFoundPage } from './pages/NotFoundPage';

// ScrollToTop Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#22211F]">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderTrackingPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/catering" element={<CateringPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Overlays */}
        <CartDrawer />
        <FoodCustomizer />
        <SmartFoodFinder />
        <Toast />
      </div>
    </AppProvider>
  );
}

export default App;
