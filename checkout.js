document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  renderCartCount();

  const paymentRadios = document.querySelectorAll("input[name='payment']");
  const paymentDetails = document.getElementById("payment-details");

  function updatePaymentFields(method){
    let html = '';
    switch(method){
      case "credit":
        html = `
          <label>Card Number</label><input type="text" name="card-number" placeholder="1234 5678 9012 3456" required>
          <label>Expiry Date</label><input type="text" name="expiry" placeholder="MM/YY" required>
          <label>CVV</label><input type="text" name="cvv" placeholder="123" required>
        `;
        break;
      case "bank":
        html = `
          <label>Bank Name</label><input type="text" name="bank-name" placeholder="Bank Name" required>
          <label>Account Number</label><input type="text" name="account-number" placeholder="123456789" required>
          <label>IBAN / SWIFT</label><input type="text" name="iban" placeholder="IBAN / SWIFT" required>
        `;
        break;
      case "paypal":
      case "stripe":
      case "payoneer":
      case "western":
        html = `<label>Transaction / Account ID</label><input type="text" name="txn-id" placeholder="Enter your account or txn ID" required>`;
        break;
      default: html = ''; break;
    }
    paymentDetails.innerHTML = html;
    paymentDetails.style.display = html ? 'block' : 'none';
  }

  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => updatePaymentFields(radio.value));
    if(radio.checked) updatePaymentFields(radio.value);
  });

  document.getElementById("checkout-form").addEventListener("submit", e => {
    e.preventDefault();
    const paymentMethod = document.querySelector("input[name='payment']:checked").value;

    const contact = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      city: e.target.city.value,
      postal: e.target.postal.value,
      country: e.target.country.value,
      shipping: e.target.shipping.value,
      payment: paymentMethod,
      paymentDetails: {}
    };

    // collect dynamic payment fields
    const inputs = paymentDetails.querySelectorAll('input');
    inputs.forEach(i => { contact.paymentDetails[i.name] = i.value; });

    placeOrder(contact);
    alert("✅ Thank you! Your order has been placed successfully.");
    window.location.href = "thank-you.html";
  });
});
