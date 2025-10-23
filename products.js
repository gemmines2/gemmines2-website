const PRODUCTS = [
  { name: 'Aquamarine', desc: 'Clean aquamarine — approx 2.5 carats — polished', price: 50, img: 'images/aquamarine.jpg' },
  { name: 'Rhodolite Garnet', desc: 'Rhodolite — polished, high lustre', price: 45, img: 'images/rhodolite.jpg' },
  { name: 'Peridot', desc: 'Peridot — bright green, polished', price: 38, img: 'images/peridot.jpg' },
  { name: 'Hessonite', desc: 'Hessonite — rich honey-brown garnet (rough)', price: 35, img: 'images/hessonite.jpg' },
  { name: 'Green Jasper (rough)', desc: 'Green jasper — rough uncut stone', price: 30, img: 'images/green-jasper.jpg' },
  { name: 'Garnet', desc: 'Deep red natural garnet gemstone — polished and faceted', price: 42, img: 'images/garnet.jpg' }
];

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';

  PRODUCTS.forEach((p, i) => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy" class="card-img" />
      <h3 class="card-title">${p.name}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-bottom">
        <div class="card-price">$${p.price}</div>
        <button class="btn-primary buy-btn" data-index="${i}">Buy Now</button>
      </div>
    `;
    grid.appendChild(el);
  });

  // Add listeners
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.currentTarget.getAttribute('data-index');
      const product = PRODUCTS[idx];
      // Save to localStorage
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      // Go to checkout
      window.location.href = 'checkout.html';
    });
  });
}

document.addEventListener('DOMContentLoaded', renderProducts);
