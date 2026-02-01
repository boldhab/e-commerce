let cart = JSON.parse(localStorage.getItem("cart")) || []

// Theme Management
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
};
initTheme();

// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium sound experience with active noise cancellation.",
    price: 199,
    category: "electronics",
    image: "./assets/electronics/headphone.png"
  },
  {
    id: 2,
    name: "Macbook Pc",
    description: "High-performance laptop for professionals and creatives.",
    price: 1299,
    category: "electronics",
    image: "./assets/electronics/macbook.png"
  },
  {
    id: 3,
    name: "Speakers",
    description: "Deep bass and crystal clear audio for your home studio.",
    price: 89,
    category: "electronics",
    image: "./assets/electronics/speaker.png"
  },
  {
    id: 4,
    name: "Watch",
    description: "Elegant smartwatch with fitness tracking and notifications.",
    price: 249,
    category: "electronics",
    image: "./assets/electronics/watch.png"
  },
  {
    id: 5,
    name: "Vr",
    description: "Immersive virtual reality headset for next-gen gaming.",
    price: 399,
    category: "electronics",
    image: "./assets/electronics/vr.png"
  },
  {
    id: 6,
    name: "Cotton Jacket",
    description: "Lightweight and stylish jacket perfect for autumn.",
    price: 75,
    category: "fashion",
    image: "./assets/fashion/product-2.png"
  },
  {
    id: 7,
    name: "T-shirt",
    description: "Soft organic cotton t-shirt in classic white.",
    price: 25,
    category: "fashion",
    image: "./assets/fashion/product-3.png"
  },
  {
    id: 8,
    name: "Women Jacket",
    description: "Tailored fit windbreaker for adventurous women.",
    price: 85,
    category: "fashion",
    image: "./assets/fashion/product-4.png"
  },
  {
    id: 9,
    name: "Jacket",
    description: "Durable denim jacket with a modern vintage wash.",
    price: 95,
    category: "fashion",
    image: "./assets/fashion/product-5.png"
  },
  {
    id: 10,
    name: "Sport Coat",
    description: "Breathable athletic coat for outdoor running.",
    price: 65,
    category: "fashion",
    image: "./assets/fashion/product-6.png"
  },
  {
    id: 11,
    name: "Cotton Sweater",
    description: "Cozy knit sweater for those chilly evenings.",
    price: 45,
    category: "fashion",
    image: "./assets/fashion/slide-2.png"
  },
  {
    id: 12,
    name: "Premium Sofa",
    description: "Luxury velvet sofa with ergonomic support.",
    price: 899,
    category: "home",
    image: "./assets/home/home1.jpg"
  },
  {
    id: 13,
    name: "Designer Light",
    description: "Modern pendant light for a minimalist aesthetic.",
    price: 120,
    category: "home",
    image: "./assets/home/home2.jpg"
  },
  {
    id: 14,
    name: "Book Shelf",
    description: "Sturdy wooden bookshelf with adjustable levels.",
    price: 150,
    category: "home",
    image: "./assets/home/home3.jpg"
  },
  {
    id: 15,
    name: "Ergonomic Chair",
    description: "Comfortable office chair with lumbar support.",
    price: 210,
    category: "home",
    image: "./assets/home/home4.jpg"
  },
  {
    id: 16,
    name: "King Bed",
    description: "Spacious bed frame with a modern headboard.",
    price: 750,
    category: "home",
    image: "./assets/home/home5.jpg"
  },
  {
    id: 17,
    name: "Running Shoes",
    description: "High-performance shoes with ultra-grip soles.",
    price: 110,
    category: "sports",
    image: "./assets/sports/shoe1.jpg"
  },
  {
    id: 18,
    name: "Pro Sneakers",
    description: "Professional grade sneakers for athletic training.",
    price: 135,
    category: "sports",
    image: "./assets/sports/shoe1-1.jpg"
  }
];



