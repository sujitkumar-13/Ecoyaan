"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";
import { ShoppingCart, Leaf, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isLiked = isInWishlist(product.id);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLiked) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    return (
        <Link href={`/products/${product.id}`} className="bg-white rounded-2xl border border-gray-200 overflow-hidden 
                    transition-all duration-300 hover:shadow-xl group block">

            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                />

                {/* Like Button */}
                <button
                    onClick={handleLike}
                    className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all z-10 text-green-700"
                    aria-label="Like product"
                >
                    <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-green-700' : 'fill-transparent'}`} />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">

                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                        {product.name}
                    </h3>
                    <Leaf className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                </div>

                <p className="text-xs text-gray-500 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-green-700">
                        ₹{product.price}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold 
                       text-white bg-green-600 rounded-lg 
                       hover:bg-green-700 active:scale-95 
                       transition-all duration-200"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>
        </Link>
    );
}
