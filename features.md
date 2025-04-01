
# E-Commerce Application Features

## Core Features

### User Authentication
- Login
- Registration
- Forgot Password
- Logout
- Profile Management

### Product Management
- Product Listing
- Product Categorization
- Product Details
- Product Search
- Product Filtering

### Shopping Cart
- Add to Cart
- Update Quantity
- Remove from Cart
- Clear Cart
- View Cart

### Wishlist
- Add to Wishlist
- Remove from Wishlist
- View Wishlist

### Checkout
- Multiple Payment Options (PayPal, Stripe, Apple Pay, Google Pay, Cash on Delivery)
- Shipping Information
- Order Summary
- Order Confirmation

### User Profile
- Order History
- Saved Addresses
- Payment Methods
- Personal Information

## API Integration Points

### Authentication API
- POST `/api/auth/login` - Authenticate user
- POST `/api/auth/register` - Register new user
- POST `/api/auth/forgot-password` - Send password reset email
- POST `/api/auth/reset-password` - Reset user password
- GET `/api/auth/user` - Get current user information

### Products API
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product details
- GET `/api/products/categories` - Get all categories
- GET `/api/products/category/:category` - Get products by category
- GET `/api/products/search/:query` - Search products

### Cart API
- GET `/api/cart` - Get user's cart
- POST `/api/cart` - Add item to cart
- PUT `/api/cart/:itemId` - Update cart item quantity
- DELETE `/api/cart/:itemId` - Remove item from cart
- DELETE `/api/cart` - Clear cart

### Wishlist API
- GET `/api/wishlist` - Get user's wishlist
- POST `/api/wishlist` - Add item to wishlist
- DELETE `/api/wishlist/:itemId` - Remove item from wishlist

### Checkout API
- POST `/api/checkout` - Process checkout
- GET `/api/orders` - Get user's orders
- GET `/api/orders/:id` - Get order details

### User Profile API
- GET `/api/user/profile` - Get user profile
- PUT `/api/user/profile` - Update user profile
- GET `/api/user/addresses` - Get user addresses
- POST `/api/user/addresses` - Add user address
- PUT `/api/user/addresses/:id` - Update user address
- DELETE `/api/user/addresses/:id` - Delete user address

## Integration Instructions

To integrate this application with a backend API:

1. Update the base URL in the API service configuration
2. Ensure API endpoints match the expected paths or update the front-end service to match the available endpoints
3. Implement proper authentication token handling
4. Handle API responses and errors appropriately
5. Update data models to match API response structures

## State Management

The application uses React Context API for state management:
- `CartContext` - Manages shopping cart state
- `UserContext` - Manages user authentication state
- `WishlistContext` - Manages user wishlist items
- `LanguageContext` - Manages application language and translations

## UI Components

The application uses shadcn/ui components and Tailwind CSS for styling. Custom components are created for specific features, while reusing shadcn/ui components for common UI elements.

