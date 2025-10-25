const PRODUCTS = [
  { id: 'p1', name: 'Aquamarine', desc: 'Clean aquamarine — approx 2.5 carats — polished', price: 50, img: 'images/aquamarine.jpg' },
  { id: 'p2', name: 'Rhodolite Garnet', desc: 'Rhodolite — polished, high lustre', price: 45, img: 'images/rhodolite.jpg' },
  { id: 'p3', name: 'Emerald', desc: 'Natural green emerald, premium quality', price: 120, img: 'images/emerald.jpg' },
  { id: 'p4', name: 'Ruby', desc: 'High-quality polished ruby', price: 150, img: 'images/ruby.jpg' },
  { id: 'p5', name: 'Sapphire', desc: 'Deep blue sapphire — polished', price: 100, img: 'images/sapphire.jpg' },
  { id: 'p6', name: 'Topaz', desc: 'Golden topaz, polished', price: 40, img: 'images/topaz.jpg' }
];

// Generate product cards
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-container');
  if (!container) return;

  PRODUCTS.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-img">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.desc}</p>
      <p class="product-price">$${product.price}</p>
      <button class="buy" data-id="${product.id}">Buy Now</button>
    `;
    container.appendChild(card);
  });
});
