const PRODUCTS = [
  { id: "aquamarine", name: "Aquamarine", desc: "Clean aquamarine — approx 2.5 carats — polished", price: 50, img: "images/aquamarine.jpg" },
  { id: "rhodolite", name: "Rhodolite Garnet", desc: "Rhodolite — polished, high lustre", price: 45, img: "images/rhodolite.jpg" },
  { id: "emerald", name: "Emerald", desc: "Natural green emerald, polished", price: 70, img: "images/emerald.jpg" }
];

// Render products on products.html
function renderProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = PRODUCTS.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="meta">
        <span class="price">$${p.price}</span>
        <button class="buy" data-id="${p.id}">Buy Now</button>
      </div>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", renderProducts)
