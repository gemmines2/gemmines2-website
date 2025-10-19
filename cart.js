let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update the cart display
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "Total: $0";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.name} — $${item.price} × ${item.quantity}</p>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  totalElement.textContent = `Total: $${total}`;

  // Enable remove button
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });
  });
}

// Add to Cart Button Logic
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", e => {
    const name = e.target.dataset.name;
    const price = parseFloat(e.target.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
  });
});

// Checkout Form Logic
const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", () => {
    const orderInput = document.getElementById("order-details");
    if (orderInput) {
      // ✅ Attach hidden order details here
      orderInput.value = cart
        .map(item => `${item.name} x${item.quantity} ($${item.price})`)
        .join(", ");
    }

    // Clear cart after submission
    localStorage.removeItem("cart");
  });
}

// Run updateCart when on cart page
document.addEventListener("DOMContentLoaded", updateCart);
🔧 Where your line belongs:
Your snippet:

js
Copy code
orderInput.value = cart.map(item => `${item.name} x${item.quantity} ($${item.price})`).join(', ');
is already included in the section marked ✅ above — inside:

js
Copy code
if (checkoutForm) {
  checkoutForm.addEventListener("submit", () => {
    const orderInput = document.getElementById("order-details");
    if (orderInput) {
      // Attach hidden order details here
      orderInput.value = ...
    }
  });
}
