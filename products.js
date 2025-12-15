const products = [
  {
    id: "umbalitegarnet_001",
    name: "Umbalite Garnet",
    description: "Rare Umbalite Garnet – Symbol of love, energy & passion.",
    image: "https://gemmines2.github.io/gemmines2-website/images/umbalitegarnet.jpg",
    price: 600.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "almandinegarnet_002",
    name: "Almandine Garnet",
    description: "Deep red Almandine Garnet – Stone of strength, courage & protection.",
    image: "https://gemmines2.github.io/gemmines2-website/images/Almandine-ring.jpg",
    price: 150.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "aquamarine_003",
    name: "Aquamarine",
    description: "Aquamarine – Stone of tranquility, clarity & courage.",
    image: "https://gemmines2.github.io/gemmines2-website/images/aquamarine.jpg",
    price: 300.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "peridot_004",
    name: "Peridot",
    description: "Fresh Peridot – Stone of compassion, harmony, and renewal.",
    image: "https://gemmines2.github.io/gemmines2-website/images/peridot.jpg",
    price: 90.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "greenjasper_005",
    name: "Green Jasper",
    description: "Green Jasper – Stone of harmony, balance, and protection.",
    image: "https://gemmines2.github.io/gemmines2-website/images/green-jasper.jpg",
    price: 150.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "tourmaline_006",
    name: "Green Tourmaline",
    description: "Natural Tourmaline – Protection, positivity & emotional healing.",
    image: "https://gemmines2.github.io/gemmines2-website/images/green-tourmaline.jpg",
    price: 300.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "rhodolite_007",
    name: "Rhodolite Garnet",
    description: "Elegant Rhodolite – Stone of inspiration, love & joy.",
    image: "https://gemmines2.github.io/gemmines2-website/images/rhodolite.jpg",
    price: 350.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "opal_008",
    name: "Opal",
    description: "Natural Opal – Symbol of purity, hope & emotional healing.",
    image: "https://gemmines2.github.io/gemmines2-website/images/opal.jpg",
    price: 220.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "citrine_009",
    name: "Natural Citrine",
    description: "Natural Citrine in Italian silver with zircon accents.",
    image: "https://gemmines2.github.io/gemmines2-website/images/Green-citrine.jpg",
    price: 125.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "hessonitegarnet_010",
    name: "Hessonite Garnet",
    description: "Premium Hessonite Garnet – Stone of spiritual growth, clarity & protection.",
    image: "https://gemmines2.github.io/gemmines2-website/images/hessonite-garnet.jpg",
    price: 400.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "pinktourmaline_011",
    name: "Pink Tourmaline",
    description: "Pink Tourmaline – Stone of love, emotional healing & inner peace.",
    image: "https://gemmines2.github.io/gemmines2-website/images/pink-tourmaline.jpg",
    price: 280.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "lemonquartz_012",
    name: "Lemon Quartz",
    description: "Vibrant Lemon Quartz – Stone of clarity & positive energy.",
    image: "https://gemmines2.github.io/gemmines2-website/images/lemon-quartz.jpg",
    price: 140.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "zircon_013",
    name: "Green Zircon",
    description: "Natural Zircon – Stone of balance & spiritual protection.",
    image: "https://gemmines2.github.io/gemmines2-website/images/zircon.jpg",
    price: 90.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "lemonquartz2_014",
    name: "Lemon Quartz 2",
    description: "Vibrant Lemon Quartz – Stone of clarity & positive energy.",
    image: "https://gemmines2.github.io/gemmines2-website/images/lemon-quartz2.jpg",
    price: 140.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "citrine_ring_015",
    name: "Citrine Ring",
    description: "Elegant Citrine Ring – Sparkling yellow quartz in silver setting.",
    image: "https://gemmines2.github.io/gemmines2-website/images/citrine-ring.jpg",
    price: 150.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "bluesapphire_016",
    name: "Blue Sapphire",
    description: "Natural Blue Sapphire – Symbol of wisdom, virtue & good fortune.",
    image: "https://gemmines2.github.io/gemmines2-website/images/bluesapphire.jpg",
    price: 320.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "emeralds_017",
    name: "Emerald",
    description: "Premium Zambian Emerald – Eye-clean and vibrant green.",
    image: "https://gemmines2.github.io/gemmines2-website/images/emeralds.jpg",
    price: 600.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "fluorite_018",
    name: "Fluorite",
    description: "Natural Fluorite – Stone of clarity, focus & positive energy.",
    image: "https://gemmines2.github.io/gemmines2-website/images/fluorite.jpg",
    price: 100.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "mixedgemstones_019",
    name: "Mixed Gemstones",
    description: "Collection of rare mixed gemstones – Perfect for collectors.",
    image: "https://gemmines2.github.io/gemmines2-website/images/mixed-gemstones.jpg",
    price: 600.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
  {
    id: "garnet_021",
    name: "Garnet",
    description: "Deep red Garnet – Stone of passion, love, and energy.",
    image: "https://gemmines2.github.io/gemmines2-website/images/garnet.jpg",
    price: 150.00,
    availability: "in stock",
    brand: "Gemmines2"
  },
{
  id: "pinkkunzite_004",
  name: "Natural Pink Kunzite – 4 Carats Loose Gemstone",
  price: "$380.00",
  image: "images/pinkkunzite.jpg",
  description: "Natural 4-carat Pink Kunzite gemstone with soft lilac-pink tones. Precision cut, eye-clean, and expertly polished to enhance brilliance and clarity. Displays subtle pink-to-violet pleochroism. Suitable for custom jewelry or gemstone collectors."
}
 

];
