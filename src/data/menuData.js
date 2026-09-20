import truffleBurgerImg from "../assets/menu/truffle-mushroom-burger.jpg";
import hotHoneyChickenImg from "../assets/menu/hot-honey-glazed-chicken.jpg";
import grilledChickenBowlImg from "../assets/menu/fire-grilled-chicken-bowl.jpg";
import mapleSalmonImg from "../assets/menu/maple-glazed-atlantic-salmon.jpg";
import baconCheddarBurgerImg from "../assets/menu/smoked-bacon-cheddar-burger.jpg";
import brusselsBaconImg from "../assets/menu/charred-brussels-bacon.jpg";
import primeRibeyeImg from "../assets/menu/smoked-prime-ribeye.jpg";
import calamariShishitoImg from "../assets/menu/crispy-calamari-shishito.jpg";
import beetSaladImg from "../assets/menu/roasted-beet-goat-cheese-salad.jpg";
import cobbSaladImg from "../assets/menu/ember-house-cobb-salad.jpg";
import burrataFlatbreadImg from "../assets/menu/smoked-burrata-flatbread.jpg";
import shortRibBowlImg from "../assets/menu/chipotle-short-rib-bowl.jpg";
import macCheeseImg from "../assets/menu/smoked-gouda-mac-cheese.jpg";
import avocadoCornBowlImg from "../assets/menu/avocado-roasted-corn-bowl.jpg";
import lavaCakeImg from "../assets/menu/molten-chocolate-lava-cake.jpg";
import pecanTartImg from "../assets/menu/bourbon-pecan-pie-tart.jpg";
import churroBitesImg from "../assets/menu/wood-fired-churro-bites.jpg";
import oldFashionedImg from "../assets/menu/smoked-texas-old-fashioned.jpg";
import blackberryMargaritaImg from "../assets/menu/spiced-blackberry-margarita.jpg";
import hibiscusTeaImg from "../assets/menu/house-hibiscus-iced-tea.jpg";
import nitroEspressoImg from "../assets/menu/cold-brewed-nitro-espresso.jpg";
import porkBellyTacosImg from "../assets/menu/wood-fired-pork-belly-tacos.jpg";
import squashRavioliImg from "../assets/menu/brown-butter-squash-ravioli.jpg";

export const menuCategories = [
  { id: "all", label: "All Items" },
  { id: "popular", label: "Popular" },
  { id: "starters", label: "Starters & Small Plates" },
  { id: "burgers", label: "Wood-Fired Burgers" },
  { id: "mains", label: "Signature Mains" },
  { id: "bowls", label: "Grain Bowls" },
  { id: "salads", label: "Fresh Salads" },
  { id: "desserts", label: "Handcrafted Desserts" },
  { id: "drinks", label: "Craft Drinks" }
];

