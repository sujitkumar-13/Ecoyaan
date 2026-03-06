"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Search, Heart, ShoppingCart, User, MapPin, X, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuthStatus = () => {
            const email = localStorage.getItem('userEmail');
            const token = localStorage.getItem('token');
            const tokenExpiry = localStorage.getItem('tokenExpiry');

            if (email && token && tokenExpiry) {
                const now = new Date().getTime();
                if (now > parseInt(tokenExpiry)) {
                    // Token expired, log user out
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiry');
                    localStorage.removeItem('ecoyaan_wishlist');
                    setIsLoggedIn(false);

                    // Redirect to login if on a protected page
                    const protectedPages = ["/profile", "/cart", "/wishlist", "/shipping", "/payment", "/success"];
                    if (protectedPages.includes(pathname)) {
                        router.push("/login?expired=true");
                    }
                } else {
                    setIsLoggedIn(true);
                }
            } else {
                setIsLoggedIn(!!email); // Fallback for pre-existing non-token sessions
            }
        };

        checkAuthStatus();
        setAuthChecked(true);
    }, [pathname, router]);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlistItems.length;

    return (
        <header className="w-full bg-white relative">
            {/* Spacer for fixed header */}
            <div className="h-[145px] md:h-[96px]" />
            {/* Fixed Top Bar (Logo, Search, Icons) */}
            <div className="fixed top-0 left-0 right-0 bg-white py-4 md:py-5 px-4 md:px-8 z-50 w-full shadow-sm">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-5 md:gap-10">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E5F5ED] flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#008C4A] transform -rotate-12">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-bold text-[#008C4A] leading-none tracking-tight">Ecoyaan</span>
                            <span className="text-[11px] md:text-[13px] font-semibold text-[#008C4A] leading-tight pt-1">Sustainability made easy</span>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-grow hidden md:block max-w-[700px] w-full">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-[#008C4A] opacity-90" strokeWidth={2.5} />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-5 py-[12px] border-[1.5px] border-[#A3D9B1] rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#008C4A] focus:border-[#008C4A] text-[16px] transition-colors text-gray-700 shadow-sm"
                                placeholder="Search for 'Garbage Bags'"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6 lg:gap-10 flex-shrink-0">
                        {authChecked && (
                            isLoggedIn ? (
                                <Link href="/profile" className="hidden md:flex items-center gap-3 cursor-pointer group hover:text-[#006b38] transition-colors">
                                    <User className="w-7 h-7 text-[#008C4A]" />
                                </Link>
                            ) : (
                                <div className="hidden md:flex items-center gap-6">
                                    <Link href="/login" className="text-sm font-black text-stone-600 hover:text-[#008C4A] transition-colors">
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-[#008C4A] text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-[#006b38] transition-all shadow-lg shadow-green-100 uppercase tracking-widest text-center"
                                    >
                                        Join Now
                                    </Link>
                                </div>
                            )
                        )}

                        <button
                            onClick={() => {
                                if (!isLoggedIn) {
                                    router.push('/register');
                                } else {
                                    router.push('/wishlist');
                                }
                            }}
                            className="relative text-[#008C4A] hover:text-[#006b38]"
                        >
                            <Heart className="w-7 h-7" strokeWidth={2.5} />
                            {wishlistCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#008C4A] text-white text-[11px] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-white -translate-y-2.5 translate-x-2.5">
                                    {wishlistCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => {
                                if (!isLoggedIn) {
                                    router.push('/register');
                                } else {
                                    router.push('/cart');
                                }
                            }}
                            className="relative text-[#008C4A] hover:text-[#006b38] hidden md:flex"
                        >
                            <ShoppingCart className="w-7 h-7" strokeWidth={2.5} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#008C4A] text-white text-[11px] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-white -translate-y-2.5 translate-x-2.5">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden mt-4 w-full px-2">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-[18px] w-[18px] text-[#008C4A] opacity-90" strokeWidth={2.5} />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-3 border-[1.5px] border-[#A3D9B1] rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#008C4A] focus:border-[#008C4A] text-[15px] transition-colors text-gray-700 shadow-sm"
                            placeholder="Search for 'Garbage Bags'"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
