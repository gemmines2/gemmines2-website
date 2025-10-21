const SITE = { ownerEditMode: true };
const CART_KEY = 'gemmines2_cart_final_v2';

const PRODUCTS = [
  { id:'aq-1', cat:'cut', name:'Aquamarine', desc:'Clean aquamarine — approx 2.5 carats — polished', price:50, imgs:['images/aquamarine.jpg','aquamarine.jpg'] },
  { id:'rh-1', cat:'cut', name:'Rhodolite Garnet', desc:'Rhodolite — polished, high lustre', price:45, imgs:['images/rhodolite.jpg','rhodolite.jpg'] },
  { id:'ci-1', cat:'cut', name:'Citrine', desc:'Citrine — warm yellow, faceted', price:40, imgs:['images/citrine.jpg','citrine.jpg'] },
  { id:'pe-1', cat:'cut', name:'Peridot', desc:'Peridot — bright green, polished', price:38, imgs:['images/peridot.jpg','peridot.jpg'] },
  { id:'he-1', cat:'rough', name:'Hessonite', desc:'Hessonite — rich honey-brown garnet (rough)', price:35, imgs:['images/hessonite.jpg','hessonite.jpg'] },
  { id:'gj-1', cat:'rough', name:'Green Jasper (rough)', desc:'Green jasper — rough uncut stone', price:30, imgs:['images/green-jasper.jpg','green-jasper.jpg'] },
  { id:'jt-1', cat:'tumbled', name:'Mixed Tumbled Jasper', desc:'Tumbled river jasper pebbles — polished & smooth', price:28, imgs:['images/jasper-tumbled.jpg','jasper-tumbled.jpg'] }
];

/* ---------- CART ---------- */
function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch(e){ return {}; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); renderCartPanel(); renderCartCount(); }
function addToCart(productId, qty=1){ const cart = loadCart(); cart[productId] = (cart[productId]||0)+qty; saveCart(cart); renderCheckout(); }
function removeFromCart(productId){ const cart = loadCart(); delete cart[productId]; saveCart(cart); renderCheckout(); }
function setQty(productId, qty){ const cart = loadCart(); if(qty<=0) delete cart[productId]; else cart[productId]=qty; saveCart(cart); renderCheckout(); }
function cartItemsDetailed(){ const cart = loadCart(); const items = []; for(const id in cart){ const p = PRODUCTS.find(x=>x.id===id); if(p) items.push({...p, qty: cart[id]}); } return items; }

/* ---------- IMAGE FALLBACK ---------- */
function setImgWithFallback(imgEl, srcList){
  imgEl._tries=0;
  imgEl.onerror=function(){
    imgEl._tries++;
    if(imgEl._tries<srcList.length) imgEl.src=srcList[imgEl._tries];
    else imgEl.src='data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#071426"/><text x="50%" y="50%" fill="#9fb7d6" font-size="18" text-anchor="middle" dy=".3em">Image not found</text></svg>`);
  };
  imgEl.src=srcList[0];
}

/* ---------- RENDERING ---------- */
function renderSection(cat, containerId, counterId){
  const container=document.getElementById(containerId); container.innerHTML='';
  const list=PRODUCTS.filter(p=>p.cat===cat);
  document.getElementById(counterId).innerText=list.length;
  list.forEach(p=>{
    const card=document.createElement('div'); card.className='product';
    const img=document.createElement('img'); img.alt=p.name; setImgWithFallback(img,p.imgs);
    const h=document.createElement('h3'); h.className='p-name'; h.contentEditable=SITE.ownerEditMode; h.dataset.id=p.id; h.innerText=p.name;
    const d=document.createElement('p'); d.className='p-desc'; d.contentEditable=SITE.ownerEditMode; d.dataset.id=p.id; d.innerText=p.desc;
    const meta=document.createElement('div'); meta.className='meta'; meta.innerHTML=`<div class="price">$${p.price}</div><div><button class="buy" data-id="${p.id}">Buy</button></div>`;
    card.appendChild(img); card.appendChild(h); card.appendChild(d); card.appendChild(meta); container.appendChild(card);
  });
}

function attachInlineSave(){
  if(!SITE.ownerEditMode) return;
  document.addEventListener('blur', function(e){
    const t=e.target;
    if(t.matches('[data-id].p-desc') || t.matches('[data-id].p-name')){
      const id=t.dataset.id;
      const prod=PRODUCTS.find(x=>x.id===id);
      if(prod){ if(t.classList.contains('p-name')) prod.name=t.innerText.trim(); else prod.desc=t.innerText.trim(); }
    }
  }, true);
}

