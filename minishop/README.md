# MiniShop E-Commerce Platform

A professional, full-featured e-commerce application built with the latest modern web technologies. This project demonstrates a scalable architecture with role-based authentication, database integration, and a responsive UI.

🌐 **Live Demo:** [https://futurefs02-iota.vercel.app/](https://futurefs02-iota.vercel.app/)

## 🚀 Features

- **🛡️ Secure Authentication**: Powered by **NextAuth.js v5**, supporting secure login/signup flows with role-based access control (Admin, Seller, Buyer).
- **🛒 Dynamic Shopping Cart**: Real-time state management using **Zustand** with local storage persistence.
- **📱 Fully Responsive Design**: Mobile-first approach using **Tailwind CSS v4** for a seamless experience across all devices.
- **📦 Product Management**: Full CRUD capabilities for products (for Sellers/Admins).
- **🛍️ Order System**: Complete order lifecycle management from checkout to history.
- **🎨 Modern UI/UX**: Built with **Radix UI** primitives and **Lucide React** icons for accessibility and aesthetics.
- **🔍 Advanced Filtering**: Sort and filter products by price, rating, and brand.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Prisma ORM](https://www.prisma.io/))
- **Auth**: [NextAuth.js v5](https://authjs.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Validation**: [Zod](https://zod.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Sonner](https://sonner.emilkowal.ski/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use a local instance)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd minishop
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/minishop"
    AUTH_SECRET="your-super-secret-key"
    ```

4.  **Setup Database:**
    Initialize the database schema with Prisma:
    ```bash
    npx prisma generate
    npx prisma db push
    ```
    *(Optional) Seed the database with initial data:*
    ```bash
    npm run prisma:seed # If a seed script is configured in package.json
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```
    The app will be available at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

```bash
src/
├── app/              # Next.js App Router (Pages & Layouts)
│   ├── (auth)/       # Authentication routes (Login, Register)
│   ├── (shop)/       # Main shop routes (Products, Cart)
│   └── dashboard/    # Protected User/Admin dashboards
├── components/       # Reusable React components
│   ├── ui/           # Base UI primitives (Button, Input, etc.)
│   └── shared/       # Shared logic components
├── lib/              # Utilities, constants, and helpers
├── store/            # Global state stores (Zustand)
└── types/            # TypeScript type definitions
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
