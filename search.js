// Product Search and Filter System
class ProductSearch {
    constructor(products) {
        this.allProducts = products;
        this.filters = {
            category: 'all',
            priceRange: { min: 0, max: Infinity },
            rating: 0,
            sortBy: 'featured'
        };
        this.setupSearchListeners();
    }

    setupSearchListeners() {
        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.applyFilters();
        });

        // Price range filter
        document.getElementById('priceRange').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            document.getElementById('priceValue').textContent = `₹${value}`;
            this.filters.priceRange.max = value;
            this.applyFilters();
        });

        // Rating filter
        document.querySelectorAll('.rating-filter').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filters.rating = parseInt(e.target.value);
                this.applyFilters();
            });
        });

        // Sort options
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.filters.sortBy = e.target.value;
            this.applyFilters();
        });
    }

    searchProducts(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            this.applyFilters();
            return;
        }

        const results = this.allProducts.filter(product => {
            return (
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        });

        this.displayProducts(results);
    }

    applyFilters() {
        let filteredProducts = [...this.allProducts];

        // Apply category filter
        if (this.filters.category !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.category === this.filters.category
            );
        }

        // Apply price filter
        filteredProducts = filteredProducts.filter(product =>
            product.price >= this.filters.priceRange.min &&
            product.price <= this.filters.priceRange.max
        );

        // Apply rating filter
        if (this.filters.rating > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.rating >= this.filters.rating
            );
        }

        // Apply sorting
        switch (this.filters.sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        this.displayProducts(filteredProducts);
    }

    displayProducts(products) {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = '';

        if (products.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No products found</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const isInWishlist = auth.currentUser?.wishlist.includes(product.id);
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${this.generateStarRating(product.rating)}
                    <span>(${product.reviews} reviews)</span>
                </div>
                <p class="price">₹${product.price.toFixed(2)}</p>
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                    onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="buy-btn" onclick="buyProduct(${product.id})">Buy Now</button>
            `;
            
            productGrid.appendChild(productCard);
        });
    }

    generateStarRating(rating) {
        const fullStar = '<i class="fas fa-star"></i>';
        const halfStar = '<i class="fas fa-star-half-alt"></i>';
        const emptyStar = '<i class="far fa-star"></i>';
        
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars += fullStar;
        }
        
        if (hasHalf) {
            stars += halfStar;
        }
        
        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars += emptyStar;
        }
        
        return stars;
    }
}

// Initialize search system
const productSearch = new ProductSearch(products);

// Wishlist toggle function
function toggleWishlist(productId) {
    if (!auth.currentUser) {
        auth.showAuthMessage('Please login to use wishlist', 'error');
        return;
    }

    const isInWishlist = auth.currentUser.wishlist.includes(productId);
    if (isInWishlist) {
        auth.removeFromWishlist(productId);
    } else {
        auth.addToWishlist(productId);
    }
    
    productSearch.applyFilters(); // Refresh display
}
