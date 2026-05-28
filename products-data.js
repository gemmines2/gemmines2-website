<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q3WG0QN79D"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Q3WG0QN79D');</script>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gemstone Collection | Gemmines2</title>
  <meta name="description" content="Browse our full collection of 100% natural, certified gemstones from Pakistan and Sri Lanka. Sapphires, rubies, garnets, opals and custom silver jewelry.">
  <link rel="icon" href="images/logo.png">
  <link rel="stylesheet" href="style.css">
  <style>
    .page-hero { padding: 60px 5% 40px; background: #0a1430; border-bottom: 1px solid rgba(32,178,170,0.2); text-align: center; margin-top: 70px; }
    .page-hero h1 { font-family:'Cinzel', serif; font-size: 2.2rem; color: #20B2AA; margin: 0; }
    .page-hero p { font-size:14px; color:#ced4da; margin-top:8px; }

    .shop-layout { display:grid; grid-template-columns:240px 1fr; gap:36px; padding:40px 5%; max-width:1300px; margin:0 auto; }

    /* SIDEBAR FILTERS */
    .sidebar { position:sticky; top:88px; align-self:start; }
    .filter-box { background:#0a1430; border:1px solid rgba(32,178,170,0.2); border-radius:8px; padding:22px; margin-bottom:18px; }
    .filter-title { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#20B2AA; margin-bottom:16px; font-family:'Cinzel', serif; }
    .filter-option { display:flex; align-items:center; gap:10px; padding:7px 0; cursor:pointer; }
    .filter-option input { accent-color:#20B2AA; width:15px; height:15px; cursor:pointer; }
    .filter-option label { font-size:13px; color:#ced4da; cursor:pointer; transition:color .2s; }
    .filter-option:hover label { color:#fff; }
    
    /* PRODUCTS INVENTORY AREA */
    .products-toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px; }
    .product-count { font-size:13px; color:#ced4da; }
    .products-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:24px; }
    
    .prod-card { background:#0a1430; border:1px solid rgba(32,178,170,0.15); border-radius:8px; overflow:hidden; transition:transform .3s, border-color .3s; display: flex; flex-direction: column; justify-content: space-between; padding: 15px; }
    .prod-card:hover { transform:translateY(-4px); border-color:#20B2AA; }
    .prod-img-box { position: relative; width: 100%; height: 220px; background: #020612; border-radius: 6px; overflow: hidden; }
    .prod-img { width:100%; height:100%; object-fit:cover; }
    
    .prod-info { padding: 15px 0 0; display: flex; flex-direction: column; flex-grow: 1; }
    .prod-badge { font-size: 10px; color: #20B2AA; border: 1px solid #20B2AA; padding: 2px 6px; border-radius: 3px; align-self: flex-start; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; }
    .prod-title { font-family:'Cinzel', serif; font-size:1.1rem; color:#fff; margin:0 0 10px; min-height: 45px; }
    .prod-desc { font-size:13px; color:#ced4da; margin-bottom:15px; flex-grow: 1; }
    
    .prod-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px; margin-top: auto; }
    .prod-price { font-size: 1.3rem; font-weight: 700; color: #fff; }
    .action-btn { background:#20B2AA; color:#000; border:none; padding:10px 20px; border-radius:4px; font-family:'Cinzel', serif; font-weight:bold; cursor:pointer; font-size:0.85rem; }
    .action-btn:hover { background:#17968f; }

    @media (max-width: 768px) {
      .shop-layout { grid-template-columns: 1fr; }
      .sidebar { display: none; }
    }
  </style>
</head>
<body>

<header style="position:fixed; top:0; left:0; right:0; background:#0a0a0a; border-bottom:1.5px solid #20B2AA; padding:15px 5%; display:flex; justify-content:space-between; align-items:center; z-index:1000;">
  <div style="font-family:'Cinzel'; font-size:1.5rem;"><a href="index.html" style="color:#20B2AA; text-decoration:none;"><strong>Gemmines2</strong></a></div>
  <nav>
    <a href="index.html" style="margin-left:20px; color:#20B2AA; text-decoration:none; font-family:'Cinzel'; font-size:0.85rem; font-weight:700;">Home</a>
    <a href="products.html" style="margin-left:20px; color:#20B2AA; text-decoration:none; font-family:'Cinzel'; font-size:0.85rem; font-weight:700;">Products</a>
    <a href="cart.html" style="margin-left:20px; color:#20B2AA; text-decoration:none; font-family:'Cinzel'; font-size:0.85rem; font-weight:700;">Cart</a>
    <a href="contact.html" style="margin-left:20px; color:#20B2AA; text-decoration:none; font-family:'Cinzel'; font-size:0.85rem; font-weight:700;">Contact</a>
  </nav>
</header>

<div class="page-hero">
  <h1>Natural Gemstone <em>Collection</em></h1>
  <p>100% natural, completely unheated and certified gemstone selections.</p>
</div>

<div class="shop-layout">
  <aside class="sidebar">
    <div class="filter-box">
      <div class="filter-title">Origin</div>
      <div class="filter-option"><input type="checkbox" id="origin-sl"><label for="origin-sl">Sri Lanka</label></div>
      <div class="filter-option"><input type="checkbox" id="origin-pk"><label for="origin-pk">Pakistan</label></div>
    </div>
  </aside>

  <main class="products-area">
    <div class="products-toolbar">
      <div class="product-count"><span id="count-num">8</span> items found</div>
    </div>
    <div class="products-grid" id="catalog-grid"></div>
  </main>
</div>

<footer style="background:#030610; padding:40px 5%; border-top:2px solid #20B2AA; text-align:center; margin-top:80px;">
  <div style="margin-bottom: 20px;">
    <a href="index.html" style="color:#20B2AA; text-decoration:none; margin:0 10px; font-size:13px; font-weight:600;">Home</a> | 
    <a href="products.html" style="color:#20B2AA; text-decoration:none; margin:0 10px; font-size:13px; font-weight:600;">Products</a> | 
    <a href="return.html" style="color:#20B2AA; text-decoration:none; margin:0 10px; font-size:13px; font-weight:600;">Returns</a> | 
    <a href="shipping.html" style="color:#20B2AA; text-decoration:none; margin:0 10px; font-size:13px; font-weight:600;">Shipping</a> | 
    <a href="privacy.html" style="color:#20B2AA; text-decoration:none; margin:0 10px; font-size:13px; font-weight:600;">Privacy</a> | 
    <a href="terms.html" style="color:#20B2AA; text-decoration:none; margin:0 10px; font-size:13px; font-weight:600;">Terms</a>
  </div>
  <p style="color:#fff; font-size:13px;">Address: House # 602, Gali # 6, Sector G11/1, Islamabad, Pakistan</p>
</footer>

<script src="products-data.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (typeof PRODUCTS !== 'undefined' && PRODUCTS.length > 0) {
    PRODUCTS.forEach(item => {
      const card = document.createElement('div');
      card.className = 'prod-card';
      card.innerHTML = `
        <div class="prod-img-box">
          <img src="${item.image}" alt="${item.name}" class="prod-img" onerror="this.src='images/logo.png'">
        </div>
        <div class="prod-info">
          <span class="prod-badge">${item.treatmentLabel}</span>
          <h2 class="prod-title">${item.name}</h2>
          <p class="prod-desc">${item.description}</p>
          <div class="prod-footer">
            <span class="prod-price">$${item.price}.00</span>
            <button class="action-btn" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price}, '${item.image}')">BUY NOW</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    document.getElementById('count-num').textContent = PRODUCTS.length;
  }
});

function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: id, name: name, price: price, image: image, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = "cart.html";
}
</script>
</body>
</html>
