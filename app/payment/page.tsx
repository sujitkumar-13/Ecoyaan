"use client";

import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/OrderSummary";
import { CheckoutStepper } from "@/components/CheckoutStepper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreditCard, MapPin, Truck, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentPage() {
    const { cartItems, shippingAddress, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Redirect if cart is empty or address is missing (but not after successful payment)
    useEffect(() => {
        if (isProcessing || paymentSuccess) return;
        if (cartItems.length === 0) {
            router.replace("/cart");
        } else if (!shippingAddress) {
            router.replace("/shipping");
        }
    }, [cartItems, shippingAddress, router, isProcessing, paymentSuccess]);

    if (!paymentSuccess && (cartItems.length === 0 || !shippingAddress)) return null;

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) throw new Error('Not logged in');

            // Simulate payment processing delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const orderData = {
                userEmail,
                items: cartItems,
                shippingAddress,
                total: cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0) + 50,
                status: 'Processing',
                createdAt: new Date(),
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error('Failed to save order');

            // Mark success FIRST to prevent the useEffect from redirecting to /cart
            setPaymentSuccess(true);
            // Navigate to success page, then clear the cart
            router.push("/success");
            clearCart();
        } catch (error) {
            console.error('Payment error:', error);
            setIsProcessing(false);
            alert('Failed to process payment. Please try again.');
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-0 py-6 animate-in fade-in duration-500">
            <CheckoutStepper currentStep={3} />

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
                <div className="flex-1 w-full order-2 lg:order-1 space-y-6">
                    {/* Shipping Review */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-stone-900">Shipping To</h2>
                            </div>
                            <Link href="/shipping" className="text-green-600 text-sm font-bold hover:text-green-700 hover:underline transition-colors">Change</Link>
                        </div>
                        <div className="text-stone-600 flex flex-col gap-1 pl-1">
                            {shippingAddress && <>
                                <p className="font-bold text-stone-900 text-lg">{shippingAddress.fullName}</p>
                                <p className="text-[15px]">{shippingAddress.email} &bull; {shippingAddress.phone}</p>
                                <p className="text-[15px]">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.pinCode}</p>
                            </>}
                        </div>
                    </div>

                    {/* Delivery Method (Static) */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-50">
                            <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-600">
                                <Truck className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-stone-900">Delivery Method</h2>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50/50 border border-green-100 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                                <div>
                                    <p className="font-bold text-green-900 text-sm">Carbon-Neutral Delivery</p>
                                    <p className="text-xs text-green-700">Estimated delivery: 3-5 business days</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-green-800 uppercase tracking-wider">Included</span>
                        </div>
                    </div>

                    {/* Payment Selection */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-50">
                            <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-600">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-stone-900">Payment Selection</h2>
                        </div>

                        <div className="border-2 border-green-600 bg-green-50/30 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3">
                                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-8 bg-stone-900 rounded flex items-center justify-center shrink-0">
                                    <div className="w-6 h-4 border border-stone-700 rounded-sm" />
                                </div>
                                <div>
                                    <p className="font-bold text-stone-900">Eco-Wallet / Credit Card</p>
                                    <p className="text-sm text-stone-500 mt-1 max-w-sm">
                                        This is a simulated secure transaction environment. No actual payment will be taken.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                By clicking "Pay Securely", you agree to our Terms of Service and Privacy Policy regarding sustainable commerce.
                            </p>
                        </div>
                    </div>
                </div>

                <aside className="w-full lg:w-[420px] shrink-0 order-1 lg:order-2">
                    <OrderSummary
                        buttonText="Pay Securely"
                        onButtonClick={handlePayment}
                        isLoading={isProcessing}
                    />
                </aside>
            </div>
        </div>
    );
}
