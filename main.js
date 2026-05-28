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
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ORDER = 'YOUR_ORDER_TEMPLATE_ID'; // e.g. 'template_xyz789'
const EMAILJS_TEMPLATE_CONTACT = 'YOUR_CONTACT_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'aBcDeFgHiJk'

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
    showToast(`"${product.name}" added to cart ✓`, 'success');
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
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      })
    );
  }
  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
  // Cart badge
  Cart.updateBadge();
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

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  // Init EmailJS if available
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
});
