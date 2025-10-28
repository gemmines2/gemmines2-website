const CART_KEY = 'gemmines2_cart_v1';

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch(e) { return {}; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
  renderCartPanel();
}

function addToCart(productId, qty = 1) {
  const cart = loadCart();
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = loadCart();
  delete cart[productId];
  saveCart(cart);
}

function setQty(productId, qty) {
  const cart = loadCart();
  if (qty <= 0) delete cart[productId];
  else cart[productId] = qty;
  saveCart(cart);
}

function cartItemsDetailed() {
  const cart = loadCart();
  const items = [];
  for (const id in cart) {
    const p = PRODUCTS.find(x => x.id === id);
    if (p) items.push({ ...p, qty: cart[id] });
  }
  return items;
}

function renderCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const total = cartItemsDetailed().reduce((s,i)=>s+i.qty,0);
  el.innerText = total;
}

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
        <div style="color:#9ca3af;font-size:0.9rem">
          $${it.price} × 
          <input type="number" value="${it.qty}" min="1" data-id="${it.id}" style="width:60px;padding:4px;border-radius:6px;border:1px solid #333;background:transparent;color:inherit"/>
        </div>
      </div>
      <div><button data-remove="${it.id}" style="background:transparent;border:none;color:#9ca3af;cursor:pointer">Remove</button></div>
    `;
    container.appendChild(row);
  });

  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.innerText = '$' + total.toFixed(2);

  container.querySelectorAll('input[type="number"]').forEach(inp=>{
    inp.addEventListener('change', e=>{
      const id = e.target.dataset.id;
      const v = parseInt(e.target.value)||1;
      setQty(id,v);
    });
  });

  container.querySelectorAll('[data-remove]').forEach(b=>{
    b.addEventListener('click', ()=>removeFromCart(b.dataset.remove));
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.body.addEventListener('click', e=>{
    if(e.target.matches('.buy')){
      const id = e.target.dataset.id;
      addToCart(id);
      alert('Added to cart');
      renderCartCount();
    }
  });

  renderCartCount();
  renderCartPanel();
});
