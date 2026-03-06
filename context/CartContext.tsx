"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, CartData, ShippingAddress, CartContextType } from "../types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
    children,
    initialData,
}: {
    children: ReactNode;
    initialData: CartData;
}) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialData.cartItems);
    const [shippingFee] = useState<number>(initialData.shipping_fee);
    const [discountApplied] = useState<number>(initialData.discount_applied);
    const [shippingAddress, setShippingAddressState] = useState<ShippingAddress | null>(null);

    // Initial fetch from database on mount (client side)
    useEffect(() => {
        const fetchCart = async () => {
            const email = localStorage.getItem('userEmail');
            if (email) {
                try {
                    const res = await fetch(`/api/cart?email=${encodeURIComponent(email)}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.cartItems) setCartItems(data.cartItems);
                    }
                } catch (e) {
                    console.error("Cart fetch error:", e);
                }
            }
        };
        fetchCart();
    }, []);

    // Helper to persist cart
    const persistCart = async (items: CartItem[]) => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            try {
                await fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, cartItems: items })
                });
            } catch (e) {
                console.error("Cart persist error:", e);
            }
        }
    };

    const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        setCartItems(prev => {
            let newItems;
            const existing = prev.find(i => i.product_id === item.product_id);
            if (existing) {
                newItems = prev.map(i =>
                    i.product_id === item.product_id
                        ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                        : i
                );
            } else {
                newItems = [...prev, { ...item, quantity: item.quantity || 1 }];
            }
            persistCart(newItems);
            return newItems;
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems((prev) => {
            const newItems = prev.map((item) =>
                item.product_id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            );
            persistCart(newItems);
            return newItems;
        });
    };

    const removeItem = (id: number) => {
        setCartItems((prev) => {
            const newItems = prev.filter((item) => item.product_id !== id);
            persistCart(newItems);
            return newItems;
        });
    };

    const setShippingAddress = (address: ShippingAddress) => {
        setShippingAddressState(address);
    };

    const clearCart = () => {
        setCartItems([]);
        setShippingAddressState(null);
        persistCart([]);
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.product_price * item.quantity,
        0
    );
    const grandTotal = subtotal > 0 ? subtotal + shippingFee - discountApplied : 0;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                shippingFee,
                discountApplied,
                shippingAddress,
                addToCart,
                updateQuantity,
                removeItem,
                setShippingAddress,
                clearCart,
                subtotal,
                grandTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
