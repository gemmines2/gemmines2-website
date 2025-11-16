
const PRODUCTS = [
  { id: 'aquamarine', name: 'Aquamarine', desc: 'Clean aquamarine — approx 2.5 carats — polished', price: 300.00, img: 'images/aquamarine.jpg' },
  { id: 'rhodolite', name: 'Rhodolite Garnet', desc: 'Rhodolite — polished, high lustre', price: 350.00, img: 'images/rhodolite.jpg' },
  { id: 'peridot', name: 'Peridot', desc: 'Natural green peridot — tumbled', price: 350.00, img: 'images/peridot.jpg' },
  { id: 'lemon-quartz', name: 'Lemon Quartz', desc: 'Bright lemon quartz — polished crystal', price: 40.00, img: 'images/lemon-quartz.jpg' },
  { id: 'green-jasper', name: 'Green Jasper', desc: 'Earthy green jasper — natural pattern', price: 150.00, img: 'images/green-jasper.jpg' },
  { id: 'hessonite', name: 'Hessonite Garnet', desc: 'Golden orange hessonite — glossy finish', price: 300.00, img: 'images/hessonite.jpg' },
  { id: 'umbalite', name: 'Umbalite Garnet', desc: 'Rare umbalite — vivid pink-purple hue', price: 600.00, img: 'images/umbalitegarnet.jpg' },
  { id: 'emerald', name: 'Emerald', desc: 'Gorgeous green emerald — premium quality', price: 800.00, img: 'images/emeralds.jpg' },
  { id: 'opal', name: 'Natural Opal Gemstone', desc: 'Beautiful multi-color opal gemstone, cut and polished. Worldwide shipping available.', price: 1500.00, img: 'images/opal.jpg' },
  { id: 'amethyst', name: 'Natural Amethyst Gemstone', desc: 'Vibrant purple natural amethyst, cut and polished to perfection. Worldwide shipping available.', price: 300.00, img: 'images/amethyst.jpg' },
  { id: 'garnet', name: 'Natural Garnet Gemstone', desc: 'Brilliant red natural garnet, cut and polished with exceptional clarity. Worldwide shipping available.', price: 49.99, img: 'images/garnet.jpg' }
];

function renderProducts() {
  const container = document.getElementById('product-list');
  if (!container) return;

  container.innerHTML = '';

  PRODUCTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button class="buy-btn" data-id="${p.id}">Buy Now</button>
    `;
    container.appendChild(card);
  });

  // Event listeners for Buy buttons
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = e.target.dataset.id;
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        addToCart(product, 1);
        renderCartCount();
        window.location.href = 'cart.html';
      }
    });
  });
}
