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
        <div className="bg-white rounded-2xl overflow-hidden flex flex-col border border-stone-200 group transition-shadow hover:shadow-md">
            <div className="relative aspect-[4/5] bg-stone-50 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4 md:p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-3 mb-1.5">
                    <h3 className="font-bold text-stone-900 line-clamp-2 text-sm md:text-[15px] leading-snug">
                        {product.name}
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path></svg>
                </div>
                <p className="text-stone-500 text-xs md:text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-[#358156] text-lg">
                        ₹{product.price}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-1.5 bg-[#408C5A] hover:bg-[#347A4D] text-white px-3.5 py-1.5 rounded-lg font-medium text-sm transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
