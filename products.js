const products = [
  {
    id: "umbalite_001",
    name: "Rare Natural Unheated Reddish-Pink Umbalite Garnet 13ct",
    description: "Symbol of love, energy & passion. Eye clean loose gemstone from Africa.",
    image: "https://gemmines2.github.io/gemmines2-website/images/umbalitegarnet.jpg",
    price: 200.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "almandinegarnet_002",
    name: "Almandine Garnet Ring Set in Silver",
    description: "Deep red Almandine Garnet – Stone of strength, courage & protection.",
    image: "https://gemmines2.github.io/gemmines2-website/images/Almandine-ring.jpg",
    price: 125.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "peridot_004",
    name: "Natural Unheated 5 Carat Olive Green Peridot",
    description: "Fresh Peridot with Rare Rutile Inclusions from Pakistan.",
    image: "https://gemmines2.github.io/gemmines2-website/images/peridot.jpg",
    price: 100.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "greenjasper_005",
    name: "Natural Green Jasper Stones - 10+ Carats",
    description: "Opaque quality from Pakistan with beautiful lustre and color.",
    image: "https://gemmines2.github.io/gemmines2-website/images/green-jasper.jpg",
    price: 100.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "rhodolite_007",
    name: "68 Carat Huge Natural Unheated Rhodolite Garnet Rough",
    description: "Facet & Cabochon Grade. Stone of inspiration, love & joy.",
    image: "https://gemmines2.github.io/gemmines2-website/images/rhodolite.jpg",
    price: 350.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "opal_008",
    name: "Natural Opal Gemstone Collection – Multi-Color Fire Opals",
    description: "Symbol of purity, hope & emotional healing.",
    image: "https://gemmines2.github.io/gemmines2-website/images/opal.jpg",
    price: 220.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "hessonite_010",
    name: "Natural Uncut Hessonite Garnet Rough 68 carats",
    description: "Premium Gomed Raw Stone for spiritual growth and clarity.",
    image: "https://gemmines2.github.io/gemmines2-website/images/hessonite-garnet.jpg",
    price: 400.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "pinktourmaline_011",
    name: "20 CT Natural Unheated Pink Tourmaline Rough",
    description: "Collector Grade Raw Gemstone from Afghanistan.",
    image: "https://gemmines2.github.io/gemmines2-website/images/pink-tourmaline.jpg",
    price: 280.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "lemonquartz_rtz_012",
    name: "Natural Unheated Lemon Quartz 11.15 carats",
    description: "Vibrant Lemon Quartz – Stone of clarity & positive energy.",
    image: "https://gemmines2.github.io/gemmines2-website/images/lemon-quartz.jpg",
    price: 70.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
  id: "citrine_009", // We use the GMC ID even if it says 'citrine'
  name: "Natural Unheated Green Zircon - Eye Clean Precision Cut",
  description: "Rare Forest Green Earth-Mined Gemstone - Untreated & Polished.",
  image: "https://gemmines2.github.io/gemmines2-website/images/zircon.jpg",
  price: 90.00,
  availability: "in stock",
  brand: "Gemmines2"
},
  {
    id: "lemonquartz2_014",
    name: "Natural Eye-Clean Lemon Quartz Cut & Polished",
    description: "AAA Grade Faceted Lemon Quartz Loose Stone.",
    image: "https://gemmines2.github.io/gemmines2-website/images/lemon-quartz2.jpg",
    price: 140.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "citrine_015",
    name: "Natural Unheated Golden Citrine 4ct Heart Shape Ring",
    description: "Set in Italian Silver with Zircons.",
    image: "https://gemmines2.github.io/gemmines2-website/images/citrine-ring.jpg",
    price: 125.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "bluesapphire_016",
    name: "Stunning Sri Lankan Blue Sapphire (Heated) – 1.10 Carats",
    description: "Symbol of wisdom, virtue & good fortune.",
    image: "https://gemmines2.github.io/gemmines2-website/images/bluesapphire.jpg",
    price: 320.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "emerald_017",
    name: "Natural Unheated Cut and Polished Zambian Emeralds",
    description: "Premium Untreated Loose Gemstones Rich Green Hue.",
    image: "https://gemmines2.github.io/gemmines2-website/images/emeralds.jpg",
    price: 600.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "fluorite_018",
    name: "Natural Unheated Beautiful Blue Fluorite 58 Carats",
    description: "Rare High Clarity Polished Crystal Healing Stone.",
    image: "https://gemmines2.github.io/gemmines2-website/images/fluorite.jpg",
    price: 100.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "mixedgemstones_019",
    name: "Natural Mixed Lot Gemstones – Peridot, Garnet & Smoky Quartz",
    description: "Collection of rare mixed gemstones – Perfect for collectors.",
    image: "https://gemmines2.github.io/gemmines2-website/images/mixed-gemstones.jpg",
    price: 600.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "garnet_021",
    name: "Natural Unheated Garnet Ring Set in Silver",
    description: "Deep red Garnet – Stone of passion, love, and energy.",
    image: "https://gemmines2.github.io/gemmines2-website/images/garnet.jpg",
    price: 150.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "24",
    name: "Natural Unheated Pink Topaz 18ct Katlang Pakistan",
    description: "Cut and polished gemstone with slight inclusion.",
    image: "https://gemmines2.github.io/gemmines2-website/images/pinktopaz.jpg",
    price: 125.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "25",
    name: "Natural Unheated Blue Topaz Pair - Eye Clean",
    description: "Faceted Stunning Cut & Polished Sri Lankan Blue Topaz.",
    image: "https://gemmines2.github.io/gemmines2-website/images/blue-topaz.jpg",
    price: 120.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "26",
    name: "Natural Chrysoberyl Cat's Eye Gemstone",
    description: "Strong Chatoyancy Phenomenal Loose Cabochon.",
    image: "https://gemmines2.github.io/gemmines2-website/images/chrysoberyl-catseye.jpg",
    price: 250.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "27",
    name: "Natural Chrysoberyl Cat’s Eye set - 5 carats",
    description: "Multiple pieces with distinct star/eye effect.",
    image: "https://gemmines2.github.io/gemmines2-website/images/star-sapphire.jpg",
    price: 200.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "28",
    name: "Natural Almandine Garnet - 60 Carat Oval Cut",
    description: "Polished Reddish Purple - Unheated & Untreated.",
    image: "https://gemmines2.github.io/gemmines2-website/images/almandine.jpg",
    price: 125.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "29",
    name: "Premium Mixed Sapphire Collection - Multi-Color",
    description: "Natural multi-color loose sapphire gemstones.",
    image: "https://gemmines2.github.io/gemmines2-website/images/mixedsapphire.jpg",
    price: 400.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "30",
    name: "Natural Black Chert Tumbled Stone from Pakistan",
    description: "Smooth river rock specimen with deep black color.",
    image: "https://gemmines2.github.io/gemmines2-website/images/chert.jpg",
    price: 80.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "31",
    name: "4.80 Carat Natural Pink Kunzite Gemstone",
    description: "Unheated transparent oval-cut natural pink kunzite.",
    image: "https://gemmines2.github.io/gemmines2-website/images/pink-kunzite.jpg",
    price: 100.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "32",
    name: "1 Pairs Natural Blue Topaz Heart-Shape Gemstones",
    description: "Unheated heart-shaped gemstones from Sri Lanka.",
    image: "https://gemmines2.github.io/gemmines2-website/images/blue-topaz-heart.jpg",
    price: 140.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "34",
    name: "12 Carat Ferruginous Quartz Gemstone",
    description: "Vibrant Yellow with White Hues | Natural Loose Stone.",
    image: "https://gemmines2.github.io/gemmines2-website/images/ferruginous.jpg",
    price: 70.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "35",
    name: "Unheated Natural Black Moonstone – 18 Carats",
    description: "River Tumbled & Polished Gems with Stunning Sheen.",
    image: "https://gemmines2.github.io/gemmines2-website/images/blackmoonstone.jpg",
    price: 90.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "36",
    name: "Exquisite 27-Carat Natural Unheated Sri Lankan Sapphire Mix",
    description: "Blue, Yellow & Pink Gems from Ceylon.",
    image: "https://gemmines2.github.io/gemmines2-website/images/sapphire4.jpg",
    price: 130.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "13 Natural Zircon ",
    name: "94ct Natural Unheated Zircon - Rare Sri Lanka Origin",
    description: "Investment Grade Loose Gemstone.",
    image: "https://gemmines2.github.io/gemmines2-website/images/zircon94.jpg",
    price: 130.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "38",
    name: "Natural Unheated Mixed Sapphire Lot from Sri Lanka",
    description: "Cut & Polished Ceylon Gemstones.",
    image: "https://gemmines2.github.io/gemmines2-website/images/sapphirem24.jpg",
    price: 130.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "39",
    name: "2.15ct Natural Unheated Bi-Color Sapphire",
    description: "Rare Sri Lankan Origin – Pear Cut.",
    image: "https://gemmines2.github.io/gemmines2-website/images/bi-color-sapphire.jpeg",
    price: 95.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "40",
    name: "5.80ct Royal Blue Sapphire – Sri Lankan Origin",
    description: "Heated – Oval Brilliant Cut.",
    image: "https://gemmines2.github.io/gemmines2-website/images/darksapphire.jpeg",
    price: 120.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "Papardscha_43",
    name: "Heated Padparadscha Sapphire 2.93 Ct",
    description: "Sri Lankan Ceylon Pink-Orange Gem with Beautiful Luster.",
    image: "https://gemmines2.github.io/gemmines2-website/images/Padparadscha-sapphire.jpeg",
    price: 190.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "Ruby_44",
    name: "Natural Unheated Sri Lankan Ruby 1.06 Ct",
    description: "Vivid Red Ceylon Gemstone with Stunning Luster.",
    image: "https://gemmines2.github.io/gemmines2-website/images/ruby2.jpeg",
    price: 200.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "45",
    name: "Natural Translucent Green Nephrite Jade - 2 Carats",
    description: "Pakistan Origin Gemstone.",
    image: "https://gemmines2.github.io/gemmines2-website/images/greennephrite.jpg",
    price: 70.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "46",
    name: "Natural Unheated Sri Lankan Origin Spinal",
    description: "Multi-color 11.45 carats Sri Lankan origin.",
    image: "https://gemmines2.github.io/gemmines2-website/images/spinal9.jpg",
    price: 160.00,
    availability: "in stock",
    brand: "Gemmines2"
  }
];
