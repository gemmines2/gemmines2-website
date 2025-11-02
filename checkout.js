document.addEventListener("DOMContentLoaded", () => {
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const paymentDetails = document.getElementById("payment-details");
  const form = document.getElementById("checkout-form");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update payment input fields
  function updatePaymentFields() {
    const selected = document.querySelector('input[name="payment"]:checked').value;
    let html = "";

    switch (selected) {
      case "credit":
        html = `
          <label for="card-number">Card Number</label>
          <input type="text" id="card-number" name="card-number" placeholder="XXXX-XXXX-XXXX-XXXX" required>
          <label for="card-expiry">Expiry Date</label>
          <input type="text" id="card-expiry" name="card-expiry" placeholder="MM/YY" required>
          <label for="card-cvc">CVC</label>
          <input type="text" id="card-cvc" name="card-cvc" placeholder="123" required>
        `;
        break;
      case "paypal":
        html = `<p>You'll be redirected to PayPal after placing the order.</p>`;
        break;
      case "stripe":
        html = `<p>Stripe payment will be processed after placing the order.</p>`;
        break;
      case "payoneer":
        html = `<p>Pay via Payoneer details will be sent to your email.</p>`;
        break;
      case "western":
        html = `<p>Western Union instructions will be provided after order submission.</p>`;
        break;
      case "bank":
        html = `
          <p>Bank Transfer details:</p>
          <label for="bank-name">Bank Name</label>
          <input type="text" id="bank-name" name="bank-name" placeholder="Bank Name" required>
          <label for="account-number">Account Number</label>
          <input type="text" id="account-number" name="account-number" placeholder="Account Number" required>
        `;
        break;
    }

    paymentDetails.innerHTML = html;
    paymentDetails.style.display = "block";
  }

  updatePaymentFields();
  paymentOptions.forEach(option => option.addEventListener("change", updatePaymentFields));

  // Handle checkout form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      customer: {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        postal: form.postal.value,
        country: form.country.value,
        shipping: form.shipping.value,
        payment: document.querySelector('input[name="payment"]:checked').value
      },
      items: cart,
      date: new Date().toLocaleString()
    };

    localStorage.setItem("latestOrder", JSON.stringify(order));
    localStorage.removeItem("cart"); // clear cart
    alert("Order placed successfully!");

    window.location.href = "order-success.html";
  });
});
