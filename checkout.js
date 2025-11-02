// checkout.js — handles checkout form + payment options

document.addEventListener('DOMContentLoaded', () => {
  renderCheckout(); // from cart.js — shows cart summary

  const form = document.getElementById('checkout-form');
  if (!form) return;

  const paymentSelect = document.getElementById('payment-method');
  const creditDetails = document.getElementById('credit-details');
  const bankDetails = document.getElementById('bank-details');

  // Toggle fields depending on payment method
  paymentSelect.addEventListener('change', e => {
    const value = e.target.value;
    creditDetails.style.display = (value === 'credit') ? 'block' : 'none';
    bankDetails.style.display = (value === 'bank') ? 'block' : 'none';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const address = form.querySelector('[name="address"]').value.trim();
    const payment = paymentSelect.value;

    if (!name || !email || !address) {
      alert('Please fill in all required contact details.');
      return;
    }

    const contact = { name, email, address, payment };

    if (payment === 'credit') {
      contact.cardNumber = form.querySelector('[name="card-number"]').value.trim();
      contact.expiry = form.querySelector('[name="expiry"]').value.trim();
      contact.cvv = form.querySelector('[name="cvv"]').value.trim();
    }

    if (payment === 'bank') {
      contact.bankName = form.querySelector('[name="bank-name"]').value.trim();
      contact.accountNumber = form.querySelector('[name="account-number"]').value.trim();
      contact.iban = form.querySelector('[name="iban"]').value.trim();
    }

    placeOrder(contact); // from cart.js
    alert('✅ Thank you! Your order has been placed successfully.');
    window.location.href = 'thank-you.html';
  });
});
