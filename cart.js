// Function to render cart items
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  cartItemsContainer.innerHTML = '';

  if(cart.length === 0){
    cartItemsContainer.innerHTML = '<p style="color:#b7c7d3;">Your cart is empty.</p>';
    checkoutBtn.style.display = 'none';
  } else {
    checkoutBtn.style.display = 'block';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
          <h4>${item.name}</h4>
          <p class="price">$${item.price.toFixed(2)} x ${item.qty}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
    });
  }
  renderCartCount();
}

// Update cart header count
function renderCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cart-count').textContent = totalQty;
}

// Remove item
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Checkout button
function checkout() {
  alert('Proceeding to checkout (add your payment page here)');
  // Example: window.location.href = 'checkout.html';
}

// Add to cart (can also be called from product page)
function addToCart(id) {
  fetch('products.js')
    .then(() => {
      const product = products.find(p => p.id === id);
      if(!product) return;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const exists = cart.find(item => item.id === id);
      if(exists) exists.qty += 1;
      else cart.push({...product, qty:1});
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartCount();
      alert(product.name + ' added to cart!');
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCart);
