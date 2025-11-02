document.addEventListener("DOMContentLoaded", () => {
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const paymentDetails = document.getElementById("payment-details");

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
    paymentDetails.style.display = selected === "credit" || selected === "bank" ? "block" : "block";
  }

  // Initialize on page load
  updatePaymentFields();

  // Update when a payment option is selected
  paymentOptions.forEach(option => option.addEventListener("change", updatePaymentFields));
});
