"use client";

import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/CartItem";
import { OrderSummary } from "@/components/OrderSummary";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
    const { cartItems } = useCart();
    const router = useRouter();

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-stone-800 mb-2">Your cart is empty</h2>
                <p className="text-stone-500 mb-8 max-w-md">
                    Looks like you haven't added any sustainable products to your cart yet.
                </p>
                <Link
                    href="/"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
                >
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-8 text-sm font-medium">
                <span className="text-stone-900 bg-stone-100 px-3 py-1 rounded-full">1. Cart</span>
                <span className="text-stone-300">-----</span>
                <span className="text-stone-400">2. Shipping</span>
                <span className="text-stone-300">-----</span>
                <span className="text-stone-400">3. Payment</span>
            </div>

            <h1 className="text-3xl font-bold text-stone-900 mb-8 tracking-tight">Your Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
                        <div className="flex flex-col">
                            {cartItems.map((item) => (
                                <CartItem key={item.product_id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:w-[400px]">
                    <OrderSummary
                        buttonText="Proceed to Checkout"
                        onButtonClick={() => router.push("/shipping")}
                    />
                </div>
            </div>
        </div>
    );
}
