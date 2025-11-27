document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const paymentDetails = document.getElementById("payment-details");

  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Try to add product from URL (if exists)
  if (productId && !productId.includes("{")) {
    const products = JSON.parse(localStorage.getItem("products")) || []; // Assuming products.js saves to localStorage
    const product = products.find(p => p.id === productId);

    if (product) {
      const exists = cart.find(item => item.id === product.id);
      if (exists) {
        exists.qty += 1;
      } else {
        cart.push({...product, qty: 1});
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      console.warn("Product not found in local storage:", productId);
      // Do NOT redirect to 404 — continue with checkout normally
    }
  }

  // Update payment input fields dynamically
  function updatePaymentFields() {
    const selected = document.querySelector('input[name="payment"]:checked');
    if (!selected) return;

    const value = selected.value;
    let html = "";

    switch (value) {
      case "credit":
        html = `
          <label>Card Number</label>
          <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" required>
          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" required>
          <label>CVC</label>
          <input type="text" placeholder="123" required>
        `;
        break;
      case "paypal":
        html = `<p>You'll be redirected to PayPal after placing the order.</p>`;
        break;
      case "stripe":
        html = `<p>Stripe payment will be processed after placing the order.</p>`;
        break;
      case "payoneer":
        html = `<p>Payoneer payment details will be emailed to you.</p>`;
        break;
      case "western":
        html = `<p>Western Union instructions will be sent after submission.</p>`;
        break;
      case "bank":
        html = `
          <label>Account Holder Name</label>
          <input type="text" placeholder="Name on account" required>
          <label>IBA
