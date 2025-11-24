// ====== CART.JS — FINAL WORKING VERSION ======

// Load cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart by ID
function addToCart(id, quantity = 1) {
  // Find the product in products array
  const product = products.find(p => p.id === id);
  if (!product) return;

  // Check if product already in cart
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      desc: product.description,
      img: product.image,
      price: parseFloat(product.price.replace("$", "")),
      qty: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Update cart count in header
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;
  countEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Render cart items on cart.html
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "$0.00";
    updateCartCount();
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="details">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
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
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Event: Update quantity
document.addEventListener("input", e => {
  if (e.target.matches(".quantity input")) {
    const id = parseInt(e.target.dataset.id);
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty = parseInt(e.target.value) || 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }
});

// Event: Remove item
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    const id = parseInt(e.target.dataset.id);
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", renderCart);
