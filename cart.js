// --- Handle Direct Add to Cart from Google Merchant ---
window.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("add_to_cart");
    const qty = parseInt(params.get("qty")) || 1;

    if (productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const product = products.find(p => p.id == productId);

        if (product) {
            // Check if already in cart
            const existing = cart.find(item => item.id == productId);
            if (existing) {
                existing.qty += qty;
            } else {
                cart.push({ ...product, qty });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
});


// Load cart from localStorage or initialize
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
  window.location.href = "cart.html"; // redirect after adding
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

// Quantity change handler
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

// Remove item handler
document.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    const id = parseInt(e.target.dataset.id);
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// Clear cart button
document.getElementById("clear-cart")?.addEventListener("click", () => {
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
});

// On page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();

  // Check URL for ?id=X
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  if (productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
      const exists = cart.find(i => i.id == product.id);
      if (!exists) {
        product.qty = 1;
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
      }
      window.location.href = "cart.html"; // redirect to cart after adding
    }
  }
});
