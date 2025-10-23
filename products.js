<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gemmines2 | Products</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      background: linear-gradient(135deg, #000814, #001d3d);
      color: #fff;
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
    }
    header {
      text-align: center;
      padding: 20px;
      background: #001d3d;
      border-bottom: 1px solid #003566;
    }
    header h1 {
      color: #ffd60a;
    }
    #products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      padding: 40px;
      max-width: 1200px;
      margin: auto;
    }
    .product {
      background: #001d3d;
      border: 1px solid #003566;
      border-radius: 12px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 0 10px rgba(0,0,0,0.4);
      transition: transform 0.3s;
    }
    .product:hover {
      transform: translateY(-5px);
    }
    .product img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 10px;
    }
    .price {
      color: #ffd60a;
      font-weight: bold;
      margin: 5px 0;
    }
    .buy-btn {
      background: #ffd60a;
      color: #000;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.3s;
    }
    .buy-btn:hover {
      background: #ffc300;
    }
    footer {
      text-align: center;
      padding: 20px 0;
      border-top: 1px solid #003566;
      color: #aaa;
    }
  </style>
</head>
<body>

  <header>
    <h1>Gemmines2 Product Collection</h1>
  </header>

  <section id="products-grid"></section>

  <footer>
    &copy; <span id="year"></span> Gemmines2. All rights reserved.
  </footer>

  <script src="products.js"></script>
</body>
</html>
🟩 Step 2 — products.js
Replace your products.js with this exact code.
This version keeps your images visible, adds Buy Now buttons, and correctly redirects to checkout.

js
Copy code
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

  // Event listeners for Buy Now buttons
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const selectedProduct = PRODUCTS[index];
      localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
      window.location.href = 'checkout.html';
    });
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', renderProducts);
