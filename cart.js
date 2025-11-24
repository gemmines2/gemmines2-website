// cart.js — Clean & Working Version

// Load cart from localStorage or initialize as empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart by ID
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ ...product, qty: quantity });
  }

  saveCart();
  alert(`${product.name} added to cart!`);
  updateCartCount();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = totalQty;
}

// Render cart items on cart page
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "$0.00";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="details">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div class="quantity">
          Qty: <input type="number" min="1" value="${item.qty}" data-id="${item.id}">
        </div>
      </div>
      <button class="remove" data-id="${item.id}">Remove</button>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Event: Update quantity
document.addEventListener("input", e => {
  if (e.target.matches(".quantity input")) {
    const id = parseInt(e.target.dataset.id);
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty = parseInt(e.target.value) || 1;
      saveCart();
      renderCart();
      updateCartCount();
    }
  }
});

// Event: Remove item
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    const id = parseInt(e.target.dataset.id);
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
  }
});

// Initialize cart page
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
