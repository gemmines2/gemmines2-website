let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    displayCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    displayCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <span>${item.name} — $${item.price} × ${item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
    });

    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

// Clear cart on successful checkout
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
}

// Initialize cart display
document.addEventListener("DOMContentLoaded", displayCart)