/* ---------- SEARCH ---------- */
document.getElementById('quick-search').addEventListener('input', e=>{
  const q=e.target.value.trim().toLowerCase();
  if(!q){ renderAll(); return; }
  const filtered=PRODUCTS.filter(p=>(p.name+' '+p.desc).toLowerCase().includes(q));
  document.getElementById('products-cut').innerHTML='';
  document.getElementById('products-rough').innerHTML='';
  document.getElementById('products-tumbled').innerHTML='';
  filtered.forEach(p=>{
    const el=document.createElement('div'); el.className='product';
    const img=document.createElement('img'); img.alt=p.name; setImgWithFallback(img,p.imgs);
    const h=document.createElement('h3'); h.className='p-name'; h.contentEditable=SITE.ownerEditMode; h.dataset.id=p.id; h.innerText=p.name;
    const d=document.createElement('p'); d.className='p-desc'; d.contentEditable=SITE.ownerEditMode; d.dataset.id=p.id; d.innerText=p.desc;
    const meta=document.createElement('div'); meta.className='meta'; meta.innerHTML=`<div class="price">$${p.price}</div><div><button class="buy" data-id="${p.id}">Buy</button></div>`;
    el.appendChild(img); el.appendChild(h); el.appendChild(d); el.appendChild(meta); document.getElementById('products-cut').appendChild(el);
  });
});
document.getElementById('clear-search').addEventListener('click', ()=>{ document.getElementById('quick-search').value=''; renderAll(); });

/* ---------- CART ---------- */
document.getElementById('cart-toggle').addEventListener('click', ()=>{
  const c=document.getElementById('cart');
  c.style.display=c.style.display==='none'?'block':'none';
  renderCartPanel();
});

function renderCartCount(){ document.getElementById('cart-count').innerText=cartItemsDetailed().reduce((s,i)=>s+i.qty,0); }

function renderCartPanel(){
  const container=document.getElementById('cart-items'); container.innerHTML='';
  const items=cartItemsDetailed(); let total=0;
  items.forEach(it=>{
    total+=it.qty*it.price;
    const row=document.createElement('div'); row.className='cart-item';
    const imgSrc=(it.imgs&&it.imgs[0])||'';
    row.innerHTML=`<img src="${imgSrc}" alt="${it.name}"><div style="flex:1"><div class="title">${it.name}</div><div style="color:var(--muted);font-size:0.9rem">$${it.price} × <input style="width:54px;border-radius:6px;padding:6px;background:transparent;border:1px solid rgba(255,255,255,0.03);color:inherit" type="number" value="${it.qty}" min="1" data-cart-id="${it.id}" class="qty-input"></div></div><button data-remove="${it.id}" style="background:transparent;border:none;color:var(--muted);font-weight:700;cursor:pointer">Remove</button>`;
    container.appendChild(row);
  });
  document.getElementById('cart-total').innerText='$'+total.toFixed(2);
  container.querySelectorAll('.qty-input').forEach(inp=>inp.addEventListener('change', e=>{ const id=e.target.dataset.cartId; setQty(id,parseInt(e.target.value)||1); }));
  container.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click', e=>removeFromCart(b.dataset.remove)));
  renderCartCount();
}

/* ---------- BUY HANDLER ---------- */
document.addEventListener('click', e=>{ if(e.target.matches('.buy')){ addToCart(e.target.dataset.id); alert('Added to cart'); } });
document.getElementById('go-checkout').addEventListener('click', ()=>document.getElementById('checkout').scrollIntoView({behavior:'smooth'}));

/* ---------- CHECKOUT ---------- */
function renderCheckout(){
  const items=cartItemsDetailed(); const container=document.getElementById('cart-summary');
  if(items.length===0){ container.innerHTML='<div style="color:var(--muted)">Your cart is empty.</div>'; return; }
  let html='<div style="background:rgba(255,255,255,0.02);padding:12px;border-radius:8px">'; let total=0;
  items.forEach(it){ html+=`<div style="display:flex;justify-content:space-between;padding:6px 0"><div>${it.name} × ${it.qty}</div><div>$${(it.price*it.qty).toFixed(2)}</div></div>`; total+=it.price*it.qty; }
  html+=`<hr style="border:none;border-top:1px dashed rgba(255,255,255,0.04);margin:8px 0"/><div style="display:flex;justify-content:space-between;font-weight:800">Total<div>$${total.toFixed(2)}</div></div></div>`;
  container.innerHTML=html; document.getElementById('cart-total').innerText='$'+total.toFixed(2);
}

document.getElementById('place-order').addEventListener('click', ()=>{
  const name=document.getElementById('c-name').value.trim();
  const email=document.getElementById('c-email').value.trim();
  const phone=document.getElementById('c-phone').value.trim();
  const addr=document.getElementById('c-address').value.trim();
  if(!name||!email||!phone||!addr){ alert('Please complete contact & shipping information.'); return; }
  const order={ id:'ORD-'+Date.now(), items:cartItemsDetailed(), contact:{name,email,phone,addr}, total:document.getElementById('cart-total').innerText };
  console.log('ORDER', order); localStorage.removeItem(CART_KEY); renderCartPanel(); renderCartCount(); renderCheckout();
  document.getElementById('order-success').style.display='block';
  document.getElementById('c-name').value=''; document.getElementById('c-email').value=''; document.getElementById('c-phone').value=''; document.getElementById('c-address').value='';
});

/* ---------- INIT ---------- */
attachInlineSave();
document.addEventListener('DOMContentLoaded', ()=>{ renderAll(); });

function renderAll(){ renderSection('cut','products-cut','products-count-cut'); renderSection('rough','products-rough','products-count-rough'); renderSection('tumbled','products-tumbled','products-count-tumbled'); renderCartPanel(); renderCartCount(); renderCheckout(); }
