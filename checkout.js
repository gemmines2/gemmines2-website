document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const detailsBox = document.getElementById("payment-details");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Dynamic payment fields
  const paymentFields = {
    paypal: `
      <label>Email (PayPal Account)</label>
      <input type="email" placeholder="yourname@paypal.com" required>
    `,
    stripe: `
      <label>Stripe Email</label>
      <input type="email" placeholder="yourname@stripe.com" required>
    `,
    payoneer: `
      <label>Payoneer Email</label>
      <input type="email" placeholder="yourname@payoneer.com" required>
    `,
    western: `
      <label>Receiver Name</label>
      <input type="text" placeholder="Full name of receiver" required>
      <label>Country</label>
      <input type="text" placeholder="Country of receiver" required>
    `,
    bank: `
      <label>Account Holder Name</label>
      <input type="text" placeholder="Name on account" required>
      <label>IBAN Number</label>
      <input type="text" placeholder="Enter IBAN" required>
      <label>Bank Name</label>
      <input type="text" placeholder="e.g. HBL, Meezan Bank" required>
    `
  };

  // Update payment fields dynamically
  paymentRadios.forEach(radio => {
    radio.addEventListener("change", e => {
      const val = e.target.value;
      detailsBox.innerHTML = paymentFields[val] || "";
      detailsBox.classList.toggle("active", !!paymentFields[val]);
    });
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      customer: {
        name: form.name?.value || "",
        email: form.email?.value || "",
        phone: form.phone?.value || "",
        address: form.address?.value || "",
        city: form.city?.value || "",
        postal: form.postal?.value || "",
        country: form.country?.value || "",
        shipping: form.shipping?.value || "",
        payment: document.querySelector('input[name="payment"]:checked')?.value || ""
      },
      items: cart,
      date: new Date().toLocaleString()
    };

    // Save order and clear cart
    localStorage.setItem("latestOrder", JSON.stringify(order));
    localStorage.removeItem("cart");

    // Confirmation popup
    alert("✅ Thank you for your order!\nYour order has been successfully placed.");

    // Redirect to thank you page
    window.location.href = "thankyou.html";
  });
});
