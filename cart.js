const SITE={ownerEditMode:true};
const CART_KEY='gemmines2_cart_v3';

const PRODUCTS = [
  { id:'aq-1', cat:'cut', name:'Aquamarine', desc:'Clean aquamarine — approx 2.5 carats — polished', price:50, imgs:['images/aquamarine.jpg'] },
  { id:'rh-1', cat:'cut', name:'Rhodolite Garnet', desc:'Rhodolite — polished, high lustre', price:45, imgs:['images/rhodolite.jpg'] },
  { id:'ci-1', cat:'cut', name:'Citrine', desc:'Citrine — warm yellow, faceted', price:40, imgs:['images/citrine.jpg'] },
  { id:'pe-1', cat:'cut', name:'Peridot', desc:'Peridot — bright green, polished', price:38, imgs:['images/peridot.jpg'] },
  { id:'he-1', cat:'rough', name:'Hessonite', desc:'Hessonite — rich honey-brown garnet (rough)', price:35, imgs:['images/hessonite.jpg'] },
  { id:'gj-1', cat:'rough', name:'Green Jasper', desc:'Rough green jasper', price:30, imgs:['images/green-jasper.jpg'] },
  { id:'jt-1', cat:'tumbled', name:'Mixed Tumbled Jasper', desc:'Tumbled river jasper pebbles — polished & smooth', price:28, imgs:['images/jasper-tumbled.jpg'] }
];

function loadCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||{}}catch(e){return{}}}
function saveCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart)); renderCartCount();}
function addToCart(id,qty=1){const cart=loadCart();cart[id]=(cart[id]||0)+qty;saveCart(cart); renderCartPanel();}
function removeFromCart(id){const cart=loadCart();delete cart[id];saveCart(cart); renderCartPanel();}
function setQty(id,qty){const cart=loadCart();if(qty<=0)delete cart[id];else cart[id]=qty;saveCart(cart); renderCartPanel();}
function cartItemsDetailed(){const cart=loadCart();const items=[];for(const id in cart){const p=PRODUCTS.find(x=>x.id===id);if(p)items.push({...p,qty:cart[id]});}return items;}

function renderSection(cat,containerId){
  const container=document.getElementById(containerId);
  container.innerHTML='';
  PRODUCTS.filter(p=>p.cat===cat).forEach(p=>{
    const card=document.createElement('div'); card.className='product';
    const img=document.createElement('img'); img.src=p.imgs[0]; img.alt=p.name;
    const h=document.createElement('h3'); h.innerText=p.name; h.contentEditable=SITE.ownerEditMode;
    const d=document.createElement('p'); d.innerText=p.desc; d.contentEditable=SITE.ownerEditMode;
    const meta=document.createElement('div'); meta.className='meta'; meta.innerHTML=`<div class="price">$${p.price}</div><div><button class="buy" data-id="${p.id}">Buy</button></div>`;
    card.appendChild(img); card.appendChild(h); card.appendChild(d); card.appendChild(meta); container.appendChild(card);
  });
}

function attachBuyButtons(){ document.querySelectorAll('.buy').forEach(b=>b.addEventListener('click',e=>{ addToCart(b.dataset.id); alert('Added to cart'); })); }

function renderCartCount(){document.getElementById('cart-count')&&(document.getElementById('cart-count').innerText=cartItemsDetailed().reduce((s
