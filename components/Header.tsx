"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Search, Heart, ShoppingCart } from "lucide-react";

export function Header() {
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-transparent py-4 md:py-5 px-4 md:px-8 z-50 w-full">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-5 md:gap-10">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E5F5ED] flex items-center justify-center flex-shrink-0">
                        {/* Custom Leaf/Bird Icon filled with green */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#008C4A] transform -rotate-12">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-bold text-[#008C4A] leading-none tracking-tight">Ecoyaan</span>
                        <span className="text-[11px] md:text-[13px] font-semibold text-[#008C4A] leading-tight pt-1">Sustainability made easy</span>
                    </div>
                </Link>

                {/* Location Section */}
                <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                    <svg className="w-7 h-7 text-[#008C4A]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <div className="flex flex-col">
                        <span className="text-[15px] font-semibold text-gray-800 leading-tight">New Delhi, 110001</span>
                        <span className="text-[12px] font-medium text-[#7D5A9C] cursor-pointer hover:underline leading-tight pt-0.5">Update Location</span>
                    </div>
                </div>

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

                    {/* User */}
                    <div className="hidden md:flex items-center gap-3 cursor-pointer group">
                        <svg className="w-7 h-7 text-[#008C4A]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-gray-800 leading-tight">Hello 👋</span>
                            <span className="text-[12px] font-medium text-gray-500 leading-tight group-hover:underline pt-0.5">Log in</span>
                        </div>
                    </div>

                    {/* Wishlist */}
                    <Link href="#" className="text-[#008C4A] hover:text-[#006b38] transition-colors">
                        <Heart className="w-7 h-7" strokeWidth={2.5} />
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative text-[#008C4A] hover:text-[#006b38] transition-colors hidden md:flex">
                        <ShoppingCart className="w-7 h-7" strokeWidth={2.5} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-[#008C4A] text-white text-[11px] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-white -translate-y-2.5 translate-x-2.5">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Search Bar (visible only on small screens) */}
            <div className="md:hidden mt-4 w-full mx-auto">
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
        </header>
    );
}
