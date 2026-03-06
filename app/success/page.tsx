import Link from "next/link";

export default function SuccessPage() {
    const orderNumber = Math.floor(Math.random() * 9000000) + 1000000;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 md:py-20 text-center animate-in fade-in duration-500">
            {/* Animated checkmark */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 md:mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 mb-3 md:mb-4">
                Order Placed! 🎉
            </h1>

            <p className="text-base md:text-lg text-stone-500 mb-2 max-w-sm">
                Thank you for choosing sustainable products. Your order is on its way!
            </p>

            <div className="bg-white px-5 py-3 rounded-xl border border-stone-200 shadow-sm inline-flex items-center gap-2 md:gap-3 mb-8 md:mb-10 text-stone-700 font-medium tracking-wide text-sm md:text-base mt-4">
                Order Reference: <span className="text-stone-900 font-bold bg-stone-100 px-2 py-1 rounded">#{orderNumber}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-sm">
                <Link
                    href="/profile"
                    className="flex-1 border-2 border-stone-200 hover:border-stone-400 text-stone-800 px-6 py-3 rounded-xl font-medium transition-colors text-sm text-center"
                >
                    View Orders
                </Link>
                <Link
                    href="/"
                    className="flex-1 bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm text-sm text-center"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
