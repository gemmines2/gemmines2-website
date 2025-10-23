/* cart.js - cart persistence and UI */
const CART_KEY = 'gemmines2_cart_v1';

function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch(e){ return {}; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); renderCartCount(); renderCartPanel(); renderCheckout(); }

function addToCart(productId, qty=1){
  const cart = loadCart(); cart[productId] = (cart[productId]||0) + qty; saveCart(cart);
}
function removeFromCart(productId){
  const cart = loadCart(); delete cart[productId]; saveCart(cart);
}
function setQty(productId, qty){
  const cart = loadCart(); if(qty <= 0) delete cart[productId]; else cart[productId] = qty; saveCart(cart);
}
function cartItemsDetailed(){
  const cart = loadCart(); const items = [];
  for(const id in cart){ const p = PRODUCTS.find(x=>x.id===id); if(p) items.push({...p, qty: cart[id]}); }
  return items;
}

/* Render helpers */
function renderCartCount(){
  const el = document.getElementById('cart-count');
  if(!el) return;
  const total = cartItemsDetailed().reduce((s,i)=>s+i.qty,0);
  el.innerText = total;
}

function renderCartPanel(){
  const container = document.getElementById('cart-items');
  if(!container) return;
  const items = cartItemsDetailed(); container.innerHTML = '';
  let total = 0;
  items.forEach(it => {
    total += it.qty * it.price;
    const row = document.createElement('div'); row.className = 'cart-item';
    row.innerHTML = `<img src="${(it.imgs && it.imgs[0])||''}" alt="${it.name}" /><div style="flex:1"><div style="font-weight:700">${it.name}</div><div style="color:var(--muted);font-size:0.9rem">$${it.price} × <input type="number" value="${it.qty}" min="1" data-id="${it.id}" style="width:64px;border-radius:6px;padding:6px;background:transparent;border:1px solid rgba(255,255,255,0.03);color:inherit" /></div></div><div><button data-remove="${it.id}" style="background:transparent;border:none;color:var(--muted);cursor:pointer">Remove</button></div>`;
    container.appendChild(row);
  });
  const totalEl = document.getElementById('cart-total'); if(totalEl) totalEl.innerText = '$' + total.toFixed(2);

  // attach qty change
  container.querySelectorAll('input[type="number"]').forEach(inp=>{
    inp.addEventListener('change', e=>{
      const id = e.target.dataset.id; const v = parseInt(e.target.value) || 1; setQty(id, v);
    });
  });
  // attach remove
  container.querySelectorAll('[data-remove]').forEach(b=> b.addEventListener('click', e=>{
    removeFromCart(b.dataset.remove);
  }));
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
  html += `<hr style="border:none;border-top:1px dashed rgba(255,255,255,0.04);margin:8px 0"/><div style="display:flex;justify-content:space-between;font-weight:800">Total<div>$${total.toFixed(2)}</div></div></div>`;
  container.innerHTML = html;
  const cartTotalEl = document.getElementById('cart-total'); if(cartTotalEl) cartTotalEl.innerText = '$' + total.toFixed(2);
}

/* place order (simulated) */
function placeOrder(contact){
  const order = { id:'ORD-'+Date.now(), items: cartItemsDetailed(), contact, created: new Date().toISOString() };
  console.log('ORDER', order);
  localStorage.removeItem(CART_KEY);
  renderCartPanel(); renderCartCount(); renderCheckout();
}

/* wire up global UI from pages */
document.addEventListener('DOMContentLoaded', ()=>{
  // attach buy buttons dynamically (products may render after DOMContentLoaded)
  document.body.addEventListener('click', (e)=>{
    if(e.target && e.target.matches && e.target.matches('.buy')){
      const id = e.target.dataset.id;
      addToCart(id);
      alert('Added to cart');
      renderCartCount();
    }
  });

  // render cart panel if exists
  renderCartPanel();
  renderCartCount();
  renderCheckout();
});
