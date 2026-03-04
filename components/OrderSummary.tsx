"use client";

import { useCart } from "@/context/CartContext";

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

    const formatPrice = (price: number) => `₹${price.toFixed(2)}`;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-4 sticky top-24">
            <h2 className="text-xl font-semibold text-stone-800 border-b border-stone-100 pb-4">Order Summary</h2>

            <div className="flex flex-col gap-3 text-stone-600">
                <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-medium text-stone-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="font-medium text-stone-800">{formatPrice(shippingFee)}</span>
                </div>
                {discountApplied > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-{formatPrice(discountApplied)}</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center border-t border-stone-100 pt-4 mt-2">
                <span className="text-lg font-semibold text-stone-800">Grand Total</span>
                <span className="text-2xl font-bold text-green-700">{formatPrice(grandTotal)}</span>
            </div>

            {buttonText && onButtonClick && (
                <button
                    onClick={onButtonClick}
                    disabled={isDisabled || isLoading}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[52px]"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        buttonText
                    )}
                </button>
            )}
        </div>
    );
}
