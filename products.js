const PRODUCTS = [
  { name:'Aquamarine', desc:'Clean aquamarine — approx 2.5 carats — polished', price:50, img:'images/aquamarine.jpg' },
  { name:'Rhodolite Garnet', desc:'Rhodolite — polished, high lustre', price:45, img:'images/rhodolite.jpg' },
  { name:'Peridot', desc:'Peridot — bright green, polished', price:38, img:'images/peridot.jpg' },
  { name:'Hessonite', desc:'Hessonite — rich honey-brown garnet (rough)', price:35, img:'images/hessonite.jpg' },
  { name:'Green Jasper (Rough)', desc:'Green jasper — rough uncut stone', price:30, img:'images/jasper.jpg' },
  { name:'Garnet', desc:'Deep red natural garnet gemstone — polished and faceted', price:42, img:'images/garnet.jpg' }
];

const container = document.getElementById("product-list");

PRODUCTS.forEach((product, index) => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.desc}</p>
    <p><strong>$${product.price}</strong></p>
    <button class="btn" onclick="buyNow(${index})">Buy Now</button>
  `;
  container.appendChild(card);
});

function buyNow(index) {
  const product = PRODUCTS[index];
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'checkout.html';
}
