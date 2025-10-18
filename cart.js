function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (storedCart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItemsContainer.innerHTML = storedCart.map((item, index) => `
    <div class="cart-item">
      <strong>${item.name}</strong><br>
      Price: $${item.price}<br>
      <button onclick="removeItem(${index})" class="btn">Remove</button>
    </div>
  `).join("");

  // Update hidden order field for Formspree
  document.getElementById("order-details").value = storedCart
    .map(item => `${item.name} - $${item.price}`)
    .join(", ");
}

// Remove an item from the cart
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// On page load
window.onload = loadCart;

// When user submits the form
document.getElementById("checkout-form").addEventListener("submit", function() {
  localStorage.removeItem("cart");
  alert("Your order has been submitted successfully!");
});
