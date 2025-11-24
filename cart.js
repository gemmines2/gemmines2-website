// CART.JS - Fully Compatible with Your Product.js

// Add product to cart
function addToCart(id) {
    // Find product by id from product.js
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Get existing cart from localStorage or create new array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product is already in cart
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1; // Increment quantity
    } else {
        cart.push({...product, quantity: 1});
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
}

// Display cart items on cart.html
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!cartContainer || !totalContainer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const itemTotal = parseFloat(item.price.replace("$","")) * item.quantity;
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

    totalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Remove item from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

// Call displayCart automatically on cart page load
document.addEventListener("DOMContentLoaded", displayCart);
