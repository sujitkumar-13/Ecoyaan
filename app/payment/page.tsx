"use client";

import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/OrderSummary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentPage() {
    const { cartItems, shippingAddress, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirect if cart is empty or address is missing
    useEffect(() => {
        if (cartItems.length === 0) {
            router.replace("/cart");
        } else if (!shippingAddress) {
            router.replace("/shipping");
        }
    }, [cartItems, shippingAddress, router]);

    if (cartItems.length === 0 || !shippingAddress) return null;

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate payment processing delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Clear cart context and move to success page
        clearCart();
        router.push("/success");
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-8 text-sm font-medium">
                <Link href="/cart" className="text-stone-500 hover:text-stone-900 transition-colors">1. Cart</Link>
                <span className="text-green-500">-----</span>
                <Link href="/shipping" className="text-stone-500 hover:text-stone-900 transition-colors">2. Shipping</Link>
                <span className="text-green-500">-----</span>
                <span className="text-stone-900 bg-stone-100 px-3 py-1 rounded-full">3. Payment</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1">
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-stone-800">Shipping Address</h2>
                            <Link href="/shipping" className="text-green-600 text-sm font-medium hover:text-green-700">Edit</Link>
                        </div>
                        <div className="text-stone-600 flex flex-col gap-1">
                            <p className="font-medium text-stone-800">{shippingAddress.fullName}</p>
                            <p>{shippingAddress.email} &bull; {shippingAddress.phone}</p>
                            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.pinCode}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100">
                        <h2 className="text-xl font-semibold text-stone-800 mb-4">Payment Method</h2>
                        <div className="border border-green-500 bg-green-50 rounded-xl p-4 flex items-start gap-3">
                            <div className="mt-1 w-4 h-4 rounded-full border-4 border-green-600 bg-white shadow-sm flex-shrink-0"></div>
                            <div>
                                <p className="font-medium text-green-900">Secure Environment</p>
                                <p className="text-sm text-green-700 mt-1">
                                    This is a mock checkout flow. Click "Pay Securely" to simulate a successful payment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-[400px]">
                    <OrderSummary
                        buttonText="Pay Securely"
                        onButtonClick={handlePayment}
                        isLoading={isProcessing}
                    />
                </div>
            </div>
        </div>
    );
}
