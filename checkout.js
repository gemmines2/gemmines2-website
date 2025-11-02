// checkout.js
document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {

  renderCartCount();
  renderCheckout();

  const paymentRadios = document.querySelectorAll("input[name='payment']");
  const paymentDetails = document.getElementById("payment-details");

  // Show/hide payment details based on selection
  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      const val = radio.value;
      if(val === 'credit' || val === 'stripe' || val === 'bank') {
        paymentDetails.style.display = 'grid';
      } else {
        paymentDetails.style.display = 'none';
      }
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
      payment: paymentMethod,
      card: e.target['card-number']?.value || '',
      expiry: e.target.expiry?.value || '',
      cvv: e.target.cvv?.value || '',
      bank: e.target['bank-account']?.value || ''
    };

    // Simulate order
    placeOrder(contact);
    alert("✅ Thank you! Your order has been placed successfully.");
    window.location.href = "thank-you.html";
  });

});
