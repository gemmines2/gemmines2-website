let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartItems = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "$0.00";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
      <button onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join("");

  updateTotal();
  updateCartCount();
}

function updateQuantity(id, newQty) {
  const item = cart.find(item => item.id === id);
  item.quantity = parseInt(newQty);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateTotal();
  updateCartCount();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
  updateCartCount();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = `Cart (${count})`;
}

document.addEventListener("DOMContentLoaded", renderCart);
document.getElementById("clear-cart-btn")?.addEventListener("click", clearCart);
