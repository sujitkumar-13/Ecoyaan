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
        <div className="max-w-[1400px] mx-auto px-4 py-6 md:py-8 pb-24 md:pb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2 md:gap-3">
                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-green-600 fill-current" />
                    Your Wishlist
                </h1>
                <span className="text-sm text-gray-500 font-medium">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-16 flex flex-col items-center justify-center text-center">
                    <div className="w-18 h-18 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mb-5 md:mb-6 p-4">
                        <Heart className="w-10 h-10 md:w-12 md:h-12 text-green-300" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Your wishlist is empty</h2>
                    <p className="text-gray-500 max-w-sm text-sm md:text-base mb-6 md:mb-8">
                        Save items you love here to easily find them later. Explore our shop to find sustainable products for your everyday life.
                    </p>
                    <Link
                        href="/#bestsellers"
                        className="px-7 py-3 md:px-8 md:py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-sm text-sm md:text-base"
                    >
                        Explore Shop
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {wishlistItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
