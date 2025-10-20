function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    if(!cartContainer) return; // STOP if the page doesn't have a cart section
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

    const totalContainer = document.getElementById("cart-total");
    if(totalContainer) totalContainer.textContent = `Total: $${total.toFixed(2)}`;
