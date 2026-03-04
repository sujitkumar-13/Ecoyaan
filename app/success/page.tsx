import Link from "next/link";

export default function SuccessPage() {
    const orderNumber = Math.floor(Math.random() * 9000000) + 1000000;

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
                Order Successful!
            </h1>

            <p className="text-lg text-stone-500 mb-2">
                Thank you for choosing sustainable products.
            </p>

            <div className="bg-white px-6 py-3 rounded-xl border border-stone-200 shadow-sm inline-flex items-center gap-3 mb-10 text-stone-700 font-medium tracking-wide">
                Order Reference: <span className="text-stone-900 font-bold bg-stone-100 px-2 py-1 rounded bg-stone-100">#{orderNumber}</span>
            </div>

            <Link
                href="/"
                className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm"
            >
                Continue Shopping
            </Link>
        </div>
    );
}
