// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in header
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;
  countEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Render cart items
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  if (cart.length === 0) {
    totalEl.textContent = "Total: $0.00";
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
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
        <button class="btn-gradient remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
  });

  totalEl.textContent = `Total: $${total.toFixed(2)}`;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add quantity change handler
document.addEventListener("input", e => {
  if (e.target.matches(".quantity input")) {
    const id = e.target.dataset.id;
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty = parseInt(e.target.value) || 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }
});

// Remove item handler
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// Clear cart
document.getElementById("clear-cart")?.addEventListener("click", () => {
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
});

// Add direct product from ?id=PRODUCT_ID
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  if (productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      const exists = cart.find(i => i.id === product.id);
      if (!exists) {
        cart.push({ ...product, qty: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      }
      window.location.href = "cart.html";
    }
  }
});
