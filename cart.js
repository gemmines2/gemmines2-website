// Get cart items from local storage or create an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
    window.location.href = "cart.html"; // Redirect to cart page
  });
});

// === CART PAGE DISPLAY ===
if (window.location.pathname.includes('cart.html')) {
  const cartContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total');

  function updateCartDisplay() {
    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
          <p><strong>${item.name}</strong> — $${item.price} × ${item.quantity}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
      });
    }

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  cartContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCartDisplay();
    }
  });

  document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = "checkout.html";
  });

  updateCartDisplay();
}

// === CHECKOUT PAGE POPULATE ORDER DETAILS ===
if (window.location.pathname.includes('checkout.html')) {
  const orderDetails = document.getElementById('order-details');
  if (orderDetails) {
    const summary = cart.map(item => `${item.name} (${item.quantity})`).join(', ');
    orderDetails.value = summary;
  }

  // After submitting the order, clear the cart
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', () => {
      localStorage.removeItem('cart');
    });
  }
}
