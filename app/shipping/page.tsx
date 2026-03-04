"use client";

import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/OrderSummary";
import { AddressForm } from "@/components/AddressForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function ShippingPage() {
    const { cartItems } = useCart();
    const router = useRouter();

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            router.replace("/cart");
        }
    }, [cartItems, router]);

    if (cartItems.length === 0) return null; // Prevent flash before redirect

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-8 text-sm font-medium">
                <Link href="/cart" className="text-stone-500 hover:text-stone-900 transition-colors">1. Cart</Link>
                <span className="text-green-500">-----</span>
                <span className="text-stone-900 bg-stone-100 px-3 py-1 rounded-full">2. Shipping</span>
                <span className="text-stone-300">-----</span>
                <span className="text-stone-400">3. Payment</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1 text-stone-900">
                    <AddressForm />
                </div>

                <div className="lg:w-[400px]">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}
