"use client";

import { useCart } from "@/context/CartContext";
import { ShieldCheck, Info, ArrowRight } from "lucide-react";

export function OrderSummary({
    buttonText,
    onButtonClick,
    isDisabled = false,
    isLoading = false
}: {
    buttonText?: string;
    onButtonClick?: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
}) {
    const { subtotal, shippingFee, discountApplied, grandTotal } = useCart();

    const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    return (
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col gap-6 lg:sticky lg:top-28 overflow-hidden relative">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50 z-0" />

            <div className="relative z-10">
                <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-4 mb-4">Order Summary</h2>

                <div className="flex flex-col gap-4 text-stone-600">
                    <div className="flex justify-between items-center text-sm">
                        <span>Subtotal</span>
                        <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1.5">
                            <span>Shipping</span>
                            <Info className="w-3.5 h-3.5 text-stone-400 cursor-help" />
                        </div>
                        <span className="font-semibold text-stone-900">{formatPrice(shippingFee)}</span>
                    </div>
                    {discountApplied > 0 && (
                        <div className="flex justify-between items-center text-green-600 bg-green-50/50 px-3 py-2 rounded-lg -mx-1">
                            <span className="text-xs font-bold uppercase tracking-wider">Discount applied</span>
                            <span className="font-bold">-{formatPrice(discountApplied)}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center border-t border-stone-100 pt-5 mt-6">
                    <span className="text-lg font-bold text-stone-900">Grand Total</span>
                    <span className="text-2xl font-black text-green-700">{formatPrice(grandTotal)}</span>
                </div>

                {buttonText && onButtonClick && (
                    <button
                        onClick={onButtonClick}
                        disabled={isDisabled || isLoading}
                        className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-green-100/50 active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>{buttonText}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                )}

                <div className="mt-8 pt-6 border-t border-stone-50 flex items-center justify-center gap-3 text-stone-400 group cursor-default">
                    <ShieldCheck className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold tracking-widest uppercase">Secure Checkout</span>
                </div>
            </div>
        </div>
    );
}
