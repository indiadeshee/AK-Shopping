// User Authentication System
class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.setupAuthListeners();
    }

    setupAuthListeners() {
        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            this.login(email, password);
        });

        // Register form submission
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            this.register(name, email, password);
        });

        // Logout button
        document.querySelector('.logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Update UI based on auth state
        this.updateAuthUI();
    }

    register(name, email, password) {
        // Check if user already exists
        if (this.users.find(user => user.email === email)) {
            this.showAuthMessage('Email already registered', 'error');
            return;
        }

        // Create new user
        const user = {
            id: Date.now(),
            name,
            email,
            password: this.hashPassword(password), // In real app, use proper hashing
            wishlist: [],
            orders: []
        };

        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        // Auto login after registration
        this.login(email, password);
        this.showAuthMessage('Registration successful!', 'success');
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === this.hashPassword(password));
        
        if (user) {
            this.currentUser = { ...user, password: undefined }; // Don't store password in memory
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            this.showAuthMessage('Login successful!', 'success');
            document.querySelector('.login-modal').style.display = 'none';
        } else {
            this.showAuthMessage('Invalid email or password', 'error');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateAuthUI();
        window.location.href = 'index.html';
    }

    updateAuthUI() {
        const authButtons = document.querySelector('.auth-buttons');
        const userInfo = document.querySelector('.user-info');
        
        if (this.currentUser) {
            authButtons.style.display = 'none';
            userInfo.style.display = 'flex';
            userInfo.querySelector('.user-name').textContent = this.currentUser.name;
        } else {
            authButtons.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }

    showAuthMessage(message, type) {
        const messageElement = document.getElementById('authMessage');
        messageElement.textContent = message;
        messageElement.className = `auth-message ${type}`;
        messageElement.style.display = 'block';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    }

    hashPassword(password) {
        // In a real app, use proper password hashing
        return btoa(password);
    }

    // Wishlist management
    addToWishlist(productId) {
        if (!this.currentUser) {
            this.showAuthMessage('Please login to add to wishlist', 'error');
            return;
        }

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (!this.users[userIndex].wishlist.includes(productId)) {
            this.users[userIndex].wishlist.push(productId);
            this.currentUser.wishlist.push(productId);
            localStorage.setItem('users', JSON.stringify(this.users));
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showAuthMessage('Added to wishlist!', 'success');
        }
    }

    removeFromWishlist(productId) {
        if (!this.currentUser) return;

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        this.users[userIndex].wishlist = this.users[userIndex].wishlist.filter(id => id !== productId);
        this.currentUser.wishlist = this.currentUser.wishlist.filter(id => id !== productId);
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.showAuthMessage('Removed from wishlist', 'success');
    }

    // Order management
    addOrder(orderDetails) {
        if (!this.currentUser) return;

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        const order = {
            id: Date.now(),
            ...orderDetails,
            date: new Date().toISOString(),
            status: 'Processing'
        };

        this.users[userIndex].orders.push(order);
        this.currentUser.orders.push(order);
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
}

// Initialize authentication
const auth = new Auth();
