// products.js — final, correct image paths
const PRODUCTS = [
  { id: 'aquamarine', name: 'Aquamarine', desc: 'Clean aquamarine — approx 2.5 carats — polished', price: 50, img: 'images/aquamarine.jpg' },
  { id: 'rhodolite', name: 'Rhodolite Garnet', desc: 'Rhodolite — polished, high lustre', price: 45, img: 'images/rhodolite.jpg' },
  { id: 'peridot', name: 'Peridot', desc: 'Natural green peridot — tumbled', price: 35, img: 'images/peridot.jpg' },
  { id: 'lemon-quartz', name: 'Lemon Quartz', desc: 'Bright lemon quartz — polished crystal', price: 40, img: 'images/lemon-quartz.jpg' },
  { id: 'green-jasper', name: 'Green Jasper', desc: 'Earthy green jasper — natural pattern', price: 25, img: 'images/green-jasper.jpg' },
  { id: 'hessonite', name: 'Hessonite Garnet', desc: 'Golden orange hessonite — glossy finish', price: 55, img: 'images/hessonite.jpg' },
  { id: 'umbalite', name: 'Umbalite Garnet', desc: 'Rare umbalite — vivid pink-purple hue', price: 80, img: 'images/umbalite.jpg' },
  { id: 'emerald', name: 'Emerald', desc: 'Gorgeous green emerald — premium quality', price: 120, img: 'images/emerald.jpg' }
];

function renderProducts() {
  const container = document.getElementById('product-list');
  if (!container) return;
  container.innerHTML = '';
  PRODUCTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
      </div>
      <div class="meta">
        <div class="price">$${p.price.toFixed(2)}</div>
      </div>
      <button class="buy" data-id="${p.id}">Buy Now</button>
    `;
    container.appendChild(card);
  });

  // wire Buy buttons (works with cart.js)
  document.querySelectorAll('.buy').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = btn.dataset.id;
      if (typeof addToCart === 'function') {
        addToCart(id, 1);
        if (typeof renderCartCount === 'function') renderCartCount();
        alert('Added to cart');
      } else {
        alert('Cart not ready yet');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderProducts);
5) cart.js (final working cart, compatible with PRODUCTS)
javascript
Copy code
// cart.js — persistent cart + UI helpers
const CART_KEY = 'gemmines2_cart_v1';

function loadCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
  renderCartPanel();
  renderCheckout && renderCheckout();
}

function addToCart(productId, qty=1){
  const cart = loadCart();
  cart[productId] = (cart[productId]||0) + qty;
  saveCart(cart);
}

function removeFromCart(productId){
  const cart = loadCart();
  delete cart[productId];
  saveCart(cart);
}

function setQty(productId, qty){
  const cart = loadCart();
  if (qty <= 0) delete cart[productId];
  else cart[productId] = qty;
  saveCart(cart);
}

function cartItemsDetailed(){
  const cart = loadCart();
  const items = [];
  for (const id in cart){
    const p = PRODUCTS.find(x => x.id === id);
    if (p) items.push({...p, qty: cart[id]});
  }
  return items;
}

function renderCartCount(){
  const el = document.getElementById('cart-count');
  if(!el) return;
  const total = cartItemsDetailed().reduce((s,i)=>s+i.qty,0);
  el.innerText = total;
}

function renderCartPanel(){
  const container = document.getElementById('cart-items');
  if(!container) return;
  const items = cartItemsDetailed();
  container.innerHTML = '';
  let total = 0;
  items.forEach(it=>{
    total += it.price * it.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${it.img}" alt="${it.name}" style="width:64px;height:64px;object-fit:cover;border-radius:6px;margin-right:8px"/>
      <div style="flex:1">
        <div style="font-weight:700">${it.name}</div>
        <div style="color:var(--muted);font-size:0.9rem">$${it.price.toFixed(2)} × <input type="number" value="${it.qty}" min="1" data-id="${it.id}" style="width:64px;border-radius:6px;padding:6px;background:transparent;border:1px solid rgba(255,255,255,0.05);color:inherit" /></div>
      </div>
      <div><button data-remove="${it.id}" style="background:transparent;border:none;color:var(--muted);cursor:pointer">Remove</button></div>
    `;
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.padding = '8px 0';
    container.appendChild(row);
  });
  const totalEl = document.getElementById('cart-total');
  if(totalEl) totalEl.innerText = '$' + total.toFixed(2);

  // attach qty change
  container.querySelectorAll('input[type="number"]').forEach(inp=>{
    inp.addEventListener('change', e=>{
      const id = e.target.dataset.id;
      const v = parseInt(e.target.value) || 1;
      setQty(id, v);
    });
  });
  // attach remove
  container.querySelectorAll('[data-remove]').forEach(b=>{
    b.addEventListener('click', e=>{
      removeFromCart(b.dataset.remove);
    });
  });
}

function renderCheckout(){
  const container = document.getElementById('cart-summary');
  if(!container) return;
  const items = cartItemsDetailed();
  if(items.length === 0){ container.innerHTML = '<div style="color:var(--muted)">Your cart is empty.</div>'; return; }
  let html = '<div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:8px">';
  let total = 0;
  items.forEach(it=>{
    html += `<div style="display:flex;justify-content:space-between;padding:6px 0"><div>${it.name} × ${it.qty}</div><div>$${(it.price*it.qty).toFixed(2)}</div></div>`;
    total += it.price * it.qty;
  });
  html += `<hr style="border:none;border-top:1px dashed rgba(255,255,255,0.06);margin:8px 0"/><div style="display:flex;justify-content:space-between;font-weight:800">Total<div>$${total.toFixed(2)}</div></div></div>`;
  container.innerHTML = html;
  const cartTotalEl = document.getElementById('cart-total'); if(cartTotalEl) cartTotalEl.innerText = '$' + total.toFixed(2);
}

/* place order (simulated) */
function placeOrder(contact){
  const order = { id:'ORD-'+Date.now(), items:cartItemsDetailed(), contact, created:new Date().toISOString() };
  console.log('ORDER', order);
  localStorage.removeItem(CART_KEY);
  renderCartPanel(); renderCartCount(); renderCheckout();
}

/* initialize */
document.addEventListener('DOMContentLoaded', ()=>{
  renderCartPanel();
  renderCartCount();
  renderCheckout && renderCheckout();
});
