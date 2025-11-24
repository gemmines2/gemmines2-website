const products = [
  {
    id: 1,
    name: "Zircon",
    image: "images/zircon.jpg",
    price: 90.00,
    currency: "USD",
    description: "Natural Zircon gemstone - brilliant sparkle and elegance."
  },
  {
    id: 2,
    name: "Almandine Garnet",
    image: "images/almandine-garnet.jpg",
    price: 150.00,
    currency: "USD",
    description: "Rich deep-red Almandine Garnet - stone of love and strength."
  },
  {
    id: 3,
    name: "Hessonite Garnet",
    image: "images/hessonite.jpg",
    price: 400.00,
    currency: "USD",
    description: "Premium Hessonite Garnet - rare and astrologically significant."
  },
  {
    id: 4,
    name: "Tourmaline",
    image: "images/tourmaline.jpg",
    price: 180.00,
    currency: "USD",
    description: "Natural Tourmaline - stunning clarity and vivid color."
  },
  {
    id: 5,
    name: "Aquamarine",
    image: "images/aquamarine.jpg",
    price: 300.00,
    currency: "USD",
    description: "Elegant Aquamarine - calming ocean-blue elegance."
  },
  {
    id: 6,
    name: "Mixed Gemstones",
    image: "images/mixed-gemstones.jpg",
    price: 600.00,
    currency: "USD",
    description: "Collection of premium natural mixed gemstones."
  },
  {
    id: 7,
    name: "Blue Sapphire",
    image: "images/bluesapphire.jpg",
    price: 90.00,
    currency: "USD",
    description: "Royal Blue Sapphire - ethically sourced polished gem."
  },
  {
    id: 8,
    name: "Umbalite",
    image: "images/umbalite.jpg",
    price: 600.00,
    currency: "USD",
    description: "High-quality rare Umbalite Garnet - luxury and beauty."
  },
  {
    id: 9,
    name: "Rhodolite",
    image: "images/rhodolite.jpg",
    price: 350.00,
    currency: "USD",
    description: "Stunning Rhodolite Garnet - deep rose, premium polished."
  },
  {
    id: 10,
    name: "Peridot",
    image: "images/peridot.jpg",
    price: 350.00,
    currency: "USD",
    description: "Lime-green Peridot - stone of positivity and renewal."
  },
  {
    id: 11,
    name: "Citrine",
    image: "images/citrine.jpg",
    price: 125.00,
    currency: "USD",
    description: "Natural Citrine - symbol of wealth and happiness."
  }
];

// Render Products into HTML
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button class="buy-btn" onclick="addToCart(${product.id})">Buy Now</button>
      </div>
      `
    )
    .join("");
}
