// CART.JS - Fixed version for your product.js

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) {
        console.error("Product not found for ID:", id);
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart after adding:", cart); // Debug log
    alert(product.name + " added to cart!");
    updateCartCount();
}

function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!cartContainer || !totalContainer) {
        console.error("Cart containers not found!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart loaded for display:", cart); // Debug log

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const priceNumber = parseFloat(item.price.replace("$", ""));
        const itemTotal = priceNumber * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <p><strong>${item.name}</strong> x ${item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Subtotal: $${itemTotal.toFixed(2)}</p>
        `;
        cartContainer.appendChild(div);
    });

    totalContainer.innerHTML = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.textContent = cart.length;
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
    updateCartCount();
}

// Call displayCart automatically
document.addEventListener("DOMContentLoaded", displayCart);
