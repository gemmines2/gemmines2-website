document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const paymentDetails = document.getElementById("payment-details");

  // Handle Google Merchant checkout URL with ?id={id}
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId && productId.includes("{")) {
    console.warn("Google test ID detected. Continuing without redirect.");
    // Do NOTHING (continue checkout normally)
  } else if (productId) {
    // If a real productId is provided, add it to cart automatically
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    if (product) {
      const exists = cart.find(item => item.id === productId);
      if (exists) {
        exists.qty += 1;
      } else {
        cart.push({...product, qty: 1});
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      console.warn("Product not found:", productId);
    }
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update payment input fields
  function updatePaymentFields() {
    const selected = document.querySelector('input[name="payment"]:checked');
    if (!selected) return;

    let html = "";
    switch (selected.value) {
      case "credit":
        html = `
          <label>Card Number</label>
          <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" required>
          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" required>
          <label>CVC</label>
          <input type="text" placeholder="123" required>
        `;
        break;
      case "paypal":
        html = `<p>You'll be redirected to PayPal after placing the order.</p>`;
        break;
      case "stripe":
        html = `<p>Stripe payment will be processed after placing the order.</p>`;
        break;
      case "payoneer":
        html = `<p>Payoneer payment details will be emailed to you.</p>`;
        break;
      case "western":
        html = `<p>Western Union instructions will be sent after submission.</p>`;
        break;
      case "bank":
        html = `
          <label>Account Holder Name</label>
          <input type="text" placeholder="Name on account" required>
          <label>IBAN Number</label>
          <input type="text" placeholder="Enter IBAN" required>
          <label>Bank Name</label>
          <input type="text" placeholder="e.g. HBL, Meezan Bank" required>
        `;
        break;
    }
    paymentDetails.innerHTML = html;
    paymentDetails.style.display = "block";
  }

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
        payment: document.querySelector('input[name="payment"]:checked')?.value
      },
      items: cart,
      date: new Date().toLocaleString()
    };

    localStorage.setItem("latestOrder", JSON.stringify(order));
    localStorage.removeItem("cart"); // Clear the cart
    alert("✅ Order placed successfully!");
    window.location.href = "order-success.html"; // Go to your order success page
  });
});
