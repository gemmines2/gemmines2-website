// cart.js

// load existing cart or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// display how many items in header cart count
function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  countEl.textContent = `Cart (${totalQty})`;
}

// calculate and display total cost
function updateTotal() {
  const totalEl = document.getElementById("cart-total");
  if (!totalEl) return;
  const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 0)), 0);
  totalEl.textContent = `$${total.toFixed(2)}`;
}

// render cart page items
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    updateTotal();
    updateCartCount();
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="details">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div class="quantity">Qty: 
          <input type="number" min="1" value="${item.qty}" data-id="${item.id}">
        </div>
      </div>
      <button class="remove" data-id="${item.id}">Remove</button>
    `;
    container.appendChild(div);
  });

  updateTotal();
  updateCartCount();
}

// change quantity from input
function handleQuantityChange(id, newQty) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  const qtyNumber = parseInt(newQty) || 1;
  item.qty = qtyNumber;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// remove single item
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// clear entire cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
}

// event listeners
document.addEventListener("DOMContentLoaded", () => {
  // render cart on load
  renderCart();

  // wire Clear Cart button
  const clearBtn = document.getElementById("clear-cart-btn");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);

  // wire Checkout button if exists
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("🛒 Your cart is empty. Add items before checkout!");
        return;
      }
      // could proceed to checkout page
      window.location.href = "checkout.html";
    });
  }
