// cart.js — persistent cart
const CART_KEY = 'gemmines2_cart_v2';

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch(e) { return {}; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
  renderCartPanel();
}

function addToCart(productId, qty=1) {
  const cart = loadCart();
  cart[productId] = (cart[productId]||0) + qty;
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = loadCart();
  delete cart[productId];
  saveCart(cart);
}

function setQty(productId, qty) {
  const cart = loadCart();
  if(qty <= 0) delete cart[productId];
  else cart[productId] = qty;
  saveCart(cart);
}

function cartItemsDetailed() {
  const cart = loadCart();
  return Object.keys(cart).map(id => {
    const product = PRODUCTS.find(p => p.id === id);
    return product ? {...product, qty: cart[id]} : null;
  }).filter(Boolean);
}

function renderCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const total = cartItemsDetailed().reduce((sum,i)=>sum+i.qty,0);
  el.textContent = total;
}

function renderCartPanel() {
  const container = document.getElementById('cart-items');
  if(!container) return;

  const items = cartItemsDetailed();
  container.innerHTML = '';
  let total = 0;

  items.forEach(it => {
    total += it.price * it.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${it.img}" alt="${it.name}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;margin-right:8px"/>
      <div style="flex:1">
        <div style="font-weight:700">${it.name}</div>
        <div style="color:var(--muted);font-size:0.9rem">
          $${it.price.toFixed(2)} × 
          <input type="number" value="${it.qty}" min="1" data-id="${it.id}" style="width:64px;border-radius:6px;padding:6px;background:transparent;border:1px solid rgba(255,255,255,0.05);color:inherit"/>
        </div>
      </div>
      <div>
        <button data-remove="${it.id}" style="background:transparent;border:none;color:var(--muted);cursor:pointer">Remove</button>
      </div>
    `;
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.padding = '8px 0';
    container.appendChild(row);
  });

  const totalEl = document.getElementById('cart-total');
  if(totalEl) totalEl.textContent = '$' + total.toFixed(2);

  // attach qty changes
  container.querySelectorAll('input[type="number"]').forEach(inp => {
    inp.addEventListener('change', e => {
      setQty(e.target.dataset.id, parseInt(e.target.value) || 1);
    });
  });

  // attach remove buttons
  container.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', e => removeFromCart(btn.dataset.remove));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCartCount();
  renderCartPanel();
});
