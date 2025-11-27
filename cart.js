

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ ...product, qty: quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  window.location.href = "cart.html"; // redirect to cart page
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  countEl.textContent = cartCount;
}


// Render cart items
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  if (cart.length === 0) {
    totalEl.textContent = "$0.00";
    return container.innerHTML = "<p>Your cart is empty.</p>";
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
          <div class="quantity">Qty: <input type="number" min="1" value="${item.qty}" data-id="${item.id}"></div>
        </div>
        <button class="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Handle quantity change
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

// Handle remove button
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    const id = parseInt(e.target.dataset.id);
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// Clear Cart button
document.getElementById("clear-cart")?.addEventListener("click", () => {
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
