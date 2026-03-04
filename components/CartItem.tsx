"use client";

import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/types";
import Image from "next/image";

export function CartItem({ item }: { item: CartItemType }) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="flex gap-4 sm:gap-6 py-6 border-b border-stone-100">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                    src={item.image}
                    alt={item.product_name}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex flex-col justify-between flex-grow">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h3 className="font-semibold text-stone-800 line-clamp-2">{item.product_name}</h3>
                        <p className="text-green-700 font-medium mt-1">₹{item.product_price.toFixed(2)}</p>
                    </div>
                    <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                </div>

                <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-white">
                        <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="px-3 py-1 text-stone-600 hover:bg-stone-50 rounded-l-lg transition-colors border-r border-stone-200"
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-stone-800">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="px-3 py-1 text-stone-600 hover:bg-stone-50 rounded-r-lg transition-colors border-l border-stone-200"
                        >
                            +
                        </button>
                    </div>
                    <div className="text-sm font-medium text-stone-800 ml-auto">
                        ₹{(item.product_price * item.quantity).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
