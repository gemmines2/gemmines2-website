// === Gemmines2 Products ===
const PRODUCTS = [
  { id: 'aquamarine', name: 'Aquamarine', desc: 'Clean aquamarine — approx 2.5 carats — polished', price: 50, img: 'images/aquamarine.jpg' },
  { id: 'rhodolite', name: 'Rhodolite Garnet', desc: 'Rhodolite — polished, high lustre', price: 45, img: 'images/rhodolite.jpg' },
  { id: 'emerald', name: 'Emerald', desc: 'Gorgeous green emerald — premium quality', price: 120, img: 'images/emerald.jpg' },
  { id: 'peridot', name: 'Peridot', desc: 'Vibrant green peridot — natural & unheated', price: 60, img: 'images/peridot.jpg' },
  { id: 'lemon-quartz', name: 'Lemon Quartz', desc: 'Sunny lemon quartz — bright & elegant', price: 40, img: 'images/lemon-quartz.jpg' },
  { id: 'hessonite', name: 'Hessonite Garnet', desc: 'Deep honey-orange hessonite — polished', price: 55, img: 'images/hessonite.jpg' }
];

// === Render products ===
function renderProducts() {
  const container = document.getElementById('product-list');
  if (!container) return;
  container.innerHTML = '';

  PRODUCTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="meta">
        <div class="price">$${p.price}</div>
      </div>
      <button class="buy" data-id="${p.id}">Buy Now</button>
    `;
    container.appendChild(card);
  });
}

// === Handle Buy button click ===
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  document.body.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('buy')) {
      const id = e.target.getAttribute('data-id');
      if (typeof addToCart === 'function') {
        addToCart(id, 1);
        if (typeof renderCartCount === 'function') renderCartCount();
      }
      // Redirect to checkout page
      window.location.href = 'checkout.html';
    }
  });
});
// wire Buy buttons (works with cart.js)
document.querySelectorAll('.buy').forEach(btn => {
  btn.addEventListener('click', e => {
    const id = btn.dataset.id;
    if (typeof addToCart === 'function') {
      addToCart(id, 1);
      if (typeof renderCartCount === 'function') renderCartCount();

      // ✅ Small delay to ensure localStorage is saved before redirect
      setTimeout(() => {
        window.location.href = 'checkout.html';
      }, 200);

    } else {
      alert('Cart not ready yet');
    }
  });
});