export const menuItems = [
  {
    id: "m_1",
    name: "Truffle Mushroom Burger",
    category: "burgers",
    price: 16.95,
    calories: 850,
    rating: 4.9,
    reviewCount: 342,
    popular: true,
    chefPick: true,
    badges: ["Popular", "Chef's Pick"],
    dietaryTags: ["High Protein"],
    spiceLevel: 0,
    description: "Custom beef blend, roasted wild mushrooms, black truffle aioli, aged Swiss cheese, caramelized onions on toasted brioche.",
    image: truffleBurgerImg,
    imageAlt: "Gourmet Truffle Mushroom Burger on wooden board",
    customizationOptions: {
      patties: [
        { name: "Double Smoked Beef", priceOffset: 0 },
        { name: "Grilled Chicken Breast", priceOffset: 0 },
        { name: "Beyond Meat® Plant Patty", priceOffset: 2.00 }
      ],
      cheeses: [
        { name: "Aged Swiss Cheese", priceOffset: 0 },
        { name: "Sharp Cheddar", priceOffset: 0 },
        { name: "Smoked Gouda", priceOffset: 1.00 },
        { name: "No Cheese", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_bacon", name: "Thick-Cut Applewood Bacon", price: 2.50 },
        { id: "ex_avocado", name: "Fresh Hass Avocado", price: 2.00 },
        { id: "ex_patty", name: "Extra Beef Patty", price: 4.00 },
        { id: "ex_egg", name: "Fried Sunny Egg", price: 1.75 }
      ],
      removals: ["Caramelized Onions", "Truffle Aioli", "Pickles"]
    }
  },
  {
    id: "m_2",
    name: "Hot Honey Glazed Chicken",
    category: "mains",
    price: 18.95,
    calories: 920,
    rating: 4.8,
    reviewCount: 215,
    popular: true,
    chefPick: false,
    badges: ["Popular", "Spicy"],
    dietaryTags: ["High Protein"],
    spiceLevel: 2,
    description: "Crispy buttermilk fried chicken breast drizzle with habanero wildflower honey, served over smoked cheddar grits and braised collards.",
    image: hotHoneyChickenImg,
    imageAlt: "Crispy Hot Honey Chicken with garnishes",
    customizationOptions: {
      sides: [
        { name: "Smoked Cheddar Grits & Collards", priceOffset: 0 },
        { name: "Truffle Hand-Cut Fries", priceOffset: 1.50 },
        { name: "Roasted Market Vegetables", priceOffset: 1.00 }
      ],
      extras: [
        { id: "ex_extra_honey", name: "Extra Habanero Honey Dip", price: 1.25 },
        { id: "ex_pickles", name: "House-Made Dill Pickles", price: 1.00 }
      ],
      removals: ["Habanero Honey", "Collard Greens"]
    }
  },
  {
    id: "m_3",
    name: "Fire-Grilled Chicken Bowl",
    category: "bowls",
    price: 17.50,
    calories: 620,
    rating: 4.9,
    reviewCount: 188,
    popular: true,
    chefPick: false,
    badges: ["Popular", "Healthy"],
    dietaryTags: ["High Protein", "Gluten Friendly", "Under 700 Cal"],
    spiceLevel: 1,
    description: "Oak-charred herb chicken breast, quinoa pilaf, roasted sweet potato, avocado, charred corn salsa, and cilantro lime dressing.",
    image: grilledChickenBowlImg,
    imageAlt: "Nourishing Grain Bowl with Fire-Grilled Chicken and Avocado",
    customizationOptions: {
      base: [
        { name: "Warm Quinoa Pilaf", priceOffset: 0 },
        { name: "Cauliflower Rice", priceOffset: 1.00 },
        { name: "Organic Baby Greens", priceOffset: 0 }
      ],
      protein: [
        { name: "Oak-Charred Chicken", priceOffset: 0 },
        { name: "Grilled Atlantic Salmon (+ $4.50)", priceOffset: 4.50 },
        { name: "Wood-Fired Tofu", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_extra_avocado", name: "Extra Hass Avocado", price: 2.00 },
        { id: "ex_goat_cheese", name: "Crumble Goat Cheese", price: 1.50 }
      ],
      removals: ["Cilantro", "Charred Corn Salsa", "Dressing"]
    }
  },
  {
    id: "m_4",
    name: "Maple Glazed Atlantic Salmon",
    category: "mains",
    price: 26.00,
    calories: 710,
    rating: 4.9,
    reviewCount: 164,
    popular: false,
    chefPick: true,
    badges: ["Chef's Pick", "Seafood"],
    dietaryTags: ["High Protein", "Gluten Friendly"],
    spiceLevel: 0,
    description: "Sustainably caught Atlantic salmon with bourbon maple glaze, charred broccolini, and parsnip velvet puree.",
    image: mapleSalmonImg,
    imageAlt: "Seared Maple Glazed Salmon with Broccolini",
    customizationOptions: {
      sides: [
        { name: "Charred Broccolini & Parsnip Puree", priceOffset: 0 },
        { name: "Roasted Fingerling Potatoes", priceOffset: 1.50 }
      ],
      doneness: [
        { name: "Medium Rare", priceOffset: 0 },
        { name: "Medium (Recommended)", priceOffset: 0 },
        { name: "Well Done", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_lemon_butter", name: "Garlic Lemon Butter", price: 1.50 }
      ],
      removals: ["Bourbon Maple Glaze", "Parsnip Puree"]
    }
  },
  {
    id: "m_5",
    name: "Smoked Bacon & Cheddar Burger",
    category: "burgers",
    price: 15.95,
    calories: 890,
    rating: 4.7,
    reviewCount: 290,
    popular: true,
    chefPick: false,
    badges: ["Popular"],
    dietaryTags: ["High Protein"],
    spiceLevel: 0,
    description: "Double smashed Angus patties, thick applewood bacon, aged Vermont cheddar, house BBQ sauce, crispy fried onions.",
    image: baconCheddarBurgerImg,
    imageAlt: "Juicy Smoked Bacon Cheddar Burger",
    customizationOptions: {
      patties: [
        { name: "Double Angus Beef", priceOffset: 0 },
        { name: "Grilled Chicken Breast", priceOffset: 0 }
      ],
      cheeses: [
        { name: "Vermont Cheddar", priceOffset: 0 },
        { name: "American Cheese", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_bacon_2", name: "Extra Applewood Bacon", price: 2.50 },
        { id: "ex_jalapenos", name: "Pickled Jalapeños", price: 1.00 }
      ],
      removals: ["BBQ Sauce", "Crispy Onions", "Pickles"]
    }
  },
  {
    id: "m_6",
    name: "Charred Brussels & Bacon Starter",
    category: "starters",
    price: 12.50,
    calories: 450,
    rating: 4.8,
    reviewCount: 140,
    popular: true,
    chefPick: true,
    badges: ["Popular", "Chef's Pick"],
    dietaryTags: ["Gluten Friendly"],
    spiceLevel: 0,
    description: "Cast-iron roasted Brussels sprouts, smoked bacon lardons, hot honey reduction, topped with shaved parmesan.",
    image: brusselsBaconImg,
    imageAlt: "Charred Brussels Sprouts with Bacon Lardons",
    customizationOptions: {
      extras: [
        { id: "ex_parm", name: "Extra Shaved Parmesan", price: 1.25 }
      ],
      removals: ["Bacon Lardons", "Hot Honey", "Parmesan"]
    }
  },
  {
    id: "m_7",
    name: "Smoked Prime Ribeye (14 oz)",
    category: "mains",
    price: 38.50,
    calories: 1050,
    rating: 4.9,
    reviewCount: 98,
    popular: false,
    chefPick: true,
    badges: ["Chef's Pick", "Premium"],
    dietaryTags: ["High Protein", "Keto Friendly"],
    spiceLevel: 0,
    description: "US Choice 14oz Ribeye wood-smoked over Texas oak, bone marrow butter, garlic herb smashed potatoes.",
    image: primeRibeyeImg,
    imageAlt: "Prime Ribeye Steak with Bone Marrow Butter",
    customizationOptions: {
      doneness: [
        { name: "Rare", priceOffset: 0 },
        { name: "Medium Rare (Recommended)", priceOffset: 0 },
        { name: "Medium", priceOffset: 0 },
        { name: "Medium Well", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_truffle_butter", name: "Truffle Herb Butter", price: 2.50 },
        { id: "ex_mushrooms", name: "Sautéed Wild Mushrooms", price: 4.00 }
      ],
      removals: ["Bone Marrow Butter"]
    }
  },
  {
    id: "m_8",
    name: "Crispy Calamari & Shishito",
    category: "starters",
    price: 14.50,
    calories: 580,
    rating: 4.7,
    reviewCount: 112,
    popular: false,
    chefPick: false,
    badges: ["Seafood"],
    dietaryTags: [],
    spiceLevel: 1,
    description: "Lightly battered wild calamari and blistered shishito peppers served with lemon garlic aioli and smoked marinara.",
    image: calamariShishitoImg,
    imageAlt: "Golden Crispy Calamari with Dipping Sauce",
    customizationOptions: {
      sauces: [
        { name: "Lemon Garlic Aioli & Smoked Marinara", priceOffset: 0 },
        { name: "Extra Garlic Aioli", priceOffset: 1.00 }
      ],
      removals: ["Shishito Peppers"]
    }
  },
  {
    id: "m_9",
    name: "Roasted Beet & Goat Cheese Salad",
    category: "salads",
    price: 14.95,
    calories: 420,
    rating: 4.8,
    reviewCount: 95,
    popular: false,
    chefPick: false,
    badges: ["Vegetarian", "Healthy"],
    dietaryTags: ["Vegetarian", "Gluten Friendly", "Under 700 Cal"],
    spiceLevel: 0,
    description: "Organic baby arugula, red and golden beets, whipped goat cheese, candied pecans, and orange maple vinaigrette.",
    image: beetSaladImg,
    imageAlt: "Fresh Roasted Beet Salad with Goat Cheese",
    customizationOptions: {
      addProtein: [
        { name: "None", priceOffset: 0 },
        { name: "Add Grilled Chicken Breast", priceOffset: 5.00 },
        { name: "Add Grilled Salmon", priceOffset: 7.00 }
      ],
      extras: [
        { id: "ex_pecans", name: "Extra Candied Pecans", price: 1.50 }
      ],
      removals: ["Goat Cheese", "Candied Pecans", "Beets"]
    }
  },
  {
    id: "m_10",
    name: "Ember House Cobb Salad",
    category: "salads",
    price: 16.50,
    calories: 680,
    rating: 4.9,
    reviewCount: 178,
    popular: true,
    chefPick: false,
    badges: ["Popular"],
    dietaryTags: ["High Protein", "Gluten Friendly", "Under 700 Cal"],
    spiceLevel: 0,
    description: "Wood-grilled chicken, soft boiled egg, applewood bacon, avocado, blue cheese crumbles, cherry tomatoes, house buttermilk ranch.",
    image: cobbSaladImg,
    imageAlt: "Ember Cobb Salad with Grilled Chicken and Eggs",
    customizationOptions: {
      dressing: [
        { name: "House Buttermilk Ranch", priceOffset: 0 },
        { name: "Blue Cheese Dressing", priceOffset: 0 },
        { name: "Balsamic Vinaigrette", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_extra_bacon_cobb", name: "Extra Bacon", price: 2.00 }
      ],
      removals: ["Blue Cheese", "Bacon", "Egg"]
    }
  },
  {
    id: "m_11",
    name: "Smoked Burrata & Heirloom Flatbread",
    category: "starters",
    price: 15.00,
    calories: 640,
    rating: 4.8,
    reviewCount: 130,
    popular: true,
    chefPick: true,
    badges: ["Popular", "Vegetarian"],
    dietaryTags: ["Vegetarian"],
    spiceLevel: 0,
    description: "Artisan wood-fired flatbread, creamy Italian burrata, heirloom cherry tomatoes, basil pesto, and aged balsamic glaze.",
    image: burrataFlatbreadImg,
    imageAlt: "Fresh Burrata Flatbread with Pesto and Balsamic",
    customizationOptions: {
      extras: [
        { id: "ex_prosciutto", name: "Add Prosciutto di Parma", price: 3.50 }
      ],
      removals: ["Balsamic Glaze", "Pesto"]
    }
  },
  {
    id: "m_12",
    name: "Chipotle Braised Short Rib Bowl",
    category: "bowls",
    price: 19.50,
    calories: 780,
    rating: 4.9,
    reviewCount: 210,
    popular: true,
    chefPick: true,
    badges: ["Popular", "Chef's Pick"],
    dietaryTags: ["High Protein"],
    spiceLevel: 2,
    description: "Slow-braised Angus short rib, warm brown rice, black bean salsa, pickled red onion, cotija cheese, chipotle crema.",
    image: shortRibBowlImg,
    imageAlt: "Braised Short Rib Bowl with Chipotle Crema",
    customizationOptions: {
      base: [
        { name: "Brown Rice", priceOffset: 0 },
        { name: "Quinoa", priceOffset: 0 },
        { name: "Greens Base", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_guac", name: "Fresh Guacamole", price: 2.50 }
      ],
      removals: ["Cotija Cheese", "Pickled Onions", "Chipotle Crema"]
    }
  },
  {
    id: "m_13",
    name: "Smoked Gouda Mac & Cheese",
    category: "starters",
    price: 11.50,
    calories: 720,
    rating: 4.9,
    reviewCount: 310,
    popular: true,
    chefPick: false,
    badges: ["Popular"],
    dietaryTags: ["Vegetarian"],
    spiceLevel: 0,
    description: "Cavatappi pasta baked in a cream sauce of smoked gouda, sharp cheddar, and fontina, topped with toasted garlic panko.",
    image: macCheeseImg,
    imageAlt: "Creamy Smoked Gouda Mac and Cheese with Panko Crust",
    customizationOptions: {
      extras: [
        { id: "ex_bacon_mac", name: "Add Crispy Bacon Bits", price: 2.00 },
        { id: "ex_shortrib_mac", name: "Add Braised Short Rib", price: 5.00 }
      ],
      removals: ["Garlic Panko Crust"]
    }
  },
  {
    id: "m_14",
    name: "Avocado & Roasted Corn Bowl",
    category: "bowls",
    price: 15.95,
    calories: 540,
    rating: 4.7,
    reviewCount: 88,
    popular: false,
    chefPick: false,
    badges: ["Vegetarian", "Healthy"],
    dietaryTags: ["Vegetarian", "Gluten Friendly", "Under 700 Cal"],
    spiceLevel: 1,
    description: "Chilled farro & kale, grilled street corn, fresh avocado, radishes, pepitas, and chimichurri vinaigrette.",
    image: avocadoCornBowlImg,
    imageAlt: "Healthy Avocado and Street Corn Bowl",
    customizationOptions: {
      extras: [
        { id: "ex_tofu", name: "Add Wood-Fired Tofu", price: 3.00 },
        { id: "ex_chicken", name: "Add Grilled Chicken", price: 4.50 }
      ],
      removals: ["Pepitas", "Chimichurri"]
    }
  },
  {
    id: "m_15",
    name: "Molten Chocolate Lava Cake",
    category: "desserts",
    price: 9.50,
    calories: 610,
    rating: 4.9,
    reviewCount: 260,
    popular: true,
    chefPick: true,
    badges: ["Popular", "Sweet"],
    dietaryTags: ["Vegetarian"],
    spiceLevel: 0,
    description: "Warm Valrhona dark chocolate cake with flowing fudge center, served with Madagascan vanilla bean ice cream.",
    image: lavaCakeImg,
    imageAlt: "Decadent Chocolate Lava Cake with Vanilla Ice Cream",
    customizationOptions: {
      iceCream: [
        { name: "Vanilla Bean Ice Cream", priceOffset: 0 },
        { name: "Salted Caramel Ice Cream", priceOffset: 1.00 },
        { name: "No Ice Cream", priceOffset: 0 }
      ],
      removals: ["Powdered Sugar"]
    }
  },
  {
    id: "m_16",
    name: "Bourbon Pecan Pie Tart",
    category: "desserts",
    price: 9.00,
    calories: 580,
    rating: 4.8,
    reviewCount: 110,
    popular: false,
    chefPick: false,
    badges: ["Sweet"],
    dietaryTags: ["Vegetarian"],
    spiceLevel: 0,
    description: "Southern toasted pecans, Kentucky bourbon caramel filling in an all-butter crust, served with fresh whipped cream.",
    image: pecanTartImg,
    imageAlt: "Bourbon Pecan Pie Tart with Fresh Cream",
    customizationOptions: {
      extras: [
        { id: "ex_vanilla_scoop", name: "Add Scoop Vanilla Ice Cream", price: 2.00 }
      ],
      removals: ["Whipped Cream"]
    }
  },
  {
    id: "m_17",
    name: "Wood-Fired Churro Bites",
    category: "desserts",
    price: 8.50,
    calories: 490,
    rating: 4.8,
    reviewCount: 145,
    popular: true,
    chefPick: false,
    badges: ["Popular"],
    dietaryTags: ["Vegetarian"],
    spiceLevel: 0,
    description: "Crispy cinnamon sugar pastries served with warm dark chocolate ganache and dulce de leche dipping cups.",
    image: churroBitesImg,
    imageAlt: "Cinnamon Sugar Churro Bites with Chocolate Sauce",
    customizationOptions: {
      sauces: [
        { name: "Chocolate Ganache & Dulce de Leche", priceOffset: 0 },
        { name: "Double Chocolate Ganache", priceOffset: 0 }
      ]
    }
  },
  {
    id: "m_18",
    name: "Smoked Texas Old Fashioned",
    category: "drinks",
    price: 14.00,
    calories: 210,
    rating: 4.9,
    reviewCount: 195,
    popular: true,
    chefPick: true,
    badges: ["Popular", "Craft Alcohol"],
    dietaryTags: [],
    spiceLevel: 0,
    description: "Balcones Texas Bourbon, pecan bitter syrup, flamed orange peel, smoked under oak chips served over a large clear ice cube.",
    image: oldFashionedImg,
    imageAlt: "Smoked Old Fashioned Cocktail in Heavy Glass",
    customizationOptions: {
      spirit: [
        { name: "Balcones Texas Bourbon", priceOffset: 0 },
        { name: "Rye Whiskey", priceOffset: 0 }
      ],
      removals: ["Flamed Orange Peel"]
    }
  },
  {
    id: "m_19",
    name: "Spiced Blackberry Margarita",
    category: "drinks",
    price: 13.50,
    calories: 190,
    rating: 4.8,
    reviewCount: 140,
    popular: true,
    chefPick: false,
    badges: ["Popular", "Craft Alcohol"],
    dietaryTags: [],
    spiceLevel: 1,
    description: "Reposado Tequila, wild blackberry puree, fresh lime juice, agave nectar with a smoked habanero salt rim.",
    image: blackberryMargaritaImg,
    imageAlt: "Vibrant Blackberry Margarita with Salt Rim",
    customizationOptions: {
      rim: [
        { name: "Smoked Habanero Salt Rim", priceOffset: 0 },
        { name: "Regular Sea Salt Rim", priceOffset: 0 },
        { name: "No Salt Rim", priceOffset: 0 }
      ]
    }
  },
  {
    id: "m_20",
    name: "House Hibiscus Botanical Iced Tea",
    category: "drinks",
    price: 4.50,
    calories: 45,
    rating: 4.7,
    reviewCount: 82,
    popular: false,
    chefPick: false,
    badges: ["Non-Alcoholic", "Refreshing"],
    dietaryTags: ["Under 700 Cal"],
    spiceLevel: 0,
    description: "Cold-brewed organic hibiscus flowers, mint leaf, lemongrass, sweetened with a light touch of raw honey.",
    image: hibiscusTeaImg,
    imageAlt: "Chilled Red Hibiscus Iced Tea with Fresh Mint",
    customizationOptions: {
      sweetness: [
        { name: "Lightly Sweetened (Default)", priceOffset: 0 },
        { name: "Unsweetened", priceOffset: 0 }
      ]
    }
  },
  {
    id: "m_21",
    name: "Cold-Brewed Nitro Espresso",
    category: "drinks",
    price: 5.50,
    calories: 10,
    rating: 4.8,
    reviewCount: 74,
    popular: false,
    chefPick: false,
    badges: ["Non-Alcoholic"],
    dietaryTags: ["Under 700 Cal"],
    spiceLevel: 0,
    description: "Single-origin Texas roasted beans nitrogen-infused for a silky, creamy cascade and rich dark chocolate notes.",
    image: nitroEspressoImg,
    imageAlt: "Nitro Cold Brew Coffee with Rich Foam",
    customizationOptions: {
      milk: [
        { name: "Black (No Milk)", priceOffset: 0 },
        { name: "Add Oat Milk", priceOffset: 0.75 },
        { name: "Add Whole Milk", priceOffset: 0 }
      ]
    }
  },
  {
    id: "m_22",
    name: "Wood-Fired Pork Belly Tacos",
    category: "starters",
    price: 13.95,
    calories: 670,
    rating: 4.9,
    reviewCount: 165,
    popular: true,
    chefPick: true,
    badges: ["Popular", "Chef's Pick"],
    dietaryTags: ["High Protein"],
    spiceLevel: 1,
    description: "Crispy oak-smoked pork belly, pickled radish, roasted pineapple salsa, cilantro, chipotle crema on heirloom corn tortillas.",
    image: porkBellyTacosImg,
    imageAlt: "Wood-Fired Pork Belly Tacos with Pineapple Salsa",
    customizationOptions: {
      tortillas: [
        { name: "Heirloom Corn Tortillas (Gluten-Free)", priceOffset: 0 },
        { name: "Flour Tortillas", priceOffset: 0 }
      ],
      extras: [
        { id: "ex_extra_taco", name: "Add 1 Extra Taco", price: 4.50 }
      ],
      removals: ["Chipotle Crema", "Pineapple Salsa", "Cilantro"]
    }
  },
  {
    id: "m_23",
    name: "Brown Butter Squash Ravioli",
    category: "mains",
    price: 21.00,
    calories: 680,
    rating: 4.9,
    reviewCount: 114,
    popular: false,
    chefPick: true,
    badges: ["Chef's Pick", "Vegetarian"],
    dietaryTags: ["Vegetarian", "Under 700 Cal"],
    spiceLevel: 0,
    description: "Handcrafted butternut squash ravioli, crispy sage leaves, toasted pine nuts, aged parmesan in brown butter sauce.",
    image: squashRavioliImg,
    imageAlt: "Brown Butter Squash Ravioli with Crispy Sage",
    customizationOptions: {
      extras: [
        { id: "ex_extra_parm", name: "Extra Shaved Parmesan", price: 1.50 },
        { id: "ex_pine_nuts", name: "Extra Toasted Pine Nuts", price: 2.00 }
      ],
      removals: ["Pine Nuts", "Crispy Sage"]
    }
  }
];

