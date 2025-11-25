const products = [
  { id: 1, name: "Amethyst", image: "images/amethyst.jpg", price: "$180.00", description: "Natural polished Amethyst gemstone - Healing and spiritual calm." },
  { id: 2, name: "Aquamarine", image: "images/aquamarine.jpg", price: "$300.00", description: "Ocean-blue Aquamarine - Polished, calming, and elegant." },
  { id: 3, name: "Emerald", image: "images/emeralds.jpg", price: "$300.00", description: "Natural green emerald - Symbol of love and prosperity." },
  { id: 4, name: "Garnet", image: "images/garnet.jpg", price: "$120.00", description: "Deep red Garnet - Stone of passion, love, and energy." },
  { id: 5, name: "Green Jasper", image: "images/green-jasper.jpg", price: "$150.00", description: "Polished Green Jasper gemstone - Grounding and stability." },
  { id: 6, name: "Green Tourmaline", image: "images/green-tourmaline.jpg", price: "$180.00", description: "Premium natural Green Tourmaline - Rare and powerful." },
  { id: 7, name: "Mixed Gemstones", image: "images/mixed-gemstones.jpg", price: "$600.00", description: "Colorful assorted polished gemstones - Perfect for display or healing." },
  { id: 8, name: "Opal", image: "images/opal.jpg", price: "$800.00", description: "Ethiopian Opal - Fire play, mystical and mesmerizing." },
  { id: 9, name: "Peridot", image: "images/peridot.jpg", price: "$300.00", description: "Light-green Peridot - Stone of renewal and positivity." },
  { id: 10, name: "Rhodolite", image: "images/rhodolite.jpg", price: "$350.00", description: "Elegant Rhodolite Garnet - Polished, deep rose color." },
  { id: 11, name: "Lemon Quartz", image: "images/lemon-quartz.jpg", price: "$80.00", description: "Bright Lemon Quartz - Polished, excellent clarity." },
  { id: 12, name: "Blue Sapphire", image: "images/bluesapphire.jpg", price: "$300.00", description: "Stunning polished Blue Sapphire - Royal elegance." }
];

// Render products
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">${product.price}</div>
      <button class="buy-btn" onclick="addToCart(${product.id})">Buy Now</button>
    </div>
  `).join("");
}
