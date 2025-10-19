let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // check if item already exists
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    alert(`${name} added to cart!`);
    window.location.href = 'cart.html';
  });
});

// Display cart on cart.html
if (document.getElementById('cart-items')) {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('total');

  function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      totalContainer.textContent = 'Total: $0';
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <p>${item.name} — $${item.price} × ${item.quantity}</p>
        <button class="btn remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemDiv);

      total += item.price * item.quantity;
    });

    totalContainer.textContent = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });
    });
  }

  renderCart();

  // Proceed to checkout button
  const checkoutButton = document.getElementById('checkout-btn');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }
}

// Display order summary on checkout.html
if (document.getElementById('order-summary')) {
  const summaryContainer = document.getElementById('order-summary');
  const orderInput = document.getElementById('order-details');
  let total = 0;

  if (cart.length === 0) {
    summaryContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} — $${item.price} × ${item.quantity}`;
      list.appendChild(li);
      total += item.price * item.quantity;
    });
    summaryContainer.innerHTML = '';
    summaryContainer.appendChild(list);
    summaryContainer.innerHTML += `<p style="margin-top:1rem;font-weight:bold;">Total: $${total.toFixed(2)}</p>`;
  }
