# Hab Commerce 🛍️

A modern, premium, and fully responsive e-commerce platform built with pure Vanilla Web technologies. **Hab Commerce** delivers a sleek shopping experience with a focus on performance, aesthetics, and user-friendly interactions.

## ✨ Features

- **🛍️ Dynamic Product Catalog**: A robust catalog featuring multiple categories (Electronics, Fashion, Home, Sports) with lazy-loading images.
- **🔍 Advanced Search & Filtering**: Instant, real-time search functionality combined with category filtering and price sorting (Low to High, High to Low).
- **🛒 Persistent Shopping Cart**: A fully functional cart system that remains persistent across sessions using browser `LocalStorage`.
- **🌙 Smart Theme Engine**: Native Light and Dark mode support with automatic persistence based on user preference.
- **🔐 Authentication System**: Integrated login and sign-up modals with user state management and personal profile views.
- **💳 Versatile Checkout**: A simulated multi-method payment gateway supporting Credit Cards, Cryptocurrency, and PayPal.
- **📱 Ultra-Responsive Design**: Crafted with a "Mobile-First" approach, ensuring a premium experience on everything from 4K monitors to smartphones.
- **⚡ Performance First**: Zero dependencies, minimal bundle size, and optimized for fast load times.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure for better SEO and accessibility.
- **CSS3**: Advanced styling using Flexbox, CSS Grid, Custom Properties (Variables), and smooth transitions.
- **JavaScript (ES6+)**: Functional programming patterns for DOM manipulation and state management.
- **LocalStorage**: Client-side data persistence for cart, theme, and user sessions.

## 📂 Project Structure

```text
e-commerce/
├── assets/             # Images and icons organized by category
├── index.html          # Main storefront page
├── about.html          # Company story and mission page
├── contact.html        # Customer support and contact form
├── style.css           # Global design system and components
├── script.js           # Core application logic and state management
└── README.md           # Project documentation
```

## 🚀 Getting Started

Since this is a vanilla web project, getting it up and running is incredibly simple:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/e-commerce.git
    ```
2.  **Open the project**:
    Simply open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, Edge).
3.  **Local Server (Recommended)**:
    For the best experience (and to avoid CORS issues with assets), use a local server like VS Code's **Live Server** extension or run:
    ```bash
    npx serve .
    ```

## 📝 Usage

- **Switching Themes**: Click the Sun/Moon icon in the header to toggle between light and dark modes.
- **Adding to Cart**: Find a product you like and click "Add". You can then view your cart by clicking the bag icon in the header.
- **Filtering**: Use the category buttons above the product grid to narrow down your selection.
- **Checkout**: Click "Checkout" in the cart sidebar to choose your preferred simulated payment method.

---

*Built with ❤️ by Hab*
