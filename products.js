// products.js
const PRODUCTS = [
  { id: 'aquamarine', name: 'Aquamarine', desc: 'Clean aquamarine — approx 2.5 carats — polished', price: 300.00, img: 'images/aquamarine.jpg' },
  { id: 'rhodolite', name: 'Rhodolite Garnet', desc: 'Rhodolite — polished, high lustre', price: 350.00, img: 'images/rhodolite.jpg' },
  { id: 'peridot', name: 'Peridot', desc: 'Natural green peridot — tumbled', price: 350.00, img: 'images/peridot.jpg' },
  { id: 'lemon-quartz', name: 'Lemon Quartz', desc: 'Bright lemon quartz — polished crystal', price: 40, img: 'images/lemon-quartz.jpg' },
  { id: 'green-jasper', name: 'Green Jasper', desc: 'Earthy green jasper — natural pattern', price: 150.00, img: 'images/green-jasper.jpg' },
  { id: 'hessonite', name: 'Hessonite Garnet', desc: 'Golden orange hessonite — glossy finish', price: 300.00, img: 'images/hessonite.jpg' },
  { id: 'umbalite', name: 'Umbalite Garnet', desc: 'Rare umbalite — vivid pink-purple hue', price: 600.00, img: 'images/umbalite.jpg' },
  { id: 'emerald', name: 'Emerald', desc: 'Gorgeous green emerald — premium quality', price: 800, img: 'images/emerald.jpg' }
];
const products = [
  {
    id: "opal",
    name: "Natural Opal Gemstone",
    description: "Beautiful multi-color opal gemstone, cut and polished. Worldwide shipping available.",
    price: 59.99,
    image: "images/opal.jpg"
  },
  {
    id: "amethyst",
    name: "Natural Amethyst Gemstone",
    description: "Vibrant purple natural amethyst, cut and polished to perfection. Worldwide shipping available.",
    price: 45.99,
    image: "images/amethyst.jpg"
  },
  {
    id: "emerald",
    name: "Natural Emerald Gemstone",
    description: "Rich green emerald, ethically sourced and expertly polished. Worldwide shipping available.",
    price: 79.99,
    image: "images/emerald.jpg"
  },
  {
    id: "garnet",
    name: "Natural Garnet Gemstone",
    description: "Brilliant red natural garnet, cut and polished with exceptional clarity. Worldwide shipping available.",
    price: 49.99,
    image: "images/garnet.jpg"
  }
];

// Render products into the page
const productList = document.getElementById("product-list");

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <button class="buy" data-id="${product.id}">Buy Now - $${product.price}</button>
  `;
  productList.appendChild(card);
});
function renderProducts() {
  const container = document.getElementById('product-list');
  if (!container) return;

  container.innerHTML = '';

  PRODUCTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
      </div>
      <div class="meta">
        <div class="price">$${p.price.toFixed(2)}</div>
      </div>
      <button class="buy-btn" data-id="${p.id}">Buy Now</button>
    `;
    container.appendChild(card);
  });

  // Add event listeners for Buy Now buttons
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = e.target.dataset.id;
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        addToCart(product, 1); // ensure only one item is added
        renderCartCount(); // update cart badge
        window.location.href = 'cart.html'; // redirect to cart (not checkout)
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderProducts);
