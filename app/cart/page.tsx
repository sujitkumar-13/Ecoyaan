"use client";

import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/OrderSummary";
import { CartItem } from "@/components/CartItem";
import { CheckoutStepper } from "@/components/CheckoutStepper";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

export default function CartPage() {
    const { cartItems, subtotal } = useCart();
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

    const handleCheckout = () => {
        router.push("/shipping");
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-[1400px] mx-auto px-4 py-20 animate-in fade-in duration-700">
                <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 bg-stone-50/50 p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] border border-stone-100">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-stone-200">
                        <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-stone-300" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-3 max-w-md">
                        <h2 className="text-2xl md:text-3xl font-black text-stone-900">Your cart is empty</h2>
                        <p className="text-stone-500 font-medium text-sm md:text-base">Looks like you haven&apos;t added any sustainable goods yet. Let&apos;s change that!</p>
                    </div>
                    <Link
                        href="/"
                        className="bg-stone-900 text-white px-8 md:px-10 py-3 md:py-4 rounded-2xl font-black hover:bg-black transition-all active:scale-95 shadow-xl shadow-stone-200 text-sm md:text-base"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-4 md:py-6 pb-24 md:pb-6 animate-in fade-in duration-500">
            <CheckoutStepper currentStep={1} />

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
                <div className="flex-1 w-full">
                    <div className="flex items-end justify-between mb-8 border-b border-stone-100 pb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
                            Shopping Cart <span className="text-stone-300 ml-2 font-normal">({cartItems.length})</span>
                        </h1>
                    </div>

                    <div className="bg-white rounded-3xl border border-stone-100 divide-y divide-stone-50 shadow-sm overflow-hidden">
                        {cartItems.map((item) => (
                            <CartItem key={item.product_id} item={item} />
                        ))}
                    </div>
                </div>

                <aside className="w-full lg:w-[420px] shrink-0 lg:sticky lg:top-28">
                    <OrderSummary
                        buttonText="Proceed to Shipping"
                        onButtonClick={handleCheckout}
                    />

                    <div className="mt-6 flex items-center justify-center gap-2 text-stone-400 group cursor-pointer hover:text-stone-900 transition-colors" onClick={() => router.push('/')}>
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        <span className="text-sm font-bold">Continue Shopping</span>
                    </div>
                </aside>
            </div>
        </div>
    );
}
