const PRODUCTS = [
  { name: "Aquamarine", desc: "Clean aquamarine — approx 2.5 carats — polished", price: 50, img: "images/aquamarine.jpg" },
  { name: "Rhodolite Garnet", desc: "Rhodolite — polished, high lustre", price: 45, img: "images/rhodolite.jpg" },
  { name: "Peridot", desc: "Peridot — bright green, polished", price: 38, img: "images/peridot.jpg" },
  { name: "Hessonite", desc: "Hessonite — rich honey-brown garnet (rough)", price: 35, img: "images/hessonite.jpg" },
  { name: "Green Jasper", desc: "Green jasper — rough uncut stone", price: 30, img: "images/jasper.jpg" },
  { name: "Garnet", desc: "Deep red natural garnet gemstone — polished", price: 42, img: "images/garnet.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");
  PRODUCTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p><strong>$${p.price}</strong></p>
      <button class="btn">Buy Now</button>
    `;
    card.querySelector(".btn").addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(p));
      window.location.href = "checkout.html";
    });
    container.appendChild(card);
  });
});
