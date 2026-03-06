"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, WishlistContextType } from "../types";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;

        if (email) {
            fetch(`/api/wishlist?email=${encodeURIComponent(email)}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setWishlistItems(data);
                        localStorage.setItem('ecoyaan_wishlist', JSON.stringify(data));
                    }
                })
                .catch(err => console.error("Failed to fetch wishlist", err));
        } else {
            // Load from local storage for guests, or clear if we want it strictly logged-in only
            const savedWishlist = localStorage.getItem('ecoyaan_wishlist');
            if (savedWishlist) {
                try {
                    setWishlistItems(JSON.parse(savedWishlist));
                } catch (error) {
                    console.error("Failed to parse wishlist from local storage", error);
                }
            }
        }
    }, []);

    // Save to local storage and DB whenever wishlistItems changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('ecoyaan_wishlist', JSON.stringify(wishlistItems));

            const email = localStorage.getItem('userEmail');
            if (email) {
                fetch('/api/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, items: wishlistItems })
                }).catch(err => console.error("Failed to save wishlist", err));
            }
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

    const clearWishlist = () => {
        setWishlistItems([]);
        localStorage.removeItem('ecoyaan_wishlist');
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist
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
