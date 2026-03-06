"use client";

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const { cartItems } = useCart();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userEmail'));

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch {
        // Products failed to load silently
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const cartCount = isLoggedIn ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleCartClick = () => {
    if (!isLoggedIn) {
      router.push('/register');
    } else {
      router.push('/cart');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative -mt-4 md:-mt-8 -mx-4 md:-mx-8 overflow-hidden bg-[#2d7a46] text-white min-h-[500px] flex items-center justify-center">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop')" }}
        />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path></svg>
            Sustainable Living Made Easy
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Shop Consciously, <br className="hidden md:block" />Live Sustainably
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl font-light">
            Discover eco-friendly products that are good for you and the planet. Every purchase makes a difference.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="#bestsellers"
              className="bg-white hover:bg-stone-100 text-green-900 px-8 py-3.5 rounded-xl font-bold transition-colors text-lg flex items-center justify-center gap-2"
            >
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
            <button
              onClick={handleCartClick}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-xl font-medium transition-colors text-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
              View Cart {cartCount > 0 ? `(${cartCount})` : ''}
            </button>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-stone-200 py-8 px-4 -mx-4 md:-mx-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">100% Sustainable</h3>
              <p className="text-sm text-stone-500 mt-1">Every product is eco-certified.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Carbon Neutral Shipping</h3>
              <p className="text-sm text-stone-500 mt-1">We offset every delivery.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Give Back</h3>
              <p className="text-sm text-stone-500 mt-1">1% of sales to environmental causes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section id="bestsellers" className="py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[40px] font-bold tracking-tight text-stone-900 sm:text-4xl" style={{ fontFamily: "Georgia, serif" }}>Our Bestsellers</h2>
            <p className="mt-4 text-base md:text-lg text-stone-500">Handpicked eco-essentials for everyday life</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              </div>
            ) : Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full flex flex-col justify-center items-center py-12 px-4 bg-white rounded-3xl border border-stone-100 shadow-sm">
                <p className="text-stone-500 font-medium mb-4">No products found or failed to load.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-sm"
                >
                  Retry Loading
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="max-w-[1100px] mx-auto bg-stone-100 rounded-3xl p-8 text-center mb-8 border border-stone-200">
        <h3 className="text-2xl font-bold text-stone-900 mb-2">Ready to check out?</h3>
        <p className="text-stone-500 mb-6">Review your items and proceed to shipping.</p>
        <button
          onClick={handleCartClick}
          className="inline-flex bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-xl transition-colors items-center gap-2"
        >
          Go to Cart {cartCount > 0 ? `(${cartCount} items)` : ''}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 19 7-7-7-7" /></svg>
        </button>
      </section>
    </div>
  );
}
