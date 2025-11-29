// --- Initialize cart ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    totalEl.textContent = "$0.00";
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    container.innerHTML += `
      <div class="cart-item" style="display:flex; align-items:center; margin-bottom:15px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
        <img src="${item.image}" alt="${item.name}" style="width:80px; height:80px; object-fit:cover; border-radius:6px; margin-right:15px;">
        <div style="flex:1;">
          <h4 style="margin:0 0 5px 0; color:#00ffe0;">${item.name}</h4>
          <p style="margin:0 0 5px 0; color:#b7c7d3; font-size:0.85rem;">${item.description}</p>
          <p style="margin:0 0 5px 0; font-weight:700; color:#00e0ff;">$${item.price.toFixed(2)}</p>
          <div class="quantity">
            Qty: <input type="number" min="1" value="${item.qty}" data-id="${item.id}" style="width:50px; padding:4px; border-radius:5px; border:1px solid #555; background:#1a1f40; color:#fff;">
          </div>
        </div>
        <button class="remove-btn" data-id="${item.id}" style="background: linear-gradient(135deg,#00e0ff,#c9a646); color:#000; border:none; padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:700;">Remove</button>
      </div>
    `;
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add product to cart (from products.js or ?id=X link)
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
  alert(`${product.name} added to cart!`);
  window.location.href = "cart.html";
}

// Quantity change handler
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

// Clear cart button
document.getElementById("clear-cart")?.addEventListener("click", () => {
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
});

// Handle direct add from URL ?id=X or ?add_to_cart
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || params.get('add_to_cart');
  const qty = parseInt(params.get('qty')) || 1;

  if (productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      const exists = cart.find(i => i.id === product.id);
      if (!exists) {
        cart.push({ ...product, qty });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
      }
      window.location.href = "cart.html";
    }
  }
});
