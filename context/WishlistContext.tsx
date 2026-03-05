"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, WishlistContextType } from "@/types";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Load from local storage on mount
        const savedWishlist = localStorage.getItem('ecoyaan_wishlist');
        if (savedWishlist) {
            try {
                setWishlistItems(JSON.parse(savedWishlist));
            } catch (error) {
                console.error("Failed to parse wishlist from local storage", error);
            }
        }
    }, []);

    // Save to local storage whenever wishlistItems changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('ecoyaan_wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, isMounted]);

    const addToWishlist = (product: Product) => {
        setWishlistItems((prev) => {
            if (prev.find((item) => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: number) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId: number) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
