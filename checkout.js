<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout | Gemmines2</title>
  <link rel="stylesheet" href="style.css">
  <style>
    :root{
      --bg:#0d1117;
      --card:#0f1b26;
      --turquoise:#00e0ff;
      --muted:#9fb7d6;
      --accent1:#00e0ff;
      --accent2:#00bfff;
    }

    body{
      background: var(--bg);
      color: #e8f4fb;
      font-family: 'Poppins', sans-serif;
      margin:0;
    }

    header, footer{
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:10px 20px;
    }

    main.container{
      max-width: 1000px;
      margin:20px auto;
      display:grid;
      grid-template-columns:1.2fr 1fr;
      gap:20px;
      padding:0 10px;
    }

    .checkout-box{
      background: var(--card);
      padding:16px;
      border-radius:12px;
      border:1px solid rgba(255,255,255,0.05);
    }

    h2{
      color: var(--turquoise);
      margin-bottom:12px;
      font-family: "Playfair Display", serif;
      font-size:1.3rem;
    }

    form{
      display:flex;
      flex-direction:column;
      gap:10px;
    }

    label{
      font-weight:600;
      font-size:0.9rem;
      color: var(--turquoise);
    }

    input, textarea, select{
      background:#0d1117;
      border:1px solid rgba(255,255,255,0.1);
      border-radius:8px;
      color:#e8f4fb;
      padding:8px;
      font-size:0.9rem;
    }

    .payment-options, .shipping-options{
      display:flex;
      flex-direction:column;
      gap:6px;
      margin-top:5px;
    }

    .payment-option, .shipping-option{
      display:flex;
      align-items:center;
      gap:8px;
      font-size:0.9rem;
    }

    .payment-option input, .shipping-option input{
      transform: scale(1.1);
      accent-color: var(--accent1);
    }

    #payment-details > div{
      display:none;
      margin-top:10px;
      border:1px solid rgba(255,255,255,0.05);
      padding:10px;
      border-radius:8px;
    }

    button.place-order{
      background: linear-gradient(135deg,var(--accent1),var(--accent2));
      border:none;
      color:#000;
      font-weight:700;
      font-size:0.9rem;
      padding:10px;
      border-radius:10px;
      cursor:pointer;
      margin-top:10px;
      transition: transform .2s ease, box-shadow .2s ease;
    }

    button.place-order:hover{
      transform: scale(1.03);
      box-shadow:0 4px 12px rgba(0,255,208,0.2);
    }

    @media(max-width:900px){
      main.container{
        grid-template-columns:1fr;
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
    <a class="btn" href="products.html">Products</a>
    <a class="btn" href="cart.html">Cart (<span id="cart-count">0</span>)</a>
    <a class="btn active" href="checkout.html">Checkout</a>
  </nav>
</header>

<main class="container">
  <!-- Left: Order Summary -->
  <div class="checkout-box">
    <h2>Your Order</h2>
    <div id="cart-summary">Loading your order...</div>
  </div>

  <!-- Right: Contact + Delivery + Payment -->
  <div class="checkout-box">
    <h2>Delivery & Payment</h2>
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

      <label for="postal">Postal / ZIP Code</label>
      <input id="postal" name="postal" type="text" required>

      <label>Shipping Method</label>
      <div class="shipping-options">
        <label class="shipping-option"><input type="radio" name="shipping" value="standard" checked> Standard Shipping</label>
        <label class="shipping-option"><input type="radio" name="shipping" value="express"> Express Shipping</label>
        <label class="shipping-option"><input type="radio" name="shipping" value="overnight"> Overnight Shipping</label>
      </div>

      <label>Payment Method</label>
      <div class="payment-options">
        <label class="payment-option"><input type="radio" name="payment" value="credit" checked> Credit / Debit Card 💳</label>
        <label class="payment-option"><input type="radio" name="payment" value="paypal"> PayPal</label>
        <label class="payment-option"><input type="radio" name="payment" value="payoneer"> Payoneer</label>
        <label class="payment-option"><input type="radio" name="payment" value="western"> Western Union</label>
        <label class="payment-option"><input type="radio" name="payment" value="bank"> Bank Transfer 🏦</label>
      </div>

      <div id="payment-details">
        <div id="credit-fields">
          <label for="card-number">Card Number</label>
          <input id="card-number" name="card-number" type="text" placeholder="1234 5678 9012 3456">

          <label for="expiry">Expiry Date</label>
          <input id="expiry" name="expiry" type="text" placeholder="MM/YY">

          <label for="cvv">CVV</label>
          <input id="cvv" name="cvv" type="text" placeholder="123">
        </div>

        <div id="paypal-fields">
          <label for="paypal-email">PayPal Email</label>
          <input id="paypal-email" name="paypal-email" type="email" placeholder="you@example.com">
        </div>

        <div id="payoneer-fields">
          <label for="payoneer-account">Payoneer Account / IBAN</label>
          <input id="payoneer-account" name="payoneer-account" type="text">
        </div>

        <div id="western-fields">
          <label for="western-name">Receiver Name</label>
          <input id="western-name" name="western-name" type="text">

          <label for="western-country">Receiver Country</label>
          <input id="western-country" name="western-country" type="text">
        </div>

        <div id="bank-fields">
          <label for="bank-name">Bank Name</label>
          <input id="bank-name" name="bank-name" type="text">

          <label for="bank-account">Account Number</label>
          <input id="bank-account" name="bank-account" type="text">

          <label for="bank-iban">IBAN</label>
          <input id="bank-iban" name="bank-iban" type="text">

          <label for="bank-swift">SWIFT / BIC</label>
          <input id="bank-swift" name="bank-swift" type="text">
        </div>
      </div>

      <button type="submit" class="place-order">Place Order</button>
    </form>
  </div>
</main>

<footer>
  <p>&copy; <span id="year"></span> Gemmines2. All Rights Reserved. |
    <a href="return.html">Return Policy</a></p>
</footer>

<script src="products.js"></script






