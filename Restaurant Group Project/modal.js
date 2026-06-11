(function () {
  'use strict';

  /*  MENU DATA (shared with main app, defined here for modal use) */
  const MENU_ITEMS = [
    {
      id: 1,
      name: 'Jollof Rice',
      price: 4500,
      priceFormatted: '₦4,500',
      desc: 'Smoky party jollof rice, slow-cooked in tomato-pepper base with fragrant bay leaves and scotch bonnet. Served with grilled chicken and fried plantain.',
      cat: 'main',
      cls: 'img-jollof',
      tags: ['Popular', 'Gluten-Free', 'Serves 1'],
      cal: '620 kcal'
    },
    {
      id: 2,
      name: 'Egusi Soup',
      price: 4000,
      priceFormatted: '₦4,000',
      desc: 'Rich and hearty melon seed soup cooked with assorted meats, dried fish, crayfish, and leafy greens. Best enjoyed with pounded yam or eba.',
      cat: 'soup',
      cls: 'img-egusi',
      tags: ['Chef\'s Choice', 'Traditional', 'High Protein'],
      cal: '780 kcal'
    },
    {
      id: 3,
      name: 'Fried Rice',
      price: 4500,
      priceFormatted: '₦4,500',
      desc: 'Colorful Nigerian-style fried rice tossed with mixed vegetables, chicken liver, prawns, and seasoned to perfection.',
      cat: 'main',
      cls: 'img-fried',
      tags: ['Family Favourite', 'Spicy'],
      cal: '590 kcal'
    },
    {
      id: 4,
      name: 'Suya',
      price: 2500,
      priceFormatted: '₦2,500',
      desc: 'Northern Nigeria\'s finest — thinly sliced beef skewers marinated in a blend of ground peanuts, ginger, paprika, and secret spices. Served with sliced onions and tomatoes.',
      cat: 'main',
      cls: 'img-suya',
      tags: ['Street Classic', 'Smoky', 'High Protein'],
      cal: '420 kcal'
    },
    {
      id: 5,
      name: 'Pepper Soup',
      price: 3500,
      priceFormatted: '₦3,500',
      desc: 'A bold, clear broth infused with traditional Nigerian spices — utazi, ehuru, and uziza. Made with tender goat meat, this warming soup is a beloved Nigerian staple.',
      cat: 'soup',
      cls: 'img-pepper',
      tags: ['Spicy', 'Light', 'Traditional'],
      cal: '310 kcal'
    },
    {
      id: 6,
      name: 'Zobo Drink',
      price: 1000,
      priceFormatted: '₦1,000',
      desc: 'A refreshing chilled hibiscus flower drink, naturally tart and slightly sweet, infused with ginger, cloves, and pineapple. Served ice cold.',
      cat: 'drink',
      cls: 'img-zobo',
      tags: ['Cold', 'Non-Alcoholic', 'Natural'],
      cal: '85 kcal'
    },
    {
      id: 7,
      name: 'Pounded Yam',
      price: 1200,
      priceFormatted: '₦1,200',
      desc: 'Smooth, stretchy pounded yam made from freshly boiled yam tubers. The perfect accompaniment to any Nigerian soup.',
      cat: 'side',
      cls: 'img-egusi',
      tags: ['Side Dish', 'Gluten-Free'],
      cal: '340 kcal'
    },
    {
      id: 8,
      name: 'Moi Moi',
      price: 800,
      priceFormatted: '₦800',
      desc: 'Steamed black-eyed bean pudding blended with peppers, onions, and seasoning. Filled with boiled eggs and deboned fish.',
      cat: 'side',
      cls: 'img-fried',
      tags: ['Vegetarian Option', 'Side Dish'],
      cal: '290 kcal'
    },
    {
      id: 9,
      name: 'Ofada Rice',
      price: 3800,
      priceFormatted: '₦3,800',
      desc: 'Unpolished local Nigerian rice served with an aromatic locust-bean designer sauce, loaded with assorted meats and ponmo.',
      cat: 'main',
      cls: 'img-jollof',
      tags: ['Local Special', 'Aromatic'],
      cal: '680 kcal'
    }
  ];

  /* DOM HELPERS */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  /* MODAL CORE: create, open, close */
  let currentOverlay = null;

  function createOverlay() {
    const overlay = el('div', 'modal-overlay');
    const box = el('div', 'modal-box');
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Close on backdrop click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal(overlay);
    });

    return { overlay, box };
  }

  function openModal(overlay) {
    currentOverlay = overlay;
    // small delay so CSS transition plays
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('open'));
    });
    document.body.style.overflow = 'hidden';
  }

  function closeModal(overlay) {
    overlay = overlay || currentOverlay;
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    overlay.addEventListener('transitionend', function handler() {
      overlay.removeEventListener('transitionend', handler);
      overlay.remove();
      if (currentOverlay === overlay) currentOverlay = null;
    });
  }

  // Global Escape key listener
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && currentOverlay) closeModal(currentOverlay);
  });

  /* DISH DETAIL MODAL */
  function openDishModal(item) {
    const { overlay, box } = createOverlay();
    let qty = 1;

    function render() {
      const total = (item.price * qty).toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 });
      box.innerHTML = `
        <button class="modal-close" id="modalCloseBtn" aria-label="Close">&times;</button>

        <!-- Header -->
        <div class="modal-header">
          <h3>${item.name}</h3>
          <p>${item.cal} &nbsp;·&nbsp; ${item.cat.charAt(0).toUpperCase() + item.cat.slice(1)}</p>
          <div class="modal-gold-line"></div>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="modal-dish-img-bg ${item.cls}"></div>

          <div class="modal-dish-meta">
            <span class="modal-dish-name">${item.name}</span>
            <span class="modal-dish-price">${item.priceFormatted}</span>
          </div>

          <p class="modal-dish-desc">${item.desc}</p>

          <div class="modal-dish-tags">
            ${item.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
          </div>

          <div class="modal-qty-row">
            <label>Qty</label>
            <div class="qty-control">
              <button class="qty-btn" id="qtyMinus">−</button>
              <span class="qty-val" id="qtyVal">${qty}</span>
              <button class="qty-btn" id="qtyPlus">+</button>
            </div>
          </div>

          <p class="modal-total">Total: <span id="modalTotal">${total}</span></p>

          <button class="btn-add-order" id="btnAddOrder">
            <i class="fa-solid fa-bag-shopping"></i>&nbsp; Add to Order
          </button>
        </div>
      `;

      // Events
      box.querySelector('#modalCloseBtn').addEventListener('click', () => closeModal(overlay));

      box.querySelector('#qtyMinus').addEventListener('click', () => {
        if (qty > 1) { qty--; render(); }
      });
      box.querySelector('#qtyPlus').addEventListener('click', () => {
        qty++;
        render();
      });

      box.querySelector('#btnAddOrder').addEventListener('click', () => {
        closeModal(overlay);
        setTimeout(() => openConfirmModal(item, qty), 180);
      });
    }

    render();
    openModal(overlay);
  }

  /* ORDER CONFIRMATION MODAL */
  function openConfirmModal(item, qty) {
    const { overlay, box } = createOverlay();
    const total = (item.price * qty).toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 });

    box.innerHTML = `
      <div class="modal-body" style="padding-top:44px;">
        <div class="modal-confirm-icon">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h3 class="modal-confirm-title">Added to Your Order!</h3>
        <p class="modal-confirm-text">
          <strong>${qty} × ${item.name}</strong> has been added.<br>
          Order total: <strong>${total}</strong><br><br>
          A member of our team will confirm your order shortly.
        </p>
        <button class="btn-modal-close-confirm" id="btnConfirmClose">Continue Browsing</button>
      </div>
    `;

    box.querySelector('#btnConfirmClose').addEventListener('click', () => closeModal(overlay));
    openModal(overlay);
  }

  /* QUICK BOOK-A-TABLE MODAL (triggered from hero button) */
  function openBookTableModal() {
    const { overlay, box } = createOverlay();

    box.innerHTML = `
      <button class="modal-close" id="bookModalClose" aria-label="Close">&times;</button>

      <div class="modal-header">
        <h3>Book a Table</h3>
        <p>Reserve your spot at Naija Kitchen</p>
        <div class="modal-gold-line"></div>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" id="bm-name" placeholder="Enter your name" />
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" id="bm-phone" placeholder="Enter your phone number" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Date</label>
            <input type="date" id="bm-date" />
          </div>
          <div class="form-group">
            <label>Time</label>
            <select id="bm-time">
              <option value="">Select time</option>
              <option>12:00 PM</option>
              <option>1:00 PM</option>
              <option>2:00 PM</option>
              <option>6:00 PM</option>
              <option>7:00 PM</option>
              <option>8:00 PM</option>
              <option>9:00 PM</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Number of Guests</label>
          <select id="bm-guests">
            <option value="">Select number of guests</option>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5 Guests</option>
            <option>6+ Guests</option>
          </select>
        </div>
        <button class="btn-book-now" id="bm-submit" style="margin-top:4px;">Book Now</button>
        <div class="success-msg" id="bm-success" style="display:none;">
          <i class="fa-solid fa-circle-check"></i>
          Reservation received! We'll confirm your table shortly.
        </div>
      </div>
    `;

    box.querySelector('#bookModalClose').addEventListener('click', () => closeModal(overlay));

    box.querySelector('#bm-submit').addEventListener('click', function () {
      const name   = box.querySelector('#bm-name').value.trim();
      const phone  = box.querySelector('#bm-phone').value.trim();
      const date   = box.querySelector('#bm-date').value;
      const time   = box.querySelector('#bm-time').value;
      const guests = box.querySelector('#bm-guests').value;

      if (!name || !phone || !date || !time || !guests) {
        // Shake the submit button on invalid
        this.style.animation = 'none';
        this.style.background = '#c0392b';
        this.textContent = 'Please fill in all fields';
        setTimeout(() => {
          this.style.background = '';
          this.textContent = 'Book Now';
        }, 2000);
        return;
      }

      this.style.display = 'none';
      box.querySelector('#bm-success').style.display = 'block';
      setTimeout(() => closeModal(overlay), 3500);
    });

    openModal(overlay);
  }

  /* WIRE UP: Menu cards → dish modal */

  // Override the renderMenu function to attach modal click handlers
  window._originalRenderMenu = window.renderMenu || null;

  window.renderMenu = function (filter) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    const filtered = filter === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.cat === filter);

    grid.innerHTML = filtered.map(item => `
      <div class="menu-item-card" data-item-id="${item.id}" style="cursor:pointer;">
        <div class="menu-img-bg ${item.cls}"></div>
        <div class="menu-item-body">
          <div class="menu-item-top">
            <span class="menu-item-name">${item.name}</span>
            <span class="menu-item-price">${item.priceFormatted}</span>
          </div>
          <p class="menu-item-desc">${item.desc.substring(0, 70)}…</p>
        </div>
      </div>
    `).join('');

    // Attach click events
    grid.querySelectorAll('.menu-item-card').forEach(card => {
      card.addEventListener('click', function () {
        const id = parseInt(this.dataset.itemId);
        const item = MENU_ITEMS.find(m => m.id === id);
        if (item) openDishModal(item);
      });
    });
  };

  // Also wire up home page signature dish cards
  function wireSignatureDishCards() {
    document.querySelectorAll('.dish-card').forEach(function (card) {
      const nameEl = card.querySelector('h4');
      if (!nameEl) return;
      const dishName = nameEl.textContent.trim();
      const item = MENU_ITEMS.find(m => m.name === dishName);
      if (!item) return;
      card.addEventListener('click', function () {
        openDishModal(item);
      });
      card.style.cursor = 'pointer';
    });
  }

  /* WIRE UP: Hero "Book a Table" button → modal */
  function wireBookButton() {
    const heroBtn = document.querySelector('.hero-book-btn');
    if (heroBtn) {
      // Remove the old onclick that navigated to reservation page
      heroBtn.removeAttribute('onclick');
      heroBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openBookTableModal();
      });
    }
  }

  /* INIT: run after DOM is ready */
  function init() {
    // Re-render the menu grid with modal-enabled cards
    if (typeof window.renderMenu === 'function') {
      window.renderMenu('all');
    }

    // Wire home dish cards
    wireSignatureDishCards();

    // Wire hero book button
    wireBookButton();

    // Expose modal API globally (optional)
    window.NaijaModal = {
      openDish:      openDishModal,
      openBookTable: openBookTableModal,
      closeAll:      function () { closeModal(currentOverlay); }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already ready (script loaded after parse)
    setTimeout(init, 0);
  }

})();
