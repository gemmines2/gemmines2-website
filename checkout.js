<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Checkout | Gemmines2</title>
<link rel="stylesheet" href="style.css">
<style>
  body { background:#0d1117; color:#e8f0ff; font-family: 'Poppins', sans-serif; margin:0; }
  header, footer { padding:12px 20px; display:flex; align-items:center; justify-content:space-between; background:#0b1623; }
  header .logo { font-weight:800; color:#00e0ff; font-size:1.2rem; }
  nav a { color:#9fb7d6; margin-left:12px; text-decoration:none; }
  nav a.active { color:#00e0ff; font-weight:700; }

  main.container { display:grid; grid-template-columns:1fr 1fr; gap:20px; padding:20px; }
  @media(max-width:900px){ main.container { grid-template-columns:1fr; } }

  .checkout-box { background:#0f1b26; border-radius:12px; padding:16px; border:1px solid rgba(255,255,255,0.05); }
  h2 { font-family:"Playfair Display", serif; color:#00e0ff; margin-bottom:10px; font-size:1.3rem; }

  form { display:flex; flex-direction:column; gap:10px; }
  label { font-weight:600; font-size:0.9rem; color:#00e0ff; }
  input, select, textarea { background:#0d1117; border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#e8f0ff; padding:8px; font-size:0.9rem; }

  .payment-options, .shipping-options { display:flex; flex-direction:column; gap:6px; margin-top:5px; }
  .option-label { display:flex; align-items:center; gap:8px; font-size:0.9rem; }
  .option-label input { transform:scale(1.1); accent-color:#00e0ff; }

  #card-details, #bank-details { display:none; margin-top:10px; }
  button.place-order { background:linear-gradient(135deg,#00e0ff,#00bfff); border:none; color:#071022; font-weight:700; padding:10px; border-radius:10px; cursor:pointer; margin-top:10px; transition:transform 0.2s, box-shadow 0.2s; }
  button.place-order:hover { transform:scale(1.03); box-shadow:0 4px 12px rgba(0,224,208,0.2); }

</style>
</head>
<body>
<header>
  <div class="logo">GM | Gemmines2</div>
  <nav>
    <a href="index.html">Home</a>
    <a href="products.html">Products</a>
    <a href="cart.html">Cart (<span id="cart-count">0</span>)</a>
    <a class="active" href="checkout.html">Checkout</a>
  </nav>
</header>

<main class="container">
  <!-- Checkout Form -->
  <div class="checkout-box">
    <h2>Checkout Information</h2>
    <form id="checkout-form">
      <label for="name">Full Name</label>
      <input id="name" name="name" type="text" required>

      <label for="email">Email</label>
      <input id="email" name="email" type="email" required>

      <label for="phone">Phone / Contact Number</label>
      <input id="phone" name="phone" type="tel" required>

      <label for="address">Shipping Address</label>
      <textarea id="address" name="address" rows="3" required></textarea>

      <label for="country">Country</label>
      <input id="country" name="country" type="text" required>

      <label for="region">Region / City</label>
      <input id="region" name="region" type="text" required>

      <label for="postal">Postal Code</label>
      <input id="postal" name="postal" type="text" required>

      <label>Shipping Method</label>
      <div class="shipping-options">
        <label class="option-label">
          <input type="radio" name="shipping" value="standard" checked> Standard Shipping
        </label>
        <label class="option-label">
          <input type="radio" name="shipping" value="express"> Express Shipping
        </label>
      </div>

      <label>Payment Method</label>
      <div class="payment-options">
        <label class="option-label">
          <input type="radio" name="payment" value="credit" checked> Credit / Debit Card 💳
        </label>
        <label class="option-label">
          <input type="radio" name="payment" value="paypal"> PayPal
        </label>
        <label class="option-label">
          <input type="radio" name="payment" value="payoneer"> Payoneer
        </label>
        <label class="option-label">
          <input type="radio" name="payment" value="western"> Western Union
        </label>
        <label class="option-label">
          <input type="radio" name="payment" value="bank"> Bank Transfer 🏦
        </label>
      </div>

      <!-- Conditional fields -->
      <div id="card-details">
        <label for="card-number">Card Number</label>
        <input id="card-number" name="card-number" type="text" placeholder="1234 5678 9012 3456">
        <label for="expiry">Expiry Date</label>
        <input id="expiry" name="expiry" type="text" placeholder="MM/YY">
        <label for="cvv">CVV</label>
        <input id="cvv" name="cvv" type="text" placeholder="123">
      </div>

      <div id="bank-details">
        <label for="bank-name">Bank Name</label>
        <input id="bank-name" name="bank-name" type="text">
        <label for="account-number">Account Number</label>
        <input id="account-number" name="account-number" type="text">
        <label for="iban">IBAN</label>
        <input id="iban" name="iban" type="text">
      </div>

      <button type="submit" class="place-order">Place Order</button>
    </form>
  </div>

  <!-- Order Summary -->
  <div class="checkout-box" id="checkout-summary">
    <h2>Your Cart</h2>
    <div id="cart-summary">Loading your cart...</div>
  </div>
</main>

<footer>
  <p>&copy; <span id="year"></span> Gemmines2. All Rights Reserved. |
  <a href="return.html">Return Policy</a></p>
</footer>

<script src="products.js"></script>
<script src="cart.js"></script>
<script src="checkout.js"></script>
</body>
</html>
checkout.js (place in the same folder)
javascript
Copy code
// Update year dynamically
document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  // Render cart summary
  renderCartCount();
  renderCheckout();

  const paymentRadios = document.querySelectorAll("input[name='payment']");
  const cardDetails = document.getElementById("card-details");
  const bankDetails = document.getElementById("bank-details");

  // Show/hide fields based on selected payment
  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      cardDetails.style.display = radio.value === "credit" ? "block" : "none";
      bankDetails.style.display = radio.value === "bank" ? "block" : "none";
    });
  });

  // Handle form submission
  document.getElementById("checkout-form").addEventListener("submit", e => {
    e.preventDefault();

    const paymentMethod = document.querySelector("input[name='payment']:checked").value;

    const contact = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      country: e.target.country.value,
      region: e.target.region.value,
      postal: e.target.postal.value,
      shipping: document.querySelector("input[name='shipping']:checked").value,
      payment: paymentMethod,
      card: {
        number: e.target
