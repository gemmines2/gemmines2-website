const CART_KEY = 'gemmines2_cart_v1';

function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || {};
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
}

function addToCart(productId) {
  const cart = loadCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  alert('Added to cart!');
}

function renderCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const total = Object.values(loadCart()).reduce((a,b)=>a+b,0);
  el.innerText = total;
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('buy')) {
      addToCart(e.target.dataset.id);
    }
  });
  renderCartCount();
});
