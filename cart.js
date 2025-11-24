// CART.JS - Fully working version
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to cart!");
}

function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    if (!cartContainer || !totalContainer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const priceNum = parseFloat(item.price.replace("$", ""));
        const subtotal = priceNum * item.quantity;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <p><strong>${item.name}</strong> x ${item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
        `;
        cartContainer.appendChild(div);
    });

    totalContainer.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", displayCart)
