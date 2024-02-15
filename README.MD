# E-commerce

This project is 

## Getting Started

Follow the steps below to set up and run the project:

1. Create a `.env` file in the project root directory.

2. In the `.env` file, set the required variables such as `MONGO_URI` for MongoDB connection and other environment-specific variables.

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_KEY=your_jwt_secret
    JWT_LIFETIME=your-lifetime-jwt
    ```

3. Open your terminal and run the following commands:

    ```bash
    npm install
    npm start
    ```

This will install the required dependencies and start the server.

## Project Structure

The project is organized into the following directories:

- **controllers:** Contains the logic for handling HTTP requests.
- **db:** Manages the database connection and schema.
- **errors:** Handles custom error classes.
- **middleware:** Includes security middleware functions (helmet, cors, xss-clean), and rate limiting.
- **models:** Defines the data models for users and jobs.
- **routes:** Defines the API routes.
- **utils:** Includes utility functions.

## Security Measures

- **helmet:** Helps secure the application by setting various HTTP headers.
- **xss-clean:** Sanitizes user input to prevent Cross-Site Scripting (XSS) attacks.
- **express-rate-limit:** Implements rate limiting for security.

## API Endpoints

### Authentication Endpoints:
- POST /auth/register: Register a new user.
- POST /auth/verify-email: Verify user's email.
- POST /auth/login: User login.
- POST /auth/forgot-password: Request to reset password.
- POST /auth/reset-password: Reset user's password.
- DELETE /auth/logout: Logout user.

### User Endpoints:
- GET /user: Get all users.
- GET /user/{id}: Get user by ID.
- GET /user/showMe: Get current user.
- PATCH /user/updateUser: Update user information.
- PATCH /user/id: Update user password.

### Product Endpoints:
- POST /product: Create a new product.
- GET /product: Get all products.
- GET /product/{id}: Get product by ID.
- GET /product/review/{id}: Get product reviews by ID.
- POST /product/uploadImage: Upload product image.
- GET /product/id: Get product by ID.
- PATCH /product/id: Update product by ID.
- DELETE /product/id: Delete product by ID.

### Review Endpoints:
- GET /reviews: Get all reviews.
- POST /reviews: Create a new review.
- GET /reviews/{id}: Get review by ID.
- PATCH /reviews/{id}: Update review by ID.
- DELETE /reviews/{id}: Delete review by ID.

### Order Endpoints:
- POST /orders: Create a new order.
- GET /orders: Get all orders.
- GET /orders/showAllMyOrders: Get current order.
- GET /orders/{id}: Get order by ID.
- PATCH /orders/{id}: Update order by ID.

## Link

You can see this project [here](https://jobs-api-vw4r.onrender.com/).

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Make sure to follow the existing code style and conventions.

## License

This project is from John Smilga.
