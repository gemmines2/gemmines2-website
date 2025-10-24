/* cart.js - full cart handling for Gemmines2 */
const CART_KEY = 'gemmines2_cart_v1';

// Load cart from localStorage
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch (e) {
    return {};
  }
}

// Save cart to localStorage and update UI
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
  renderCartPanel();
  renderCheckout();
}

// Add product to cart
function addToCart(productId, qty = 1) {
  const cart = loadCart();
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart(cart);
}

// Remove product from cart
function removeFromCart(productId) {
  const cart = loadCart();
  delete cart[productId];
  saveCart(cart);
}

// Set quantity for a product
function setQty(productId, qty) {
  const cart = loadCart();
  if (qty <= 0) delete cart[productId];
  else cart[productId] = qty;
  saveCart(cart);
}

// Return detailed cart items from PRODUCTS array
function cartItemsDetailed() {
  const cart = loadCart();
  const items = [];
  for (const id in cart) {
    const p = PRODUCTS.find(x => x.id === id);
    if (p) items.push({ ...p, qty: cart[id] });
  }
  return items;
}

/* Render functions */

// Update cart count in header
function renderCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const total = cartItemsDetailed().reduce((s, i) => s + i.qty, 0);
  el.innerText = total;
}

// Render cart panel (dropdown or sidebar)
function renderCartPanel() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  const items = cartItemsDetailed();
  container.innerHTML = '';
  let total = 0;

  items.forEach(it => {
    total += it.qty * it.price;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${it.img}" alt="${it.name}" />
      <div style="flex:1">
        <div style="font-weight:700">${it.name}</div>
        <div style="color:var(--muted);font-size:0.9rem">
          $${it.price} × 
          <input type="number" value="${it.qty}" min="1" data-id="${it.id}" style="width:60px;padding:4px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:inherit"/>
        </div>
      </div>
      <div><button data-remove="${it.id}" style="background:transparent;border:none;color:var(--muted);cursor:pointer">Remove</button></div>
    `;
    container.appendChild(row);
  });

  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.innerText = '$' + total.toFixed(2);

  // Attach quantity change events
  container.querySelectorAll('input[type="number"]').forEach(inp => {
    inp.addEventListener('change', e => {
      const id = e.target.dataset.id;
      const v = parseInt(e.target.value) || 1;
      setQty(id, v);
    });
  });

  // Attach remove buttons
  container.querySelectorAll('[data-remove]').forEach(b => {
    b.addEventListener('click', e => {
      removeFromCart(b.dataset.remove);
    });
  });
}

// Render checkout summary
function renderCheckout() {
  const container = document.getElementById('cart-summary');
  if (!container) return;
  const items = cartItemsDetailed();
  if (items.length === 0) {
    container.innerHTML = '<div style="color:var(--muted)">Your cart is empty.</div>';
    return;
  }

  let html = '<div style="padding:12px;border-radius:8px;background:rgba(255,255,255,0.02)">';
  let total = 0;

  items.forEach(it => {
    html += `<div style="display:flex;justify-content:space-between;padding:6px 0">
      <div>${it.name} × ${it.qty}</div>
      <div>$${(it.price * it.qty).toFixed(2)}</div>
    </div>`;
    total += it.price * it.qty;
  });

  html += `<hr style="border:none;border-top:1px dashed rgba(255,255,255,0.1);margin:8px 0"/>
  <div style="display:flex;justify-content:space-between;font-weight:800">Total<div>$${total.toFixed(2)}</div></div></div>`;

  container.innerHTML = html;

  const cartTotalEl = document.getElementById('cart-total');
  if (cartTotalEl) cartTotalEl.innerText = '$' + total.toFixed(2);
}

// Place order (simulated)
function placeOrder(contact) {
  const order = { id: 'ORD-' + Date.now(), items: cartItemsDetailed(), contact, created: new Date().toISOString() };
  console.log('ORDER', order);
  localStorage.removeItem(CART_KEY);
  renderCartPanel();
  renderCartCount();
  renderCheckout();
}

// Initialize cart buttons and UI
document.addEventListener('DOMContentLoaded', () => {
  // Listen for Buy Now buttons dynamically
  document.body.addEventListener('click', (e) => {
    if (e.target && e.target.matches && e.target.matches('.buy')) {
      const id = e.target.dataset.id;
      addToCart(id);
      alert('Added to cart');
      renderCartCount();
    }
  });

  renderCartPanel();
  renderCartCount();
  renderCheckout();
});
