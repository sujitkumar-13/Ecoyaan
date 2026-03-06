"use client";

import React, { useEffect } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
    const { wishlistItems } = useWishlist();
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            router.push('/register');
        } else {
            setIsCheckingAuth(false);
        }
    }, [router]);

    if (isCheckingAuth) {
        return null; // Prevent flickering
    }

    return (
        <div className="max-w-[1400px] mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Heart className="w-8 h-8 text-green-600 fill-current" />
                    Your Wishlist
                </h1>
                <span className="text-gray-500 font-medium">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                        <Heart className="w-12 h-12 text-green-300" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
                    <p className="text-gray-500 max-w-md mb-8">
                        Save items you love here to easily find them later. Explore our shop to find sustainable products for your everyday life.
                    </p>
                    <Link
                        href="/#bestsellers"
                        className="px-8 py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-sm"
                    >
                        Explore Shop
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
