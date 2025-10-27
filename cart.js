// cart.js - Handles cart logic, checkout, and payment

const CART_KEY = 'gemmines_cart';

// Retrieve cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

// Save cart
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add product to cart
function addToCart(id) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart(cart);
  renderCartCount();
}

// Count total items
function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// Render cart count in navbar
function renderCartCount() {
  const countEl = document.querySelector('.cart-count');
  if (countEl) countEl.textContent = cartCount();
}

// Render checkout page
function renderCheckout() {
  const container = document.querySelector('.checkout-container');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#ccc;">Your cart is empty.</p>`;
    return;
  }

  let total = 0;
  let html = `
    <h2 style="color:#00e0ff;">Checkout</h2>
    <form id="checkout-form" class="checkout-form">
      <h3>Order Summary</h3>
  `;

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) {
      const subtotal = product.price * item.qty;
      total += subtotal;
      html += `
        <div class="checkout-item">
          <span>${product.name} × ${item.qty}</span>
          <span>$${subtotal}</span>
        </div>
      `;
    }
  });

  html += `
      <div class="checkout-total"><strong>Total:</strong> $${total}</div>

      <h3>Customer Details</h3>
      <input type="text" placeholder="Full Name" required>
      <input type="email" placeholder="Email" required>
      <input type="text" placeholder="Phone Number" required>
      <input type="text" placeholder="Address" required>

      <h3>Payment Method</h3>
      <select id="payment-method" required>
        <option value="">-- Select Payment Method --</option>
        <option>Western Union</option>
        <option>RIA</option>
        <option>PayPal</option>
        <option>Payoneer</option>
        <option>Stripe</option>
        <option>Bank Transfer</option>
      </select>

      <div id="payment-details" style="margin-top:10px;">
        <input type="text" placeholder="Account Name" required>
        <input type="text" placeholder="Account Number / ID" required>
        <input type="text" placeholder="Bank / Service Name" required>
        <input type="number" placeholder="Amount Sent (USD)" required>
      </div>

      <button type="submit" class="place-order-btn">Place Order</button>
    </form>
  `;

  container.innerHTML = html;

  // Handle form submit
  document.getElementById('checkout-form').addEventListener('submit', e => {
    e.preventDefault();
    placeOrder();
  });
}

// Handle order placement
function placeOrder() {
  alert('✅ Thank you! Your order has been placed successfully.');

  localStorage.removeItem(CART_KEY);
  renderCartCount();

  const container = document.querySelector('.checkout-container');
  if (container) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px;">
        <h2 style="color:#00e0ff;">✅ Thank you for your order!</h2>
        <p style="color:#a8cbee;">We’ve received your details. Our team will contact you soon to confirm payment and delivery.</p>
        <button onclick="window.location.href='index.html'"
          style="margin-top:20px;padding:10px 20px;border:none;border-radius:8px;
          background:linear-gradient(90deg,#00e0ff,#00bfff);color:#071022;font-weight:600;
          cursor:pointer;box-shadow:0 0 10px rgba(0,224,255,0.4);">
          Back to Home
        </button>
      </div>
    `;
  }
}

// Handle Buy Now buttons
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target && e.target.matches && e.target.matches('.buy')) {
      const id = e.target.dataset.id;
      addToCart(id);
      window.location.href = 'checkout.html'; // go directly to checkout
    }
  });

  renderCartCount();
  renderCheckout();
});
