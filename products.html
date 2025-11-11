<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products | Gemmines2</title>
  <link rel="stylesheet" href="style.css">
  <style>
    /* Section title */
    .section-title {
      text-align: center;
      color: var(--turquoise);
      font-family: "Playfair Display", serif;
      margin: 16px 0;
      font-size: 1.3rem;
    }

    /* Product grid */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 14px;
      margin-top: 6px;
    }

    /* Product card styling */
    .product-card {
      background: var(--card);
      border-radius: 12px;
      padding: 10px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.05);
      transition: transform .18s ease, box-shadow .18s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.5);
    }

    .product-card img {
      width: 200px;
      height: 200px;
      max-width: 100%;
      object-fit: cover;
      border-radius: 8px;
      margin: 0 auto 10px auto;
      display: block;
      background: #0a0f18;
    }

    .product-card h3 {
      margin: 4px 0;
      color: var(--turquoise);
      font-size: 0.9rem;
    }

    .product-card p {
      margin: 0 0 8px;
      color: var(--muted);
      font-size: 0.8rem;
      min-height: 36px;
    }

    .product-card .price {
      font-weight: 700;
      margin-bottom: 8px;
      color: var(--accent1);
    }

    /* Buy button */
    .buy-btn {
      background: linear-gradient(135deg, var(--accent1), var(--accent2));
      border: none;
      color: #000;
      font-weight: 700;
      font-size: 0.8rem;
      padding: 7px;
      border-radius: 8px;
      cursor: pointer;
      width: 100%;
      transition: transform .15s ease, box-shadow .15s ease;
    }

    .buy-btn:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 12px rgba(0,255,208,0.18);
    }

    @media (max-width:900px){
      .products-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px,1fr));
      }
      .product-card img {
        width: 160px;
        height: 160px;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <div class="logo">GM</div>
      <div>
        <h1>Gemmines2</h1>
        <small>Natural gemstones — cut, polished & tumbled</small>
      </div>
    </div>
    <nav>
      <a class="btn" href="index.html">Home</a>
      <a class="btn active" href="products.html">Products</a>
      <a class="btn" href="cart.html">Cart (<span id="cart-count">0</span>)</a>
      <a class="btn" href="contact.html">Contact</a>
    </nav>
  </header>

  <main class="container">
    <h2 class="section-title">Our Gemstone Collection</h2>
    <div class="products-grid" id="product-list"></div>
  </main>

  <footer>
    <p>
      &copy; <span id="year"></span> Gemmines2. All Rights Reserved. |
      <a href="return.html">Return Policy</a>
    </p>
  </footer>

  <!-- Scripts -->
  <script src="products.js"></script>
  <script src="cart.js"></script>
  <script>
    // Display current year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Render products dynamically
    function renderProducts() {
      const container = document.getElementById('product-list');
      if (!container) return;
      container.innerHTML = '';

      PRODUCTS.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
          <div class="price">$${product.price.toFixed(2)}</div>
          <button class="buy-btn" data-id="${product.id}">Buy Now</button>
        `;
        container.appendChild(card);
      });

      // Buy buttons
      document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.dataset.id;
          const product = PRODUCTS.find(p => p.id === id);
          if (product) {
            addToCart(product, 1);
            renderCartCount();
            window.location.href = 'cart.html';
          }
        });
      });
    }

    document.addEventListener('DOMContentLoaded', renderProducts);
  </script>
</body>
</html>
