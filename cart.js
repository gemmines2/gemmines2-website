// Load cart or initialize
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count in header
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  countEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Initialize cart count on page load
updateCartCount();
