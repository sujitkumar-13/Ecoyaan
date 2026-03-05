import React from 'react';
import { Heart, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Why Choose Ecoyaan?</h2>
                <p className="text-gray-500 mb-12">Making sustainable living accessible to everyone</p>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                    {/* Item 1 */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <Heart className="w-7 h-7 text-green-700" fill="currentColor" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Eco-Friendly Products</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                            Carefully selected sustainable items for conscious consumers
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-700">
                            {/* SVG for a plastic bottle / leaf icon from regular lucide or custom */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cup-soda"><path d="m8 10 1.619 8.095A2 2 0 0 0 11.581 20h.838a2 2 0 0 0 1.962-1.905L16 10" /><path d="M12 2v8" /><path d="M5 10h14" /><path d="M7 4h10" /><path d="M5 7h14" /></svg>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Plastic-Free</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                            Reducing plastic waste one purchase at a time
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-7 h-7 text-green-700" fill="currentColor" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">Quality Guaranteed</h3>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                            Premium products that meet our sustainability standards
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
