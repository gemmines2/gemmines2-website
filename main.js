
/* ═══════════════════════════════════════════
   GEMMINES2 — Global JavaScript
   ═══════════════════════════════════════════ */

/* ── EMAILJS CONFIG ────────────────────────────────────────
   SETUP STEPS:
   1. Go to https://www.emailjs.com and sign in
   2. Add a Gmail service → copy the Service ID below
   3. Create an email template → copy the Template ID below
   4. Get your Public Key from Account → API Keys
   ──────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID   = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ORDER = 'YOUR_ORDER_TEMPLATE_ID'; // e.g. 'template_xyz789'
const EMAILJS_TEMPLATE_CONTACT = 'YOUR_CONTACT_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';   // e.g. 'aBcDeFgHiJk'

/* ── CART ────────────────────────────────────────────────── */
const Cart = {
  KEY: 'gm2_cart',
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  },
  save(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); },
  add(product) {
    const items = this.get();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) { items[idx].qty = (items[idx].qty || 1) + 1; }
    else { items.push({ ...product, qty: 1 }); }
   this.save(items);
    this.updateBadge();
    showToast(`"${product.shortName || product.name}" added — taking you to cart…`, 'success');
    setTimeout(() => { window.location.href = 'cart.html'; }, 1200);
  
  },
  remove(id) {
    const items = this.get().filter(i => i.id !== id);
    this.save(items);
    this.updateBadge();
  },
  clear() { localStorage.removeItem(this.KEY); this.updateBadge(); },
  total() { return this.get().reduce((s, i) => s + i.price * (i.qty || 1), 0); },
  count() { return this.get().reduce((s, i) => s + (i.qty || 1), 0); },
  updateBadge() {
    const count = this.count();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count > 0 ? `(${count})` : '(0)';
    });
  }
};

/* ── TOAST ───────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  let toast = document.getElementById('gm2-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'gm2-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── HEADER / NAV ────────────────────────────────────────── */
function initHeader() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      })
    );
  }
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
  Cart.updateBadge();
}

/* ── PRODUCT DETAILED PAGE INTERACTION ───────────────────── */
function initProductPage() {
  const addToCartBtn = document.getElementById('addToCartBtn');
  if (!addToCartBtn) return; // Safely exits if it's a non-product page (like index or contact)

  addToCartBtn.addEventListener('click', () => {
    const idEl = document.getElementById('prod-id');
    const nameEl = document.getElementById('prod-name');
    const priceEl = document.getElementById('prod-price');
    const imgEl = document.getElementById('prod-primary-img');

    // Confirm the page actually has the gemstone info before trying to add it
    if (idEl && nameEl && priceEl) {
      const product = {
        id: idEl.value || idEl.textContent.trim(),
        name: nameEl.value || nameEl.textContent.trim(),
        price: parseFloat(priceEl.value || priceEl.textContent.replace(/[^0-9.]/g, '')),
        image: imgEl ? imgEl.getAttribute('src') : 'images/placeholder.png'
      };
      
      Cart.add(product);
    }
  });
}

/* ── ORDER ID ─────────────────────────────────────────────── */
function generateOrderId() {
  return 'GM-' + Date.now().toString().slice(-9);
}

/* ── FIELD VALIDATION ────────────────────────────────────── */
function validateField(id, errId, pattern) {
  const el = document.getElementById(id);
  const errEl = document.getElementById(errId);
  if (!el) return true;
  const val = el.value.trim();
  const fail = !val || (pattern && !pattern.test(val));
  el.classList.toggle('error', fail);
  if (errEl) errEl.classList.toggle('show', fail);
  return !fail;
}

/* ── COPYRIGHT & SECURITY PROTECTION ─────────────────────── */
function initSecurity() {
  // Disable right-click context menu
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable image drag
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  // Disable text selection on product images
  document.querySelectorAll('.prod-img-wrap img, .hero img').forEach(img => {
    img.style.userSelect = 'none';
    img.style.webkitUserSelect = 'none';
    img.setAttribute('draggable', 'false');
  });

  // Disable common keyboard shortcuts for copying/saving
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && (e.key === 's' || e.key === 'u')) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key === 'I') e.preventDefault();
    if (e.key === 'F12') e.preventDefault();
  });

  // Watermark console with copyright notice
  console.log(
    '%c© 2026 Gemmines2 — All Rights Reserved\nUnauthorized copying, scraping or redistribution of content is strictly prohibited.',
    'color:#20b2aa;font-weight:bold;font-size:13px;'
  );
}

/* ── STRUCTURED DATA (JSON-LD) ───────────────────────────── */
function injectStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "Gemmines2",
    "url": "https://gemmines2.github.io/gemmines2-website/",
    "logo": "https://gemmines2.github.io/gemmines2-website/images/logo.png",
    "image": "https://gemmines2.github.io/gemmines2-website/images/logo.png",
    "telephone": "+92-336-214-9415",
    "priceRange": "$$",
    "description": "100% natural, unheated gemstones from Pakistan and Sri Lanka. Sapphires, rubies, emeralds, garnets and custom silver jewelry. Ethically sourced, worldwide shipping.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House 602, Gali 6, Sector G11/1",
      "addressLocality": "Islamabad",
      "addressCountry": "PK",
      "postalCode": "44000"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-336-214-9415",
      "contactType": "customer service",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://wa.me/923362149415"
    ],
    "currenciesAccepted": "USD",
    "paymentAccepted": "Payoneer, Bank Transfer, JazzCash, EasyPaisa",
    "openingHours": "Mo-Su 09:00-21:00"
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
}

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initProductPage(); // Wakes up the cart button listener safely
  initSecurity();
  injectStructuredData();
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
});
