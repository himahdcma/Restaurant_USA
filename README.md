# Ember & Oak — Restaurant Digital Experience

A refined, direct-to-guest digital restaurant platform built for **Ember & Oak**, a contemporary American kitchen based in SoHo, New York.

This project combines an editorial visual design system with an end-to-end customer application spanning menu discovery, item customization, direct online ordering, table reservations, live order status tracking, member loyalty rewards, catering inquiries, and private event bookings.

---

## Key Customer Journeys

1. **Menu Discovery & Smart Food Finder**
   - Category filtering (Starters, Burgers, Mains, Bowls, Salads, Desserts, Craft Drinks).
   - Dietary tags (Vegetarian, Gluten Friendly, High Protein, Spicy, Under $20).
   - **Smart Food Finder**: Interactive 3-step recommendation tool matching guest cravings & dietary preferences with chef recommendations.

2. **Food Customization & Cart Experience**
   - Item customizer for patty choice, doneness, cheese options, extras, removals, side pairings, and kitchen notes.
   - Dynamic price calculation with real-time add-on offsets.
   - Slide-out Cart Drawer with fulfillment selector (Pickup, Delivery, Dine-In).

3. **Table Reservations & Special Occasions**
   - Interactive compact calendar date selection and time slot booking.
   - Seating preferences (Indoor, Patio, Bar, No Preference) and party counter (1–12 guests).
   - Occasion personalization (Birthday, Anniversary, Date Night, Business Dinner, Engagement).
   - Downloadable `.ics` calendar invitation generator and instant confirmation.

4. **Direct Checkout & Order Confirmation**
   - Multi-step fulfillment setup for Pickup or Local Delivery.
   - Tip selector (15%, 18%, 20%, 25%, Custom, No Tip) supporting 100% team gratuity.
   - Simulated payment authorization (Credit Card, Apple Pay, Google Pay).

5. **Live Order Tracking**
   - Real-time progression timeline (Received → Confirmed → Preparing → Out for Delivery / Ready for Pickup).
   - Dynamic ETA updates, pickup instructions, and guest rating feedback.

6. **Ember Rewards & Guest Retention**
   - Member points balance tracker ($1 spent = 1 Ember Point) with progress bar toward dining milestones.
   - Instant reward redemption modal ($10 Off, Free Starter, Free Dessert, $25 Feast).
   - Favorite dishes library and 1-tap re-order history.

7. **Catering, Group Orders & Private Dining**
   - Shared platters and team catering packages.
   - **Group Order Generator**: Unique shareable link for multi-person office orders.
   - **Private Event Inquiry Modal**: Booking inquiries for rehearsal dinners, engagement parties, and wedding receptions.

---

## Tech Stack & Architecture

- **Core Library**: React 18
- **Build Tooling**: Vite 6
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API (`AppContext.jsx`) with `localStorage` persistence
- **Styling**: Tailwind CSS (custom Warm Ivory `#F7F3EA`, Deep Forest `#17382C`, Charcoal `#22211F`, and Burnt Terracotta `#B95F3B` design system)
- **Typography**: Google Fonts (`DM Serif Display` + `Inter`)
- **Icons**: Lucide React
- **Animations**: Framer Motion (subtle opacity & transform transitions)

---

## Project Structure

```
Resturant_website/
├── public/
│   ├── favicon.svg             # Custom Ember & Oak monogram badge
│   └── _redirects              # SPA rewrite rule for Netlify / Render
├── src/
│   ├── assets/                 # Food photography & media
│   │   └── menu/               # 23 menu dish assets
│   ├── components/
│   │   ├── catering/           # Package cards & catering components
│   │   ├── common/             # Button, Badge, Logo, Modal, Toast, etc.
│   │   ├── food/               # FoodCard, FoodGrid, FoodCustomizer, CategoryTabs
│   │   ├── layout/             # Header, Footer, MobileNav
│   │   ├── ordering/           # CartDrawer, CartItem, PriceSummary, DiningMode
│   │   └── smartFinder/        # SmartFoodFinder modal
│   ├── context/
│   │   └── AppContext.jsx      # Global cart, order, reservation & rewards state
│   ├── data/
│   │   ├── menuData.js         # 23 curated menu items & options
│   │   ├── restaurantData.js   # Hours, locations & restaurant details
│   │   └── rewardsData.js      # Loyalty tiers & rewards list
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── ReservationsPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderTrackingPage.jsx
│   │   ├── RewardsPage.jsx
│   │   ├── CateringPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vercel.json                 # SPA fallback rewrite configuration
├── vite.config.js
└── package.json
```

---

## Local Setup & Run Commands

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/ember-and-oak.git
cd ember-and-oak

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Local Preview
```bash
# Generate production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment Notes

### Vercel / Netlify SPA Fallback Configuration
The application uses client-side routing via React Router DOM. SPA rewrite rules are included out of the box:
- `vercel.json` provides Vercel route rewrites to `index.html`.
- `public/_redirects` handles Netlify route redirects (`/* /index.html 200`).

---

## Integration & Demo Limitations

This portfolio repository presents a complete frontend digital hospitality experience. In a full production deployment, the frontend interfaces would connect to backend microservices for:
- Payment processor gateway (e.g., Stripe, Apple Pay JS).
- Point-of-Sale (POS) & Kitchen Display System (KDS) integration (e.g., Toast POS).
- Live Table Management & Reservation API (e.g., SevenRooms, OpenTable).
- Customer Relationship Management (CRM) & Loyalty Engine.
