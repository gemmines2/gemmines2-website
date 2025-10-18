let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
    window.location.href = "cart.html";
  });
});

// Display Cart Items
if (document.getElementById("cart-items")) {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.innerHTML = cart
      .map(item => `<div class="cart-item">${item.name} - $${item.price}</div>`)
      .join("");
    total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: $${total}`;
  }

  // Fill order details for checkout form
  const orderField = document.getElementById("order-details");
  if (orderField) {
    orderField.value = cart.map(item => `${item.name} - $${item.price}`).join(", ");
  }
}
