// products.js - Display products and connect Buy buttons
const PRODUCTS = [
  { id: 'aquamarine', name: 'Aquamarine', desc: 'Clean aquamarine — approx 2.5 carats — polished', price: 50, img: 'images/aquamarine.jpg' },
  { id: 'rhodolite', name: 'Rhodolite Garnet', desc: 'Rhodolite — polished, high lustre', price: 45, img: 'images/rhodolite.jpg' },
  { id: 'peridot', name: 'Peridot', desc: 'Vivid green peridot, natural cut stone', price: 40, img: 'images/peridot.jpg' },
  { id: 'amethyst', name: 'Amethyst', desc: 'Deep purple natural amethyst — polished', price: 55, img: 'images/amethyst.jpg' },
  { id: 'rosequartz', name: 'Rose Quartz', desc: 'Soft pink rose quartz — tumbled river stone', price: 30, img: 'images/rosequartz.jpg' },
  { id: 'citrine', name: 'Citrine', desc: 'Golden citrine — cut & polished', price: 60, img: 'images/citrine.jpg' }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-container');
  if (!container) return;

  PRODUCTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="meta">
        <span class="price">$${p.price}</span>
        <button class="buy" data-id="${p.id}">Buy Now</button>
      </div>
    `;
    container.appendChild(card);
  });

  renderCartCount();
});
