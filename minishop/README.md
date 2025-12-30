# Mini E-Commerce Storefront

A modern, responsive e-commerce frontend built with Next.js 15, React 19, Tailwind CSS v4, and Zustand.

## Features

- **Responsive Design**: Mobile-first layout with a clean, modern UI.
- **Product Listing**: Filterable product grid (Price, Rating, Brand).
- **Shopping Cart**: Real-time cart management with local storage persistence.
- **Product Details**: Dynamic product pages with gallery and information.
- **Checkout**: Simulated checkout flow with form validation.

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **UI Components**: Custom components built with Radix UI primitives.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
  - `ui`: Base UI primitives (Button, Input, Sheet, etc.).
  - `layout`: Layout components (Navbar, Footer).
  - `product`: Product-related components (Card, Filters).
  - `cart`: Cart drawer and logic.
- `src/store`: Zustand state management stores.
- `src/lib`: Utilities and mock data.
