# Modern Shopping Website

A full-featured e-commerce website built with Node.js, Express, and MySQL.

## Features

- User Authentication (Register/Login)
- Product Browsing and Search
- Shopping Cart Management
- Order Processing
- Product Categories and Filters
- Responsive Design
- Special Offers Section
- Recently Viewed Products

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database
   - Import the schema from `database/schema.sql`
   - Update database configuration in `config/db.js`

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. Access the website at `http://localhost:3000`

## Project Structure

```
├── config/
│   └── db.js                 # Database configuration
├── database/
│   └── schema.sql            # Database schema and sample data
├── public/
│   ├── css/
│   │   └── style.css        # Styles
│   ├── js/
│   │   └── main.js          # Client-side JavaScript
│   └── images/              # Static images
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── products.js          # Product routes
│   ├── cart.js              # Cart routes
│   └── orders.js            # Order routes
├── server.js                # Main server file
└── package.json            # Project dependencies
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- GET /api/products/category/:category - Get products by category
- GET /api/products/search/:query - Search products

### Cart
- GET /api/cart - Get cart items
- POST /api/cart/add - Add item to cart
- PUT /api/cart/update/:productId - Update cart item quantity
- DELETE /api/cart/remove/:productId - Remove item from cart

### Orders
- GET /api/orders - Get user orders
- POST /api/orders/create - Create new order
- GET /api/orders/:orderId - Get order details

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MySQL
  - bcrypt (password hashing)
  - express-session (session management)

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Fetch API

## Security Features

- Password hashing
- Session management
- SQL injection protection
- CORS enabled
- Input validation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
