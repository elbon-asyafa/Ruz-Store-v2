/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const categories = [
  { id: 'pensil-pulpen',    name: 'Pensil & Pulpen',    icon: '✏️', count: 12 },
  { id: 'buku-kertas',      name: 'Buku & Kertas',      icon: '📒', count: 9  },
  { id: 'penggaris-alat',   name: 'Penggaris & Alat',   icon: '📐', count: 7  },
  { id: 'perekat-penjepit', name: 'Perekat & Penjepit', icon: '📎', count: 6  },
  { id: 'warna-seni',       name: 'Warna & Seni',       icon: '🎨', count: 10 },
  { id: 'tas-tempat',       name: 'Tas & Tempat',       icon: '🎒', count: 5  },
];

const products = [
  { id:1,  name:'Pulpen Pilot G-2 0.5mm',            brand:'Pilot',         price:18000, oldPrice:22000, rating:4.8, reviews:342, emoji:'🖊️', cat:'pensil-pulpen',    badge:'sale', wishlist:false },
  { id:2,  name:'Pensil Faber-Castell 2B (12pcs)',    brand:'Faber-Castell', price:32000, oldPrice:null,  rating:4.9, reviews:187, emoji:'✏️', cat:'pensil-pulpen',    badge:'hot',  wishlist:false },
  { id:3,  name:'Buku Tulis Sidu 58 Lembar',          brand:'Sinar Dunia',   price:7500,  oldPrice:null,  rating:4.5, reviews:520, emoji:'📓', cat:'buku-kertas',      badge:'new',  wishlist:false },
  { id:4,  name:'Penggaris Besi 30cm',                brand:'Joyko',         price:12000, oldPrice:15000, rating:4.7, reviews:98,  emoji:'📏', cat:'penggaris-alat',   badge:'sale', wishlist:false },
  { id:5,  name:'Spidol Snowman Warna-warni (12pcs)', brand:'Snowman',       price:28000, oldPrice:35000, rating:4.6, reviews:213, emoji:'🖍️', cat:'warna-seni',       badge:'sale', wishlist:false },
  { id:6,  name:'Penghapus Steadtler Jumbo',          brand:'Steadtler',     price:9000,  oldPrice:null,  rating:4.8, reviews:402, emoji:'🟦', cat:'pensil-pulpen',    badge:null,   wishlist:false },
  { id:7,  name:'Buku Gambar A4 (20 lembar)',         brand:'Sinar Dunia',   price:15000, oldPrice:null,  rating:4.4, reviews:76,  emoji:'📋', cat:'buku-kertas',      badge:'new',  wishlist:false },
  { id:8,  name:'Penjepit Kertas (50pcs)',             brand:'Kenko',         price:11000, oldPrice:14000, rating:4.5, reviews:89,  emoji:'📎', cat:'perekat-penjepit', badge:'sale', wishlist:false },
  { id:9,  name:'Cat Air Kenko 12 Warna',             brand:'Kenko',         price:45000, oldPrice:55000, rating:4.7, reviews:154, emoji:'🎨', cat:'warna-seni',       badge:'sale', wishlist:false },
  { id:10, name:'Stabilo Boss Highlighter 4 Warna',   brand:'Stabilo',       price:38000, oldPrice:null,  rating:4.9, reviews:287, emoji:'🌈', cat:'warna-seni',       badge:'hot',  wishlist:false },
  { id:11, name:'Tape Double Tip 3M',                 brand:'3M',            price:22000, oldPrice:28000, rating:4.6, reviews:143, emoji:'🔖', cat:'perekat-penjepit', badge:'sale', wishlist:false },
  { id:12, name:'Jangka Lipat Geometri Set',          brand:'Joyko',         price:55000, oldPrice:65000, rating:4.5, reviews:67,  emoji:'📐', cat:'penggaris-alat',   badge:null,   wishlist:false },
  { id:13, name:'Tempat Pensil Kanvas Motif',         brand:'Generic',       price:35000, oldPrice:null,  rating:4.3, reviews:98,  emoji:'🗂️', cat:'tas-tempat',       badge:'new',  wishlist:false },
  { id:14, name:'Post-it Notes 3M (6 warna)',         brand:'3M',            price:42000, oldPrice:50000, rating:4.8, reviews:310, emoji:'📌', cat:'perekat-penjepit', badge:'sale', wishlist:false },
  { id:15, name:'Buku Agenda Harian Premium',         brand:'Kiky',          price:68000, oldPrice:80000, rating:4.7, reviews:222, emoji:'📅', cat:'buku-kertas',      badge:null,   wishlist:false },
  { id:16, name:'Crayon Fatih 36 Warna',              brand:'Fatih',         price:75000, oldPrice:90000, rating:4.6, reviews:134, emoji:'🖍️', cat:'warna-seni',       badge:'sale', wishlist:false },
];

