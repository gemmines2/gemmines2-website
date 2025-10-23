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
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">$${p.price}</div>
      <button class="buy-btn" data-index="${index}">Buy Now</button>
    `;
    grid.appendChild(card);
  });

  // Update footer year
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Add event listeners to Buy Now buttons
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productIndex = e.target.getAttribute('data-index');
      const selectedProduct = PRODUCTS[productIndex];
      
      // Save selected product to localStorage
      localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));

      // Redirect to checkout page
      window.location.href = 'checkout.html';
    });
  });
}

document.addEventListener('DOMContentLoaded', renderProducts);
🛒 Then on your checkout.html
Add this inside a <script> tag at the bottom before </body>:

html
Copy code
<script>
document.addEventListener('DOMContentLoaded', () => {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));

  if (product) {
    document.getElementById('checkout-item').innerHTML = `
      <img src="${product.img}" alt="${product.name}" style="width:100px;border-radius:8px;">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <strong>Price: $${product.price}</strong>
    `;
  } else {
    document.getElementById('checkout-item').innerHTML = '<p>No product selected.</p>';
  }
});
</script>
