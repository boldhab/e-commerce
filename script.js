let cart=JSON.parse(localStorage.getItem("cart"))||[]

products=[
   
    { 
       id:1,
       name:"Wireless Headphones",
       description:"this is good product to use ",
       price:199,
       catagory:"electronics",
       image:"./assets/electronics/headphone.png"

    },
     { 
       id:2,
       name:"Macbook Pc",
       description:"this is good product to use ",
       price:199,
       catagory:"electronics",
       image:"./assets/electronics/macbook.png"

    },
        { 
       id:3,
       name:"Speakers",
       description:"this is good product to use ",
       price:199,
       catagory:"electronics",
       image:"./assets/electronics/speaker.png"

    },
        { 
       id:4,
       name:"Watch",
       description:"this is good product to use ",
       price:199,
       catagory:"electronics",
       image:"./assets/electronics/watch.png"

    },
        { 
       id:5,
       name:"Vr",
       description:"this is good product to use ",
       price:199,
       catagory:"electronics",
       image:"./assets/electronics/vr.png"

    },
     //fasions
     { 
       id:6,
       name:"Cotten jacket",
       description:"this is good product to use ",
       price:199,
       catagory:"fashions",
       image:"./assets/fashion/product-2.png"

    },
    { 
       id:7,
       name:"T-shirt",
       description:"this is good product to use ",
       price:199,
       catagory:"fashions",
       image:"./assets/fashion/product-3.png"

    },

    { 
       id:8,
       name:"women jacket",
       description:"this is good product to use ",
       price:199,
       catagory:"fashions",
       image:"./assets/fashion/product-4.png"

    },

    { 
       id:9,
       name:"Jacket",
       description:"this is good product to use ",
       price:199,
       catagory:"fashions",
       image:"./assets/fashion/product-5.png"

    },

    { 
       id:10,
       name:"Adidas sport coat",
       description:"this is good product to use ",
       price:199,
       catagory:"fashions",
       image:"./assets/fashion/product-6.png"

    },

    { 
       id:11,
       name:"cotten sweeter",
       description:"this is good product to use ",
       price:199,
       catagory:"fashions",
       image:"./assets/fashion/slide-2.png"

    },
//home
{ 
       id:11,
       name:"Sofa",
       description:"this is good product to use ",
       price:199,
       catagory:"home",
       image:"./assets/home/home1.jpg"

    },
    { 
       id:12,
       name:"Home light",
       description:"this is good product to use ",
       price:199,
       catagory:"home",
       image:"./assets/home/home2.jpg"

    },
    { 
       id:13,
       name:"Book shelf",
       description:"this is good product to use ",
       price:199,
       catagory:"home",
       image:"./assets/home/home3.jpg"

    },
    { 
       id:14,
       name:"Chair",
       description:"this is good product to use ",
       price:199,
       catagory:"home",
       image:"./assets/home/home4.jpg"

    },
    { 
       id:15,
       name:"Bed",
       description:"this is good product to use ",
       price:199,
       catagory:"home",
       image:"./assets/home/home5.jpg"

    },

    // sports
    { 
       id:16,
       name:"shoes",
       description:"this is good product to use ",
       price:199,
       catagory:"sports",
       image:"./assets/sports/shoe1.jpg"

    },
     { 
       id:17,
       name:"Vr",
       description:"this is good product to use ",
       price:199,
       catagory:"sports",
       image:"./assets/sports/shoe1-1.jpg"

    },



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
        const matchesCategory = currentCategory === 'all' || p.catagory === currentCategory;
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
                <span class="product-category">${product.catagory}</span>
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

function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    // Categories
    const catButtons = document.querySelectorAll('.cat-btn');
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Sorting
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });
}

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
    showToast(`${product.name} added to cart!`);
}


function updatecartdisplay(){
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
      <div style="display:flex; align-items:center;">
        <img src="${item.image}" alt="${item.name}" class="cart-img">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} x ${item.quantity}</p>
        </div>
      </div>
      <button class="remove-item" onclick="removefromcart(${item.id})">X</button>
    `;
    cartitems.appendChild(cartitem);
  });

  cartcount.textContent = `(${cart.reduce((sum, item)=> sum + item.quantity, 0)})`;
  carttotal.textContent = total.toFixed(2);
}

function removefromcart(productid){
  cart = cart.filter(item => item.id !== productid);
  updatecartdisplay();
  savetolocalstorage();
}

const cartopen = document.getElementById("cart-btn");
const cartclose = document.getElementById("closes");
cartopen.addEventListener("click", ()=>{
  document.getElementById("cart-sidebar").classList.toggle("active");
});
cartclose.addEventListener("click", ()=>{
  document.getElementById("cart-sidebar").classList.toggle("active");
});

// responsive
const menuopenbutton = document.getElementById("open");
const menuclosebutton = document.getElementById("close");

menuopenbutton.addEventListener("click", ()=>{
  document.body.classList.toggle("show-mobile-menu");
});
menuclosebutton.addEventListener("click", ()=>{
  document.body.classList.toggle("show-mobile-menu");
});


//payment
 const paymentModal = document.getElementById('paymentModal');
  const closePaymentModal = document.getElementById('closePaymentModal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const successPopup = document.getElementById('successPopup');


  checkoutBtn.addEventListener('click', () => {
    paymentModal.style.display = 'flex';
  });


  closePaymentModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
  });

  
 
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const sections = {
    credit: document.getElementById('credit-section'),
    crypto: document.getElementById('crypto-section'),
    paypal: document.getElementById('paypal-section')
  };

  paymentOptions.forEach(opt => {
    opt.addEventListener('change', () => {
      Object.values(sections).forEach(s => s.style.display = 'none');
      const sel = opt.value;
      if (sections[sel]) sections[sel].style.display = 'block';
    });
  });

  document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    paymentModal.style.display = 'none';
    successPopup.style.display = 'flex';
    document.getElementById('paymentForm').reset();
    Object.values(sections).forEach(s => s.style.display = 'none');
  });

  function closePopup() {
    successPopup.style.display = 'none';
  }

  document.getElementById('paymentForm').addEventListener('submit', (e) => {
  e.preventDefault();

  paymentModal.style.display = 'none';
  successPopup.style.display = 'flex';

  document.getElementById('paymentForm').reset();
  Object.values(sections).forEach(s => s.style.display = 'none');


  document.getElementById('cart-items').innerHTML = '';
  document.getElementById('cart-count').textContent = '(0)';
  document.getElementById('cart-total').textContent = '0.00';


  if (typeof cart !== 'undefined') {
    cart.length = 0;
  }

  
  localStorage.removeItem('cart'); 
});
