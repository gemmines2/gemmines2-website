const PRODUCTS = [
  { id: 'aquamarine', name: 'Aquamarine', desc: 'Clean aquamarine — approx 2.5 carats — polished', price: 50, img: 'images/aquamarine.jpg' },
  { id: 'rhodolite', name: 'Rhodolite Garnet', desc: 'Rhodolite — polished, high lustre', price: 45, img: 'images/rhodolite.jpg' },
  { id: 'peridot', name: 'Peridot', desc: 'Natural green peridot — tumbled, 2 carats', price: 35, img: 'images/peridot.jpg' },
  { id: 'lemon-quartz', name: 'Lemon Quartz', desc: 'Bright lemon quartz — polished crystal', price: 40, img: 'images/lemon-quartz.jpg' },
  { id: 'green-jasper', name: 'Green Jasper', desc: 'Earthy green jasper — natural pattern', price: 25, img: 'images/green-jasper.jpg' },
  { id: 'hessonite', name: 'Hessonite Garnet', desc: 'Golden orange hessonite — glossy finish', price: 55, img: 'images/hessonite.jpg' },
  { id: 'umbalite', name: 'Umbalite Garnet', desc: 'Rare umbalite — vivid pink-purple hue', price: 80, img: 'images/umbalite.jpg' },
  { id: 'emerald', name: 'Emerald', desc: 'Gorgeous green emerald — premium quality', price: 120, img: 'images/emerald.jpg' }
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
      <div class="meta">
        <div class="price">$${p.price}</div>
      </div>
      <button class="buy" data-id="${p.id}">Buy Now</button>
    `;
    container.appendChild(card);
  });

  // Handle "Buy Now" buttons
  document.querySelectorAll('.buy').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id);
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', renderProducts);
