let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    // Update both the count in the nav and any other cart-count spans
    const el = document.getElementById("cart-count");
    if (el) el.textContent = count;
    document.querySelectorAll('.cart-count').forEach(span => span.textContent = count);
}

function renderCart() {
    const itemsDiv = document.getElementById("cart-items");
    const totalSpan = document.getElementById("grand-total");
    const checkoutBtn = document.querySelector(".checkout-btn");

    if (!itemsDiv) return;

    itemsDiv.innerHTML = "";
    let grandTotal = 0;

    if (cart.length === 0) {
        itemsDiv.innerHTML = `<p style="color:#fff; padding:20px; text-align:center;">Your cart is empty.</p>`;
        if (totalSpan) totalSpan.textContent = "0.00";
        if (checkoutBtn) checkoutBtn.style.display = "none";
        renderCartCount();
        return;
    }

    cart.forEach(item => {
        // Calculate the total for all items
        grandTotal += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">$${item.price.toFixed(2)} × ${item.qty}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        itemsDiv.appendChild(div);
    });

    // UPDATE THE GRAND TOTAL ON SCREEN
    if (totalSpan) {
        totalSpan.textContent = grandTotal.toFixed(2);
    }
    
    if (checkoutBtn) checkoutBtn.style.display = "block";
    renderCartCount();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});
