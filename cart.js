// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    
    // Update cart count
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    // Clear current cart display
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        updateCartSummary();
        return;
    }

    // Add each item to cart display
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">₹${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeItem(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    updateCartSummary();
}

function updateQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        updateCartDisplay();
    }
}

function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
}

function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 50 : 0; // ₹50 shipping
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    document.querySelector('.subtotal-amount').textContent = `₹${subtotal.toFixed(2)}`;
    document.querySelector('.shipping-amount').textContent = `₹${shipping.toFixed(2)}`;
    document.querySelector('.tax-amount').textContent = `₹${tax.toFixed(2)}`;
    document.querySelector('.total-amount').textContent = `₹${total.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Razorpay Integration
document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const phone = form.querySelector('#phone').value;

    // Calculate total amount in paise (Razorpay requires amount in smallest currency unit)
    const amount = parseFloat(document.querySelector('.total-amount').textContent.replace('₹', '')) * 100;

    const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay test key
        amount: amount,
        currency: 'INR',
        name: 'AK Shopping',
        description: 'Purchase from AK Shopping',
        image: 'https://img.icons8.com/color/48/000000/shop.png',
        handler: function(response) {
            // Payment successful
            handlePaymentSuccess(response);
        },
        prefill: {
            name: name,
            email: email,
            contact: phone
        },
        theme: {
            color: '#4CAF50'
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
});

function handlePaymentSuccess(response) {
    // Here you would typically verify the payment with your server
    console.log('Payment successful:', response);
    
    // Show success message
    alert('Payment successful! Thank you for your order.');
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartDisplay();
    
    // Redirect to success page
    window.location.href = 'payment-success.html';
}

// Coupon code functionality
document.querySelector('.apply-coupon').addEventListener('click', () => {
    const couponInput = document.querySelector('.coupon-code input');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    // Example coupon codes
    const coupons = {
        'SAVE10': 0.1,
        'SAVE20': 0.2,
        'FIRST50': 0.5
    };
    
    if (coupons[couponCode]) {
        const discount = coupons[couponCode];
        alert(`Coupon applied! You got ${discount * 100}% off!`);
        couponInput.value = '';
    } else {
        alert('Invalid coupon code');
    }
});
