// checkout.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.getElementById("payment-details");

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ===== Handle direct GMC checkout URL =====
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId && productId !== "{id}") {
        const product = products.find(p => p.id === productId);
        if (product) {
            const alreadyInCart = cart.some(item => item.id === product.id);
            if (!alreadyInCart) {
                cart.push({ ...product, quantity: 1 });
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
    }

    // ===== Render checkout items =====
    function renderCheckoutItems() {
        const container = document.getElementById("checkout-items");
        if (!container) return;

        container.innerHTML = "";
        if (cart.length === 0) {
            container.innerHTML = "<p>Your cart is empty. Add a product first.</p>";
            return;
        }

        cart.forEach(item => {
            const div = document.createElement("div");
            div.className = "checkout-item";
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="80">
                <p>${item.name}</p>
                <p>Price: $${item.price}</p>
                <p>Qty: ${item.quantity}</p>
            `;
            container.appendChild(div);
        });
    }

    renderCheckoutItems();

    // ===== Update payment input fields =====
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

    // ===== Handle checkout form submission =====
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
        window.location.href = "order-success.html"; // Redirect to order-success page
    });
});
