import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";
import { products as initialProducts } from "@/lib/data";

interface Order {
    id: string;
    userId: string;
    items: {
        id: number;
        title: string;
        price: number;
        quantity: number;
        image: string;
    }[];
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered";
    date: string;
}

interface AdminState {
    products: Product[];
    orders: Order[];
    addProduct: (product: Omit<Product, "id" | "rating">) => void;
    updateProduct: (id: number, product: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
    updateOrderStatus: (orderId: string, status: Order["status"]) => void;
    placeOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
}

export const useAdminStore = create<AdminState>()(
    persist(
        (set, get) => ({
            products: initialProducts,
            orders: [],

            addProduct: (productData) => {
                const newProduct: Product = {
                    ...productData,
                    id: Math.floor(Math.random() * 10000) + 100, // Generate random ID
                    rating: { rate: 0, count: 0 }
                };
                set((state) => ({ products: [...state.products, newProduct] }));
            },

            updateProduct: (id, productData) => {
                set((state) => ({
                    products: state.products.map(p => p.id === id ? { ...p, ...productData } : p)
                }));
            },

            deleteProduct: (id) => {
                set((state) => ({
                    products: state.products.filter(p => p.id !== id)
                }));
            },

            placeOrder: (orderData) => {
                const newOrder: Order = {
                    ...orderData,
                    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
                    date: new Date().toISOString(),
                    status: "pending"
                };
                set((state) => ({ orders: [newOrder, ...state.orders] }));
            },

            updateOrderStatus: (orderId, status) => {
                set((state) => ({
                    orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
                }));
            }
        }),
        {
            name: "admin-storage",
        }
    )
);
