// Sample product data
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1678911820864-e5c67e784c08?w=400"
    },
    {
        id: 2,
        name: "MacBook Air M2",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
        id: 3,
        name: "AirPods Pro",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400"
    },
    {
        id: 4,
        name: "Apple Watch Series 8",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
    },
    {
        id: 5,
        name: "iPad Pro 12.9",
        price: 1099.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"
    },
    {
        id: 6,
        name: "Samsung Galaxy S23",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
    }
];

// Slider functionality
let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function showSlide(index) {
    if (index >= totalSlides) currentSlide = 0;
    if (index < 0) currentSlide = totalSlides - 1;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.querySelector('.next-btn').addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

// Auto slide
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

// Login modal functionality
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.login-btn');
const closeBtn = document.querySelector('.close');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    
    // Here you would typically send these credentials to a server
    console.log('Login attempt:', { email, password });
    alert('Login functionality would be implemented here');
    loginModal.style.display = 'none';
});

// Generate product cards
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
        <button class="buy-btn" onclick="buyProduct(${product.id})">Buy Now</button>
    `;
    return card;
}

function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });
}

// Buy functionality
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Get existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Redirect to cart page
        window.location.href = 'cart.html';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    showSlide(0);
});
