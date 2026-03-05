"use client";

import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/OrderSummary";
import { CheckoutStepper } from "@/components/CheckoutStepper";
import { AddressForm } from "@/components/AddressForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";

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
        <div className="max-w-[1400px] mx-auto px-4 md:px-0 py-6 animate-in fade-in duration-500">
            <CheckoutStepper currentStep={2} />

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
                <div className="flex-1 w-full order-2 lg:order-1">
                    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-stone-50">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-stone-900">Shipping Details</h2>
                                <p className="text-sm text-stone-500">Where should we send your sustainable goods?</p>
                            </div>
                        </div>

                        <AddressForm />
                    </div>
                </div>

                <aside className="w-full lg:w-[420px] shrink-0 order-1 lg:order-2">
                    <OrderSummary />

                    <div className="mt-8 p-6 bg-green-50/50 rounded-2xl border border-green-100 border-dashed">
                        <h3 className="text-sm font-bold text-green-900 mb-2">Fast & Eco-Friendly</h3>
                        <p className="text-[13px] text-green-700 leading-relaxed">
                            We use carbon-neutral shipping methods whenever possible to minimize the footprint of your delivery.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
