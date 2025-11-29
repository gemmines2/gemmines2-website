<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cart | Gemmines2</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body { font-family: Arial,sans-serif; background:#0b0f25; color:#fff; margin:0; padding:0; }
    header { background:#050a1a; padding:15px; color:#1de9b6; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; }
    header h1 { margin:0; font-size:1.2rem; }
    header nav a { color:#1de9b6; text-decoration:none; margin:0 10px; }
    main { max-width:900px; margin:20px auto; background:#1a1f40; padding:20px; border-radius:12px; }
    h2 { color:#00ffe0; text-align:center; margin-bottom:15px; }
    table { width:100%; border-collapse: collapse; margin-bottom:20px; }
    th, td { padding:12px; text-align:left; border-bottom:1px solid #333; }
    th { color:#00ffe0; }
    .price { color:#00e0ff; font-weight:700; }
    button { cursor:pointer; border:none; padding:8px 12px; border-radius:8px; font-weight:700; 
             background: linear-gradient(135deg, #00e0ff, #c9a646); color:#000; transition: .2s; }
    button:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,255,208,0.25); }
    .cart-actions { display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; }
    .shipping-options { background:#111631; padding:15px; border-radius:8px; margin-bottom:20px; }
    .shipping-options label { display:block; margin:5px 0; cursor:pointer; }
    .summary { background:#111631; padding:15px; border-radius:8px; text-align:right; font-size:1rem; margin-bottom:20px; }
    footer { background:#050a1a; color:#1de9b6; text-align:center; padding:20px 10px; font-size:14px; }
    footer a { color:#1de9b6; text-decoration:none; margin:0 5px; }
    footer a:hover { text-decoration:underline; }
    .contact-info p { margin:3px 0; color:#fff; }
  </style>
</head>
<body>
<header>
  <h1>Gemmines2 Cart (<span id="cart-count">0</span>)</h1>
  <nav>
    <a href="index.html">Home</a>
    <a href="products.html">Products</a>
    <a href="checkout.html">Checkout</a>
  </nav>
</header>

<main>
  <h2>Your Shopping Cart</h2>
  <table id="cart-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="cart-items"></tbody>
  </table>

  <!-- Shipping Options -->
  <div class="shipping-options">
    <h3 style="color:#00ffe0;">Shipping Options</h3>
    <label><input type="radio" name="shipping" value="FedEx" checked> FedEx</label>
    <label><input type="radio" name="shipping" value="UPS"> UPS</label>
    <label><input type="radio" name="shipping" value="Skynet"> Skynet</label>
    <label><input type="radio" name="shipping" value="DHL"> DHL</label>
  </div>

  <!-- Cart Summary -->
  <div class="summary">
    <strong>Total: $<span id="cart-total">0.00</span></strong>
  </div>

  <div class="cart-actions">
    <button onclick="clearCart()">Clear Cart</button>
    <a href="checkout.html"><button>Proceed to Checkout</button></a>
  </div>
</main>

<footer>
  <p>
    <a href="return.html">Return Policy</a> | 
    <a href="shipping.html">Shipping Policy</a> | 
    <a href="contact.html">Contact Us</a>
  </p>
  <p>© 2025 Gemmines2. All Rights Reserved.</p>
  <div class="contact-info">
    <p><strong>📞 WhatsApp & Call:</strong> +92 3362149415</p>
    <p><strong>📸 Instagram:</strong> <a href="https://www.instagram.com/gemmines2/?hl=en" target="_blank">@gemmines2</a></p>
    <p><strong>🎵 TikTok:</strong> @gemmines2</p>
    <p><strong>📧 Email:</strong> gemmines2@gmail.com</p>
  </div>
</footer>

<!-- Floating WhatsApp Button -->
<a href="https://wa.me/923486903684" target="_blank" 
   style="position: fixed; bottom: 20px; right: 20px; background-color: #25D366; color: white; 
   padding: 12px 14px; border-radius: 50%; font-size: 24px; text-decoration: none; 
   box-shadow: 0 2px 8px rgba(0,0,0,0.3); z-index: 1000;">💬</a>

<script src="products.js"></script>
<script src="cart.js"></script>
<script>
function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;
  cart.forEach(item => total += item.price * item.qty);
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  if(cart.length === 0){
    cartItems.innerHTML = '<tr><td colspan="4" style="text-align:center;">Your cart is empty</td></tr>';
    renderCartCount();
    updateCartTotal();
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <tr>
      <td>${item.name}</td>
      <td class="price">$${item.price.toFixed(2)}</td>
      <td>${item.qty}</td>
      <td><button onclick="removeFromCart('${item.id}')">Remove</button></td>
    </tr>
  `).join('');

  renderCartCount();
  updateCartTotal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
</script>
</body>
</html>
