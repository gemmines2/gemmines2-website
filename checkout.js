document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     🔹 1. PAYMENT METHOD TOGGLING
  --------------------------------*/
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const paymentFields = {
    card: document.getElementById('card-fields'),
    paypal: document.getElementById('paypal-fields'),
    payoneer: document.getElementById('payoneer-fields'),
    bank: document.getElementById('bank-fields'),
    ria: document.getElementById('ria-fields'),
    stripe: document.getElementById('stripe-fields')
  };

  function hideAllPaymentFields() {
    for (const key in paymentFields) paymentFields[key].style.display = 'none';
  }

  hideAllPaymentFields();
  paymentFields['card'].style.display = 'block';

  paymentRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      hideAllPaymentFields();
      const selected = radio.value;
      if(paymentFields[selected]) paymentFields[selected].style.display = 'block';
    });
  });

  /* ---------------------------------------
     🔹 2. HANDLE DIRECT ?id= PRODUCT ADD
  ----------------------------------------*/
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const exists = cart.find(item => item.id == product.id);
      if (!exists) {
        cart.push({ ...product, qty: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      // 🔹 Show order summary in checkout
      const summaryDiv = document.getElementById('product-summary');
      if (summaryDiv) {
        summaryDiv.innerHTML = `
          <h2>🛍 Order Summary</h2>
          <img src="${product.image}" alt="${product.name}" style="width:120px;border-radius:6px;">
          <p><strong>${product.name}</strong></p>
          <p>Price: ${product.price}</p>
          <p>Quantity: 1</p>
        `;
      }
    }
  }

  /* ---------------------------------------
     🔹 3. FORM SUBMISSION (FINAL ORDER SAVE)
  ----------------------------------------*/
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      customer: {
        fullname: form.fullname.value,
        email: form.email.value,
        contact: form.contact.value,
        address1: form.address1.value,
        address2: form.address2.value,
        city: form.city.value,
        state: form.state.value,
        postal: form.postal.value,
        country: form.country.value,
        payment: document.querySelector('input[name="payment"]:checked')?.value,
      },
      items: cart,
      date: new Date().toLocaleString()
    };

    localStorage.setItem('latestOrder', JSON.stringify(order));
    localStorage.removeItem('cart');
    window.location.href = "thankyou.html";
  });

});
