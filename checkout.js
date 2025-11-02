document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  renderCartCount();
  renderCheckout();

  const paymentRadios = document.querySelectorAll("input[name='payment']");
  const cardDetails = document.getElementById("card-details");

  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      cardDetails.style.display = radio.value === "credit" ? "block" : "none";
    });
  });

  document.getElementById("checkout-form").addEventListener("submit", e => {
    e.preventDefault();
    const paymentMethod = document.querySelector("input[name='payment']:checked").value;
    const contact = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: e.target.address.value,
      country: e.target.country.value,
      payment: paymentMethod
    };
    placeOrder(contact);
    alert("✅ Thank you! Your order has been placed successfully.");
    window.location.href = "thank-you.html";
  });
});
