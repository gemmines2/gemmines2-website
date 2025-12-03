/* -------------------------
   LOAD CART
-------------------------- */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* -------------------------
   RENDER CART COUNT (HEADER)
-------------------------- */
function renderCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const el = document.getElementById("cart-count");
    if (el) el.textContent = count;
}

/* -------------------------
   RENDER CART PAGE ITEMS
-------------------------- */
function renderCart() {
    const itemsDiv = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!itemsDiv) return;

    itemsDiv.innerHTML = "";

    if (cart.length === 0) {
        itemsDiv.innerHTML = `
            <p style="color:#fff; padding:20px;">Your cart is empty.</p>
        `;
        if (checkoutBtn) checkoutBtn.style.display = "none";
        renderCartCount();
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-details">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p class="price">$${item.price.toFixed(2)} × ${item.qty}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        `;

        itemsDiv.appendChild(div);
    });

    if (checkoutBtn) checkoutBtn.style.display = "block";

    renderCartCount();
}

/* -------------------------
   REMOVE ITEM FROM CART
-------------------------- */
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

/* -------------------------
   CHECKOUT BUTTON
-------------------------- */
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}

/* -------------------------
   ON PAGE LOAD
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    renderCartCount();
    renderCart();
});
