let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Handle Buy Now button click
document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', e => {
    const name = e.target.getAttribute('data-name');
    const price = e.target.getAttribute('data-price');
    addToCart(name, price);
    window.location.href = 'cart.html'; // Redirect to cart page
  });
});

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

// =====================
// CART PAGE
// =====================

if (window.location.pathname.includes('cart.html')) {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');

  function renderCart() {
    if (!cartContainer) return;
    cartContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.quantity * item.price;
      total += itemTotal;
      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <p>${item.name} - $${item.price} x ${item.quantity}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(div);
    });
    if (totalContainer) totalContainer.textContent = `Total: $${total}`;
    attachRemoveHandlers();
  }

  function attachRemoveHandlers() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();
}

// =====================
// CHECKOUT PAGE
// =====================

if (window.location.pathname.includes('checkout.html')) {
  const orderInput = document.getElementById('order-details');
  if (orderInput) {
    orderInput.value = JSON.stringify(cart, null, 2);
  }
}
