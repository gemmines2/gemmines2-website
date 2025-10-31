// checkout.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const confirmMsg = document.getElementById("order-confirm");
  const cartSummary = document.getElementById("cart-summary");

  // --- Display cart summary if available ---
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length > 0) {
    cart.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("item");
      div.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      cartSummary.appendChild(div);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total");
    totalDiv.innerHTML = `<span>Total</span><span>$${total.toFixed(2)}</span>`;
    cartSummary.appendChild(totalDiv);
  } else {
    cartSummary.innerHTML += `<p>Your cart is empty.</p>`;
  }

  // --- Handle form submission ---
  form.addEventListener("submit", e => {
    e.preventDefault(); // Stop form reload

    // Simple validation (extra safety)
    const requiredFields = form.querySelectorAll("input[required], select[required]");
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        alert("Please fill out all required fields.");
        field.focus();
        return;
      }
    }

    // Hide form, show confirmation
    form.style.display = "none";
    confirmMsg.style.display = "block";

    // Clear cart (optional)
    localStorage.removeItem("cart");

    // Redirect to thank-you page after 4 seconds
    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 4000);
  });
});
