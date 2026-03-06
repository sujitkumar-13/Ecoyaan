"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Menu, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function MobileNavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const isActive = (path: string) => pathname === path;

    const handleNav = (path: string) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail && (path === '/profile' || path === '/cart' || path === '/wishlist')) {
            router.push('/register');
        } else {
            router.push(path);
        }
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 z-50 flex items-center justify-between pb-safe">
            <button
                onClick={() => handleNav('/')}
                className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-[#008C4A]' : 'text-gray-500 hover:text-gray-900'}`}
            >
                <Home className="w-[26px] h-[26px]" strokeWidth={isActive('/') ? 2.5 : 2} />
                <span className="text-[11px] font-medium">Home</span>
            </button>

            <button
                onClick={() => handleNav('/profile')}
                className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-[#008C4A]' : 'text-gray-500 hover:text-gray-900'}`}
            >
                <User className="w-[26px] h-[26px]" strokeWidth={isActive('/profile') ? 2.5 : 2} />
                <span className="text-[11px] font-medium">Profile</span>
            </button>

            <button
                onClick={() => handleNav('/cart')}
                className={`relative flex flex-col items-center gap-1 ${isActive('/cart') ? 'text-[#008C4A]' : 'text-gray-500 hover:text-gray-900'}`}
            >
                <div className="relative">
                    <ShoppingCart className="w-[26px] h-[26px]" strokeWidth={isActive('/cart') ? 2.5 : 2} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-[#008C4A] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-[1.5px] border-white">
                            {cartCount}
                        </span>
                    )}
                </div>
                <span className="text-[11px] font-medium">Cart</span>
            </button>
        </div>
    );
}
