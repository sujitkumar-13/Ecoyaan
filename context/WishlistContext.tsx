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

    const fetchWishlist = async () => {
        const email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;

        if (email) {
            try {
                const res = await fetch(`/api/wishlist?email=${encodeURIComponent(email)}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setWishlistItems(data);
                    localStorage.setItem('ecoyaan_wishlist', JSON.stringify(data));
                }
            } catch {
                // Failed silently
            }
        } else {
            // Load from local storage for guests
            const savedWishlist = localStorage.getItem('ecoyaan_wishlist');
            if (savedWishlist) {
                try {
                    setWishlistItems(JSON.parse(savedWishlist));
                } catch {
                    setWishlistItems([]);
                }
            } else {
                setWishlistItems([]);
            }
        }
    };

    useEffect(() => {
        fetchWishlist();

        // Listen for storage events (login/logout in other tabs/components)
        const handleStorageChange = () => {
            fetchWishlist();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
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
                }).catch(() => { });
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