// Helper for Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="toast-msg">${message}</span>
        </div>
    `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// State management
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'default';

// Initialize products display with filtering and sorting
function renderProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = '';

  let filtered = products.filter(p => {
    const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (currentSort === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="no-products">No products found matching your criteria.</div>`;
    return;
  }

  filtered.forEach(product => {
    const productcard = document.createElement("div");
    productcard.className = "product-card";
    productcard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h2 class="product-name">${product.name}</h2>
                <p class="product-description">${product.description}</p>
            </div>
            <div class="product-footer">
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" onclick="addtocart(${product.id})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    Add
                </button>
            </div>
        `;
    container.appendChild(productcard);
  });
}

// Initial Call
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updatecartdisplay();
  setupEventListeners();
});



function savetolocalstorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addtocart(productid) {
  const product = products.find(p => p.id === productid);
  const existingitem = cart.find(item => item.id === productid);

  if (existingitem) {
    existingitem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updatecartdisplay();
  savetolocalstorage();

  // Show specialized success popup
  const addPopup = document.getElementById('addSuccessPopup');
  const itemName = document.getElementById('addedItemName');
  if (itemName) itemName.textContent = product.name;
  if (addPopup) addPopup.style.display = 'flex';
}

function closeAddPopup() {
  document.getElementById('addSuccessPopup').style.display = 'none';
}

function viewCart() {
  closeAddPopup();
  document.getElementById("cart-sidebar").classList.add("active");
}


function updatecartdisplay() {
  const cartitems = document.getElementById("cart-items");
  const cartcount = document.getElementById("cart-count");
  const carttotal = document.getElementById("cart-total");

  cartitems.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const cartitem = document.createElement("div");
    cartitem.className = "cart-item";
    cartitem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removefromcart(${item.id})">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
        `;
    cartitems.appendChild(cartitem);
  });

  if (cart.length === 0) {
    cartitems.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
  }

  cartcount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  carttotal.textContent = total.toFixed(2);
}

function removefromcart(productid) {
  cart = cart.filter(item => item.id !== productid);
  updatecartdisplay();
  savetolocalstorage();
}

// DOM Elements
let paymentModal, closePaymentModal, checkoutBtn, successPopup;

function setupEventListeners() {
  // Menu IDs are checked to prevent null pointer errors
  const cartBtn = document.getElementById("cart-btn");
  const cartClose = document.getElementById("closes");
  const menuToggle = document.getElementById("open");
  const themeToggle = document.getElementById("theme-toggle");
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const catButtons = document.querySelectorAll('.cat-btn');

  // Payment Elements
  paymentModal = document.getElementById('paymentModal');
  closePaymentModal = document.getElementById('closePaymentModal');
  checkoutBtn = document.getElementById('checkoutBtn');
  successPopup = document.getElementById('successPopup');
  const paymentForm = document.getElementById('paymentForm');

  if (cartBtn) cartBtn.addEventListener("click", () => document.getElementById("cart-sidebar").classList.toggle("active"));
  if (cartClose) cartClose.addEventListener("click", () => document.getElementById("cart-sidebar").classList.remove("active"));

  if (menuToggle) {
    menuToggle.addEventListener("click", () => document.body.classList.toggle("show-mobile-menu"));
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode enabled`, 'info');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderProducts();
      // Close mobile menu if open
      document.body.classList.remove("show-mobile-menu");
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Modal behavior
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast("Your cart is empty!", "info");
        return;
      }
      document.getElementById("cart-sidebar").classList.remove("active");
      paymentModal.style.display = 'flex';
    });
  }

  if (closePaymentModal) {
    closePaymentModal.addEventListener('click', () => {
      paymentModal.style.display = 'none';
    });
  }

  // Close modals on outside click
  window.addEventListener('click', (e) => {
    if (e.target === paymentModal) paymentModal.style.display = 'none';
    if (e.target === document.getElementById('addSuccessPopup')) closeAddPopup();
  });

  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const sections = {
    credit: document.getElementById('credit-section'),
    crypto: document.getElementById('crypto-section'),
    paypal: document.getElementById('paypal-section')
  };

  paymentOptions.forEach(opt => {
    opt.addEventListener('change', () => {
      Object.values(sections).forEach(s => { if (s) s.style.display = 'none'; });
      const sel = opt.value;
      if (sections[sel]) sections[sel].style.display = 'block';
    });
  });

  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      paymentModal.style.display = 'none';
      successPopup.style.display = 'flex';

      // Comprehensive cleanup
      paymentForm.reset();
      Object.values(sections).forEach(s => { if (s) s.style.display = 'none'; });

      cart = [];
      savetolocalstorage();
      updatecartdisplay();
    });
  }
}

function closePopup() {
  if (successPopup) successPopup.style.display = 'none';
  if (paymentModal) paymentModal.style.display = 'none';
}
