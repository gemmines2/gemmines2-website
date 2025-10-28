const PRODUCTS = [
  { id: 'aquamarine', name:'Aquamarine', desc:'Clean aquamarine — approx 2.5 carats — polished', price:50, img:'images/aquamarine.jpg' },
  { id: 'rhodolite', name:'Rhodolite Garnet', desc:'Rhodolite — polished, high lustre', price:45, img:'images/rhodolite.jpg' },
  { id: 'emerald', name:'Emerald', desc:'Gorgeous green emerald — premium quality', price:120, img:'images/emerald.jpg' },
];

// Render products in a responsive grid
function renderProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  
  PRODUCTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="product-img" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="meta">
        <div class="price">$${p.price}</div>
      </div>
      <button class="buy btn-primary" data-id="${p.id}">Buy Now</button>
    `;
    container.appendChild(card);
  });
}

// Initialize products on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
