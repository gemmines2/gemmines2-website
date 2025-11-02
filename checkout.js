/ Set current year
document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  // Render cart summary and cart count
  renderCartCount();
  renderCheckout();

  // Payment fields handling
  const paymentRadios = document.querySelectorAll("input[name='payment']");
  const paymentFields = {
    credit: document.getElementById("credit-fields"),
    paypal: document.getElementById("paypal-fields"),
    payoneer: document.getElementById("payoneer-fields"),
    western: document.getElementById("western-fields"),
    bank: document.getElementById("bank-fields")
  };

  function showPaymentFields(selected){
    for(const key in paymentFields){
      paymentFields[key].style.display = key === selected ? "block" : "none";
    }
  }

  // Initially show credit card fields
  showPaymentFields('credit');

  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      showPaymentFields(radio.value);
    });
  });

  // Checkout form submit
  document.getElementById("checkout-form").addEventListener("submit", e => {
    e.preventDefault();

    const paymentMethod = document.querySelector("input[name='payment']:checked").value;

    const contact = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      country: e.target.country.value,
      region: e.target.region.value,
      postal: e.target.postal.value,
      shipping: document.querySelector("input[name='shipping']:checked").value,
      payment: paymentMethod,
      paymentDetails: {}
    };

    // Gather payment details
    switch(paymentMethod){
      case "credit":
        contact.paymentDetails = {
          cardNumber: e.target['card-number'].value,
          expiry: e.target.expiry.value,
          cvv: e.target.cvv.value
        };
        break;
      case "paypal":
        contact.paymentDetails = {
          paypalEmail: e.target['paypal-email'].value
        };
        break;
      case "payoneer":
        contact.paymentDetails = {
          payoneerAccount: e.target['payoneer-account'].value
        };
        break;
      case "western":
        contact.paymentDetails = {
          receiverName: e.target['western-name'].value,
          receiverCountry: e.target['western-country'].value
        };
        break;
      case "bank":
        contact.paymentDetails = {
          bankName: e.target['bank-name'].value,
          accountNumber: e.target['bank-account'].value,
          IBAN: e.target['bank-iban'].value,
          SWIFT: e.target['bank-swift'].value
        };
        break;
    }

    // Place order (simulated)
    placeOrder(contact);

    alert("✅ Thank you! Your order has been placed successfully.");
    window.location.href = "thank-you.html";
  });
});
