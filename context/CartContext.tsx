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
    const [shippingFee, setShippingFee] = useState<number>(initialData.shipping_fee);
    const [discountApplied, setDiscountApplied] = useState<number>(initialData.discount_applied);
    const [shippingAddress, setShippingAddressState] = useState<ShippingAddress | null>(null);

    // Sync with initialData if it changes from server (optional but good practice)
    useEffect(() => {
        setCartItems(initialData.cartItems);
        setShippingFee(initialData.shipping_fee);
        setDiscountApplied(initialData.discount_applied);
    }, [initialData]);

    const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.product_id === item.product_id);
            if (existing) {
                return prev.map(i =>
                    i.product_id === item.product_id
                        ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                        : i
                );
            }
            return [...prev, { ...item, quantity: item.quantity || 1 }];
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product_id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.product_id !== id));
    };

    const setShippingAddress = (address: ShippingAddress) => {
        setShippingAddressState(address);
    };

    const clearCart = () => {
        setCartItems([]);
        setShippingAddressState(null);
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
