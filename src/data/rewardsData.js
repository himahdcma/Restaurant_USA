export const mockRewardsUser = {
  id: "usr_78912",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "(212) 555-0184",
  tier: "Member",
  points: 780,
  nextTierPoints: 1000,
  memberSince: "2023",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  availableRewards: [
    {
      id: "rw_1",
      title: "Free Dessert",
      description: "Complimentary Chocolate Skillet Cookie or Lava Cake with any main course.",
      pointsCost: 100,
      code: "FREE-DESSERT-100"
    },
    {
      id: "rw_2",
      title: "$10 Dining Reward",
      description: "$10 off your next pickup or delivery order.",
      pointsCost: 250,
      code: "10OFF-DINING-250"
    },
    {
      id: "rw_3",
      title: "Free Entrée",
      description: "Any burger, bowl, or pasta on the house.",
      pointsCost: 500,
      code: "FREE-ENTREE-500"
    },
    {
      id: "rw_4",
      title: "$25 Dining Reward",
      description: "$25 off your next dinner or celebratory meal.",
      pointsCost: 1000,
      code: "25OFF-DINING-1000"
    }
  ],
  favoriteDishIds: ["m_1", "m_3", "m_7"],
  recentOrders: [
    {
      id: "ORD-88219",
      date: "Sep 14, 2026",
      total: 42.85,
      fulfillmentMode: "pickup",
      itemsCount: 2,
      status: "Completed",
      itemsSummary: "Truffle Mushroom Burger, Hot Honey Chicken Wings",
      itemIds: ["m_1", "m_8"]
    },
    {
      id: "ORD-77104",
      date: "Aug 29, 2026",
      total: 68.20,
      fulfillmentMode: "delivery",
      itemsCount: 3,
      status: "Completed",
      itemsSummary: "Maple Glazed Salmon, Charred Brussels Bowl, Smoked Old Fashioned",
      itemIds: ["m_4", "m_5", "m_10"]
    }
  ]
};
