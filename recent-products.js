// Maximum number of recent products to show
const MAX_RECENT_PRODUCTS = 4;

// Initialize recent products from localStorage or empty array
let recentProducts = JSON.parse(localStorage.getItem('recentProducts') || '[]');

function addToRecentProducts(product) {
    // Remove the product if it already exists to avoid duplicates
    recentProducts = recentProducts.filter(p => p.id !== product.id);
    
    // Add the new product to the beginning of the array
    recentProducts.unshift(product);
    
    // Keep only the most recent products
    if (recentProducts.length > MAX_RECENT_PRODUCTS) {
        recentProducts = recentProducts.slice(0, MAX_RECENT_PRODUCTS);
    }
    
    // Save to localStorage
    localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
    
    // Update the display
    displayRecentProducts();
}

function displayRecentProducts() {
    const container = document.querySelector('.recent-products-container');
    if (!container || recentProducts.length === 0) {
        document.querySelector('.recent-products').style.display = 'none';
        return;
    }

    document.querySelector('.recent-products').style.display = 'block';
    
    container.innerHTML = recentProducts.map(product => `
        <div class="recent-product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <div class="rating">${product.rating}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Add click event listeners to product cards to track viewed products
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const product = {
            id: card.dataset.productId,
            name: card.querySelector('h3').textContent,
            price: card.querySelector('.price').textContent.replace('₹', ''),
            image: card.querySelector('img').src,
            rating: card.querySelector('.rating').textContent
        };
        addToRecentProducts(product);
    });
});

// Initial display of recent products
document.addEventListener('DOMContentLoaded', displayRecentProducts);
