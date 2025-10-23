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
  grid.innerHTML = '';

  PRODUCTS.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">$${p.price}</div>
      <button class="buy-btn" data-index="${index}">Buy Now</button>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const selectedProduct = PRODUCTS[index];
      localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
      window.location.href = 'checkout.html';
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', renderProducts);
