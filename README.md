# 🌿 Ecoyaan — Sustainability Made Easy

<div align="center">
  <p><strong>A full-stack e-commerce platform for eco-friendly and sustainable products</strong></p>
  <p>Built with Next.js 16 · React 19 · MongoDB · TypeScript · Tailwind CSS v4</p>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [API Reference](#-api-reference)
- [Components](#-components)
- [Context Providers](#-context-providers)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Responsive Design](#-responsive-design)

---

## 🌱 Overview

**Ecoyaan** is a modern, fully-responsive e-commerce web application focused on sustainable and eco-friendly products. It allows users to browse products, manage a wishlist, add items to their cart, complete a full checkout flow (cart → shipping → payment → success), manage their profile, view their order history, and leave product reviews — all persisted to a MongoDB Atlas database.

The platform features AI-verified product sustainability badges via **Ecoverify™**, a proprietary vetting framework built into the product detail page.

---

## ✨ Features

### 🛍️ Shopping
- Product listing on the homepage with a **"Our Bestsellers"** section
- **Product Detail Page** with:
  - Image gallery with horizontal thumbnail scroll
  - Sustainability badges (Vegan, Zero Waste, Recycled, Cruelty Free, Plastic Free, etc.)
  - AI-verified **Ecoverify™** banner
  - Pricing with discount percentage
  - Quantity selector
  - Add to Bag / Buy Now actions
  - Delivery estimate
  - Collapsible accordions (About Product, Ingredients, Return Policy)
  - "About this item" attributes table (Material, Bristle Type, Pack Size, etc.)
- **Product search** in the header

### 🛒 Cart & Checkout
- Full multi-step checkout flow with **CheckoutStepper** (Cart → Shipping → Payment → Success)
- **Cart Page**: View, update quantities, remove items, order summary sidebar
- **Shipping Page**: Address form with 10-digit phone validation and focus-persistence
- **Payment Page**: UPI, Credit/Debit Card, Net Banking, Cash on Delivery
- **Success Page**: Order confirmation with order ID, "View Orders" and "Continue Shopping" CTAs
- Cart persisted to MongoDB per user

### ❤️ Wishlist
- Add/remove products from wishlist (heart icon on product cards and detail page)
- Dedicated Wishlist page with 2-column grid on mobile
- Wishlist persisted to MongoDB per user

### 👤 Authentication & Profile
- Register (name, email, password, phone) with validation
- Login with JWT tokens stored in `localStorage`
- **Profile Page** with 4 tabs:
  - **Overview**: Stats (Total Orders, Eco Points, Wallet Balance) + Personal Information + Recent Orders
  - **My Orders**: Full order history with filter (All / Past 3 Months / 2023), "Buy it again" action
  - **Addresses**: Saved addresses with edit/delete; empty state prompt; "Add New Address" modal
  - **Settings**: Push notification toggle, Save Payment Methods toggle, Sign Out (mobile-only in this tab, desktop sidebar has it)
- Profile photo upload (local preview)
- Edit profile modal with validation

### ⭐ Reviews
- Write a Review modal with star rating, title, and comment
- Reviews stored in MongoDB and fetched per product
- Dynamic rating breakdown (per-star percentage, average score, total count)
- Empty state when no reviews exist

### 📱 Responsive Design
- Fully responsive across all screen sizes (mobile, tablet, desktop)
- Mobile navigation bar (Home, Profile, Cart) with active indicator
- Profile page uses a scrollable tab bar on mobile
- No sticky elements on mobile (images, sidebars)
- Mobile nav clearance padding (`pb-24`) on all key pages

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) via the official `mongodb` driver |
| **Auth** | JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` for password hashing |
| **Image Optimization** | Next.js `<Image>` component |
| **State Management** | React Context API (`CartContext`, `WishlistContext`) |

---

## 📁 Project Structure

```
Ecoyaan/
├── app/
│   ├── layout.tsx              # Root layout (Header, Footer, MobileNavBar, Providers)
│   ├── page.tsx                # Homepage (hero, bestsellers, why choose us)
│   ├── globals.css             # Global styles + no-scrollbar utility
│   ├── about/                  # About page
│   ├── legal/                  # Terms & Privacy pages
│   ├── support/                # FAQ, Shipping & Delivery, Contact support pages
│   ├── login/                  # Login page
│   ├── register/               # Register/Signup page
│   ├── profile/                # User profile page (Overview, Orders, Addresses, Settings)
│   ├── wishlist/               # Wishlist page
│   ├── products/[id]/          # Dynamic product detail page
│   ├── cart/                   # Cart page
│   ├── shipping/               # Shipping form page
│   ├── payment/                # Payment selection page
│   ├── success/                # Order success confirmation page
│   └── api/
│       ├── login/              # POST — authenticate user, return JWT
│       ├── cart/               # GET, POST — fetch/save cart items
│       ├── orders/             # GET, POST — fetch/create orders
│       ├── products/           # GET — fetch all products from DB
│       ├── reviews/            # GET (by productId), POST — product reviews
│       ├── seed/               # POST — seed products into DB
│       ├── user/               # GET, POST — fetch/update user profile & addresses
│       └── wishlist/           # GET, POST — fetch/save wishlist items
│
├── components/
│   ├── Header.tsx              # Top navigation with search, cart icon, auth
│   ├── Footer.tsx              # Site footer with links and newsletter
│   ├── MobileNavBar.tsx        # Fixed bottom nav bar (mobile only)
│   ├── ProductCard.tsx         # Product card with wishlist toggle
│   ├── CartItem.tsx            # Individual cart row component
│   ├── CheckoutStepper.tsx     # Step indicator (Cart → Shipping → Payment)
│   ├── OrderSummary.tsx        # Sticky sidebar order totals (desktop only)
│   ├── AddressForm.tsx         # Reusable shipping address form
│   └── WhyChooseUs.tsx         # Homepage "Why Choose Us" section
│
├── context/
│   ├── CartContext.tsx         # Cart state, add/remove/update/clear, DB sync
│   └── WishlistContext.tsx     # Wishlist state, add/remove/clear, DB sync
│
├── lib/
│   ├── mongodb.ts              # MongoDB client singleton (cached for Next.js)
│   ├── user.ts                 # getUser() helper (localStorage fallback)
│   ├── api.ts                  # Base API URL helper
│   └── products.ts             # Product helper functions
│
├── types/                      # Shared TypeScript interfaces
├── public/                     # Static assets (logo, icons)
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript config
└── package.json
```

---

## 📄 Pages & Routes

| Route | Description | Auth Required |
|---|---|:---:|
| `/` | Homepage with hero, bestsellers, why-choose-us | ❌ |
| `/products/[id]` | Product detail page | ❌ |
| `/login` | User login | ❌ |
| `/register` | User registration | ❌ |
| `/wishlist` | User wishlist | ✅ |
| `/cart` | Shopping cart | ✅ |
| `/shipping` | Shipping address form | ✅ |
| `/payment` | Payment method selection | ✅ |
| `/success` | Order confirmation | ✅ |
| `/profile` | User profile, orders, addresses, settings | ✅ |
| `/about` | About Ecoyaan | ❌ |
| `/legal/terms` | Terms of Service | ❌ |
| `/legal/privacy` | Privacy Policy | ❌ |
| `/support/faq` | Frequently Asked Questions | ❌ |
| `/support/shipping` | Shipping & Delivery info | ❌ |
| `/support/contact` | Contact Us | ❌ |

---

## 🔌 API Reference

All API routes are under `/app/api/` and use Next.js Route Handlers.

### Authentication

#### `POST /api/login`
Authenticate a user and return a JWT token.

**Request Body:**
```json
{ "email": "user@example.com", "password": "yourpassword" }
```
**Response:**
```json
{ "token": "<jwt>", "user": { "name": "...", "email": "..." } }
```

---

### Users

#### `GET /api/user?email=user@example.com`
Fetch user profile, addresses, and account metadata.

#### `POST /api/user`
Create or update a user profile / addresses.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "9876543210",
  "addresses": [...]
}
```

---

### Products

#### `GET /api/products`
Returns all products from the `products` MongoDB collection.

**Response:** Array of product objects with `id`, `name`, `price`, `image`, `images[]`, `badges[]`, `description`, `attributes`, `categoryPath[]`, `oldPrice`.

#### `POST /api/seed`
Seeds the database with initial product data (run once on setup).

---

### Cart

#### `GET /api/cart?email=user@example.com`
Fetch the user's current cart items.

#### `POST /api/cart`
Save/update the user's cart to the database.

**Request Body:**
```json
{ "email": "user@example.com", "items": [...] }
```

---

### Wishlist

#### `GET /api/wishlist?email=user@example.com`
Fetch the user's wishlist items.

#### `POST /api/wishlist`
Save/update the user's wishlist.

**Request Body:**
```json
{ "email": "user@example.com", "items": [...] }
```

---

### Orders

#### `GET /api/orders?email=user@example.com`
Fetch all orders placed by the user, sorted newest first.

#### `POST /api/orders`
Create a new order after successful payment.

**Request Body:**
```json
{
  "email": "user@example.com",
  "items": [...],
  "total": 499,
  "shippingAddress": { "fullName": "...", "city": "...", ... },
  "paymentMethod": "UPI"
}
```

---

### Reviews

#### `GET /api/reviews?productId=101`
Fetch all reviews for a specific product, sorted newest first.

#### `POST /api/reviews`
Submit a new product review.

**Request Body:**
```json
{
  "productId": 101,
  "userEmail": "user@example.com",
  "userName": "johndoe",
  "rating": 5,
  "title": "Great product!",
  "comment": "Really happy with this purchase."
}
```

---

## 🧩 Components

| Component | Description |
|---|---|
| `Header` | Top bar with logo, search, wishlist icon, cart icon, login/profile button |
| `Footer` | Links (Quick Links, Customer Service, Stay Connected), newsletter signup |
| `MobileNavBar` | Fixed bottom bar on mobile with Home, Profile, Cart icons |
| `ProductCard` | Product tile with image, name, price, wishlist heart button |
| `CartItem` | Single cart entry row with quantity controls ± and remove button |
| `CheckoutStepper` | Visual 3-step progress indicator across checkout pages |
| `OrderSummary` | Collapsible sidebar showing items, subtotal, shipping, total |
| `AddressForm` | Full address input form with validation (name, phone, pin, city, state) |
| `WhyChooseUs` | Homepage section with eco-mission highlights |

---

## 🔄 Context Providers

### `CartContext`
Manages the global cart state.

| Method | Description |
|---|---|
| `addToCart(item)` | Add item or increment quantity |
| `removeFromCart(productId)` | Remove item by product ID |
| `updateQuantity(productId, qty)` | Set quantity for a specific item |
| `clearCart()` | Empty the cart |
| `cartItems` | Current cart items array |
| `cartCount` | Total item count |
| `cartTotal` | Total price |

**Persistence:** Cart is synced to `POST /api/cart` on every change, and loaded from `GET /api/cart` on initialization.

---

### `WishlistContext`
Manages the global wishlist state.

| Method | Description |
|---|---|
| `addToWishlist(product)` | Add product to wishlist |
| `removeFromWishlist(productId)` | Remove product by ID |
| `clearWishlist()` | Clear entire wishlist |
| `isInWishlist(productId)` | Returns `true` if product is wishlisted |
| `wishlistItems` | Current wishlist array |

**Persistence:** Wishlist is synced to `POST /api/wishlist` on every change, and loaded on initialization.

---

## 🗄️ Database Schema

### MongoDB Database: `ecoyaan`

#### Collection: `users`
```json
{
  "_id": ObjectId,
  "name": "string",
  "email": "string (unique)",
  "password": "string (bcrypt hashed)",
  "phone": "string",
  "joinedAt": "string",
  "addresses": [
    {
      "id": "addr_1",
      "label": "Home",
      "fullName": "string",
      "phone": "string",
      "pinCode": "string",
      "city": "string",
      "state": "string",
      "isDefault": true
    }
  ]
}
```

#### Collection: `products`
```json
{
  "_id": ObjectId,
  "id": "number (unique)",
  "name": "string",
  "price": "number",
  "oldPrice": "number (optional)",
  "image": "string (URL)",
  "images": ["string (URLs)"],
  "badges": ["Vegan", "Zero Waste", ...],
  "description": "string",
  "categoryPath": ["Personal Care", "Oral Care"],
  "attributes": { "Material": "Bamboo", "Bristle Type": "Soft" }
}
```

#### Collection: `carts`
```json
{
  "_id": ObjectId,
  "email": "string",
  "items": [
    { "product_id": 101, "product_name": "...", "product_price": 299, "image": "...", "quantity": 2 }
  ]
}
```

#### Collection: `wishlists`
```json
{
  "_id": ObjectId,
  "email": "string",
  "items": [{ ...productObject }]
}
```

#### Collection: `orders`
```json
{
  "_id": ObjectId,
  "id": "string (short ID)",
  "email": "string",
  "items": [...],
  "total": "number",
  "status": "Processing | Delivered",
  "date": "string",
  "shippingAddress": { "fullName": "...", "city": "...", ... },
  "paymentMethod": "UPI | Credit Card | ...",
  "createdAt": "Date"
}
```

#### Collection: `reviews`
```json
{
  "_id": ObjectId,
  "productId": "number",
  "userEmail": "string",
  "userName": "string",
  "rating": "number (1-5)",
  "title": "string",
  "comment": "string",
  "date": "string",
  "createdAt": "Date"
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ecoyaan.git
cd ecoyaan

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and JWT secret

# 4. Seed the database with products
curl -X POST http://localhost:3000/api/seed

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Build the production bundle |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB connection string from MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecoyaan?retryWrites=true&w=majority

# Secret key for JWT token signing (use a long random string)
JWT_SECRET=your_super_secret_jwt_key_here
```

> ⚠️ **Never commit your `.env` file to version control.** It is already listed in `.gitignore`.

---

## 📱 Responsive Design

Ecoyaan is built **mobile-first** and tested across all screen sizes:

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 640px | Single column, horizontal tab bars, no sticky elements |
| Tablet (sm) | 640px+ | 2-column grids, larger icons |
| Tablet (md) | 768px+ | Side-by-side layouts, larger text |
| Desktop (lg) | 1024px+ | Full sidebar navigation, sticky elements enabled |
| Wide (xl+) | 1280px+ | Maximum container width (1400px) |

**Key mobile adaptations:**
- Profile page: sidebar → compact horizontal scrollable tab bar
- Product detail: vertical thumbnail sidebar → horizontal thumbnail scroll below image
- Checkout sidebar: not sticky on mobile to avoid overlapping content
- Mobile Navigation Bar: fixed bottom bar with Home, Profile, Cart
- All pages include `pb-24` bottom padding to clear the mobile nav bar

---

## 📜 License

This project is private and proprietary. All rights reserved © 2025 Ecoyaan.

---

<div align="center">
  <p>Made with 💚 for a sustainable future</p>
  <p><strong>Ecoyaan — Sustainability Made Easy</strong></p>
</div>
