#  PizzaHub

PizzaHub is a full-stack MERN (MongoDB, Express.js, React, Node.js) pizza ordering web application where users can browse pizzas, customize their own pizza, securely place orders, and pay online using Razorpay or Cash on Delivery. The application also includes an admin dashboard for managing pizzas, inventory, and orders.

---

##  Features

###  User Features

- User Registration & Login (JWT Authentication)
- Forgot & Reset Password
- Browse Pizza Menu
- View Pizza Details
- Customize Your Own Pizza
- Add to Cart
- Phone OTP Verification (Firebase)
- Cash on Delivery (COD)
- Razorpay Online Payment
- Place & Track Orders
- User Profile
- Responsive Design

###  Admin Features

- Admin Dashboard
- Manage Pizzas (Add, Edit, Delete)
- Inventory Management
- Order Management
- User Management
- Update Order Status

---

##  Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Firebase Authentication
- Razorpay Checkout

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Cloudinary
- Multer

### Database

- MongoDB Atlas / Local MongoDB

---

##  Folder Structure

```
PizzaHub
│
├── client
├── server
├── README.md
└── .gitignore
```

---

##  Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/pizzahub.git
```

### 2. Go to Project

```bash
cd pizzahub
```

### 3. Install Frontend

```bash
cd client
npm install
```

### 4. Install Backend

```bash
cd ../server
npm install
```

---

##  Run Frontend

```bash
cd client
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

##  Run Backend

```bash
cd server
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

##  Environment Variables

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api

VITE_RAZORPAY_KEY=your_key

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### Server (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:5173

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

##  Payment Options

- Cash on Delivery (COD)
- Razorpay Payment Gateway

---

##  OTP Verification

Phone number verification is implemented using **Firebase Phone Authentication** before an order is placed.

---

##  Screenshots

Add screenshots here.

Example:

```
Home Page

Menu

Customize Pizza

Cart

Checkout

Admin Dashboard
```

---

##  Main Functionalities

- User Authentication
- Password Reset
- JWT Authorization
- Firebase OTP Verification
- Pizza Customization
- Cart Management
- Order Placement
- Razorpay Integration
- Admin Dashboard
- Inventory Management
- Responsive UI

---

##  Future Improvements

- Live Order Tracking
- Coupons & Discounts
- Wishlist
- Reviews & Ratings
- Email Notifications
- Push Notifications
- AI Pizza Recommendation

---

##  Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Create a Pull Request

---

##  License

This project is created for educational and portfolio purposes.

---

##  Author

**Abhishek Kumar**

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile

---

 If you like this project, don't forget to give it a Star on GitHub!