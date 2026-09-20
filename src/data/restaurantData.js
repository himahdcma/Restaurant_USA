export const restaurantInfo = {
  name: "Ember & Oak",
  tagline: "Modern American Kitchen",
  description: "Crafted around open wood fires, seasonal local ranching, and authentic American culinary heritage in SoHo.",
  phone: "(212) 555-0198",
  email: "hello@emberandoak.com",
  rating: 4.8,
  reviewCount: 324,
  prepTimePickup: "20-30 min",
  prepTimeDelivery: "35-45 min",
  status: "Open Now",
  hoursText: "Mon–Thu: 11 AM–10 PM | Fri–Sat: 11 AM–11 PM | Sun: 11 AM–9 PM",
  taxRate: 0.08875, // 8.875% tax
  locations: [
    {
      id: "soho",
      name: "Mercer Street SoHo",
      address: "123 Mercer Street, New York, NY 10012",
      phone: "(212) 555-0198",
      hours: "Mon–Thu 11 AM–10 PM, Fri–Sat 11 AM–11 PM, Sun 11 AM–9 PM",
      isPrimary: true
    }
  ],
  announcement: "🔥 Seasonal Menu Highlight: Maple Glazed Atlantic Salmon & Truffle Wood-Fired Burger now live!"
};

export const diningModes = [
  { id: "pickup", label: "PICKUP", time: "Ready in 20–30 min", icon: "ShoppingBag" },
  { id: "delivery", label: "DELIVERY", time: "35–45 min", icon: "Truck" },
  { id: "dine-in", label: "DINE-IN", time: "Reserve your table", icon: "Utensils" }
];