let cart = [];
let activeFilter = 'all';
let activeSort   = 'default';
let searchQuery  = '';
let toastTimer;

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
function formatRp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}
function scrollToProducts() {
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══════════════════════════════════════
   CATEGORIES
═══════════════════════════════════════ */
function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = categories.map(c => `
    <div class="cat-card ${activeFilter === c.id ? 'active' : ''}" onclick="setFilterFromCat('${c.id}')">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count} produk</div>
    </div>
  `).join('');
}

function setFilterFromCat(id) {
  activeFilter = id;
  renderCategories();
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick').includes(`'${id}'`));
  });
  renderProducts();
  scrollToProducts();
}

/* ═══════════════════════════════════════
   PRODUCTS
═══════════════════════════════════════ */
function setFilter(filter, btn) {
  activeFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCategories();
  renderProducts();
}

function sortProducts(val) {
  activeSort = val;
  renderProducts();
}

function filterProducts() {
  searchQuery = document.getElementById('searchInput').value.toLowerCase();
  // sync mobile search
  const ms = document.getElementById('mobileSearch');
  if (ms) ms.value = document.getElementById('searchInput').value;
  renderProducts();
}

function getFilteredSorted() {
  let list = [...products];
  if (activeFilter !== 'all') list = list.filter(p => p.cat === activeFilter);
  if (searchQuery) list = list.filter(p =>
    p.name.toLowerCase().includes(searchQuery) ||
    p.brand.toLowerCase().includes(searchQuery)
  );
  if (activeSort === 'price-asc')  list.sort((a, b) => a.price - b.price);
  if (activeSort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (activeSort === 'rating')     list.sort((a, b) => b.rating - a.rating);
  return list;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const list = getFilteredSorted();
  if (!list.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--muted)">😔 Produk tidak ditemukan</div>';
    return;
  }
  grid.innerHTML = list.map(p => {
    const badgeHtml = p.badge
      ? `<span class="product-badge badge-${p.badge}">${p.badge === 'sale' ? 'Diskon' : p.badge === 'new' ? 'Baru' : 'Terlaris'}</span>`
      : '';
    const oldPriceHtml = p.oldPrice ? `<span class="product-price-old">${formatRp(p.oldPrice)}</span>` : '';
    const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
    return `
      <div class="product-card" id="pc${p.id}">
        <div class="product-img">
          ${badgeHtml}
          <button class="wish-btn" onclick="toggleWish(${p.id})" id="wb${p.id}">${p.wishlist ? '❤️' : '🤍'}</button>
          ${p.emoji}
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-brand">${p.brand}</div>
          <div class="product-rating">
            <span class="stars">${stars}</span>
            <span class="rating-count">${p.rating} (${p.reviews})</span>
          </div>
          <div class="product-price-row">
            <div>
              <span class="product-price">${formatRp(p.price)}</span>
              ${oldPriceHtml}
            </div>
            <button class="add-cart-btn" onclick="addToCart(${p.id})">+ Keranjang</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

/* ═══════════════════════════════════════
   WISHLIST
═══════════════════════════════════════ */
function toggleWish(id) {
  const p = products.find(x => x.id === id);
  p.wishlist = !p.wishlist;
  const wb = document.getElementById('wb' + id);
  if (wb) wb.textContent = p.wishlist ? '❤️' : '🤍';
  showToast(p.wishlist ? `❤️ ${p.name} ditambahkan ke wishlist!` : `💔 Dihapus dari wishlist`);
}

/* ═══════════════════════════════════════
   CART
═══════════════════════════════════════ */
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCartUI();
  showToast(`🛒 ${p.name} ditambahkan!`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = total;

  const el = document.getElementById('cartItems');
  if (!cart.length) {
    el.innerHTML = `<div class="empty-cart"><span>🛒</span>Keranjang kamu masih kosong.<br><small style="margin-top:6px;display:block">Yuk mulai belanja!</small></div>`;
    document.getElementById('cartFooter').style.display = 'none';
    return;
  }
  document.getElementById('cartFooter').style.display = 'block';
  el.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="ci-img">${i.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${i.name}</div>
        <div class="ci-price">${formatRp(i.price)}</div>
      </div>
      <div class="ci-qty">
        <button class="qty-btn" onclick="changeQty(${i.id}, -1)">−</button>
        <span class="qty-num">${i.qty}</span>
        <button class="qty-btn" onclick="changeQty(${i.id}, 1)">+</button>
      </div>
      <button class="del-btn" onclick="removeFromCart(${i.id})">🗑</button>
    </div>`).join('');
  document.getElementById('totalVal').textContent = formatRp(cart.reduce((s, i) => s + i.price * i.qty, 0));
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  updateCartUI();
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

/* ═══════════════════════════════════════
   MODAL SYSTEM
═══════════════════════════════════════ */
function openModal(id) {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById(id).classList.add('open');
}

function closeAllModals() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.querySelectorAll('.modal-box').forEach(m => m.classList.remove('open'));
}

/* ═══════════════════════════════════════
   ABOUT MODAL
═══════════════════════════════════════ */
function openAbout() {
  openModal('aboutModal');
}

/* ═══════════════════════════════════════
   PROMO MODAL
═══════════════════════════════════════ */
function openPromo() {
  const saleProducts = products.filter(p => p.badge === 'sale' && p.oldPrice);
  document.getElementById('promoList').innerHTML = saleProducts.map(p => {
    const disc = Math.round((1 - p.price / p.oldPrice) * 100);
    return `
      <div class="promo-item" onclick="goToProduct(${p.id})">
        <div class="promo-item-emoji">${p.emoji}</div>
        <div class="promo-item-info">
          <div class="promo-item-name">${p.name}</div>
          <div class="promo-item-brand">${p.brand}</div>
        </div>
        <div class="promo-item-prices">
          <div class="promo-item-badge">-${disc}%</div>
          <div class="promo-item-price">${formatRp(p.price)}</div>
          <div class="promo-item-old">${formatRp(p.oldPrice)}</div>
        </div>
      </div>`;
  }).join('');
  openModal('promoModal');
}

function goToProduct(id) {
  closeAllModals();
  activeFilter = 'all';
  renderCategories();
  document.querySelectorAll('.filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  renderProducts();
  setTimeout(() => {
    scrollToProducts();
    setTimeout(() => {
      const card = document.getElementById('pc' + id);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.transition = 'box-shadow 0.3s, border-color 0.3s';
        card.style.boxShadow = '0 0 0 3px #8FB3E2';
        card.style.borderColor = '#31487A';
        setTimeout(() => { card.style.boxShadow = ''; card.style.borderColor = ''; }, 2200);
      }
    }, 400);
  }, 100);
}

function goToAllPromo() {
  closeAllModals();
  activeFilter = 'all';
  activeSort   = 'default';
  searchQuery  = '';
  document.getElementById('searchInput').value = '';
  renderCategories();
  document.querySelectorAll('.filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  const saleList = products.filter(p => p.badge === 'sale');
  const grid = document.getElementById('productGrid');
  grid.innerHTML = saleList.map(p => {
    const oldPriceHtml = p.oldPrice ? `<span class="product-price-old">${formatRp(p.oldPrice)}</span>` : '';
    const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
    return `
      <div class="product-card" id="pc${p.id}">
        <div class="product-img">
          <span class="product-badge badge-sale">Diskon</span>
          <button class="wish-btn" onclick="toggleWish(${p.id})" id="wb${p.id}">${p.wishlist ? '❤️' : '🤍'}</button>
          ${p.emoji}
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-brand">${p.brand}</div>
          <div class="product-rating"><span class="stars">${stars}</span><span class="rating-count">${p.rating} (${p.reviews})</span></div>
          <div class="product-price-row">
            <div><span class="product-price">${formatRp(p.price)}</span>${oldPriceHtml}</div>
            <button class="add-cart-btn" onclick="addToCart(${p.id})">+ Keranjang</button>
          </div>
        </div>
      </div>`;
  }).join('');
  document.querySelector('.section-title').innerHTML = 'Produk <span>Promo</span>';
  scrollToProducts();
}

/* ═══════════════════════════════════════
   CHECKOUT FORM
═══════════════════════════════════════ */
function openCheckoutForm() {
  if (!cart.length) return;
  const totalRp = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('coSummary').innerHTML = `
    ${cart.map(i => `
      <div class="co-order-row item-row">
        <span class="co-item-name">${i.emoji} ${i.name}</span>
        <span class="co-item-qty">x${i.qty}</span>
        <span>${formatRp(i.price * i.qty)}</span>
      </div>`).join('')}
    <div class="co-order-total">
      <span>Total Pembayaran</span>
      <span>${formatRp(totalRp)}</span>
    </div>`;

  // Reset form
  ['f-nama','f-alamat','f-patokan','f-telp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.querySelectorAll('input[name="jasa"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="admin"]').forEach(r => r.checked = false);
  document.querySelectorAll('.co-radio').forEach(l => l.classList.remove('selected'));
  document.querySelectorAll('.co-admin-card').forEach(l => l.classList.remove('selected'));
  clearErrors();

  // Highlight selected radio on click
  document.querySelectorAll('.co-radio input').forEach(r => {
    r.onchange = () => {
      document.querySelectorAll('.co-radio').forEach(l => l.classList.remove('selected'));
      r.closest('.co-radio').classList.add('selected');
    };
  });

  document.getElementById('checkoutOverlay').classList.add('open');
  document.getElementById('checkoutModal').classList.add('open');
}

function closeCheckoutForm() {
  document.getElementById('checkoutOverlay').classList.remove('open');
  document.getElementById('checkoutModal').classList.remove('open');
}

function selectAdmin(radio) {
  document.querySelectorAll('.co-admin-card').forEach(c => c.classList.remove('selected'));
  radio.closest('.co-admin-card').classList.add('selected');
}

function clearErrors() {
  ['err-nama','err-alamat','err-jasa','err-admin'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  ['f-nama','f-alamat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('error');
  });
}

function submitOrder() {
  clearErrors();
  let valid = true;
  const nama    = document.getElementById('f-nama').value.trim();
  const alamat  = document.getElementById('f-alamat').value.trim();
  const patokan = document.getElementById('f-patokan').value.trim();
  const telp    = document.getElementById('f-telp').value.trim();
  const jasa    = document.querySelector('input[name="jasa"]:checked');
  const admin   = document.querySelector('input[name="admin"]:checked');

  if (!nama)  { document.getElementById('err-nama').textContent = '⚠️ Nama pembeli wajib diisi.'; document.getElementById('f-nama').classList.add('error'); valid = false; }
  if (!alamat){ document.getElementById('err-alamat').textContent = '⚠️ Alamat lengkap wajib diisi.'; document.getElementById('f-alamat').classList.add('error'); valid = false; }
  if (!jasa)  { document.getElementById('err-jasa').textContent = '⚠️ Pilih salah satu jasa pengiriman.'; valid = false; }
  if (!admin) { document.getElementById('err-admin').textContent = '⚠️ Pilih admin yang akan dihubungi.'; valid = false; }
  if (!valid) return;

  const totalRp = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemLines = cart.map(i => `  • ${i.emoji} ${i.name} (${i.brand}) x${i.qty} = ${formatRp(i.price * i.qty)}`).join('\n');

  let msg = `Halo Admin Ruz Stationary! 👋\n\n`;
  msg += `Saya ingin memesan produk berikut:\n\n`;
  msg += `━━━━━━━━━━━━━━━━━━\n🛒 *DETAIL PESANAN*\n━━━━━━━━━━━━━━━━━━\n`;
  msg += `${itemLines}\n\n💰 *Total: ${formatRp(totalRp)}*\n\n`;
  msg += `━━━━━━━━━━━━━━━━━━\n📦 *DATA PENGIRIMAN*\n━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 Nama       : ${nama}\n`;
  msg += `🏠 Alamat     : ${alamat}\n`;
  if (patokan) msg += `📍 Patokan    : ${patokan}\n`;
  if (telp)    msg += `📱 No. Telp   : ${telp}\n`;
  msg += `🚚 Jasa Kirim : ${jasa.value}\n\n`;
  msg += `Mohon segera diproses dan saya menunggu konfirmasi pembayaran. Terima kasih! 🙏`;

  window.open(`https://wa.me/${admin.value}?text=${encodeURIComponent(msg)}`, '_blank');
  closeCheckoutForm();
  cart = [];
  updateCartUI();
  closeCart();
  showToast('✅ Pesanan diteruskan ke WhatsApp!');
}

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const btn    = document.getElementById('hamburger');
  drawer.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
}

function openMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const btn    = document.getElementById('hamburger');
  drawer.classList.add('open');
  btn.classList.add('open');
  // sync search value
  const ms = document.getElementById('mobileSearch');
  if (ms) ms.value = document.getElementById('searchInput').value;
}

function closeMobileMenu() {
  document.getElementById('mobileNavDrawer').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// Close when tapping outside
document.addEventListener('click', function(e) {
  const drawer = document.getElementById('mobileNavDrawer');
  const burger = document.getElementById('hamburger');
  if (drawer && burger && drawer.classList.contains('open')) {
    if (!drawer.contains(e.target) && !burger.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// Mobile search syncs to main search
document.addEventListener('DOMContentLoaded', function() {
  const ms = document.getElementById('mobileSearch');
  if (ms) {
    ms.addEventListener('input', function() {
      document.getElementById('searchInput').value = this.value;
      searchQuery = this.value.toLowerCase();
      renderProducts();
    });
  }
});

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
renderCategories();
renderProducts();
