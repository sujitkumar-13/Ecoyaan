"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col border border-stone-100 group">
            <div className="relative aspect-square bg-stone-50 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-stone-800 line-clamp-2 text-sm md:text-base leading-tight">
                        {product.name}
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 flex-shrink-0 mt-0.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path></svg>
                </div>
                <p className="text-stone-500 text-xs md:text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                    <span className="font-bold text-green-700 text-lg">
                        ₹{product.price}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
