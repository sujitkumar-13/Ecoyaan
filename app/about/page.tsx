import React from "react";
import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function AboutUsPage() {
    return (
        <div className="w-full bg-white">
            {/* Hero Section */}
            <section className="relative -mt-4 md:-mt-8 -mx-4 md:-mx-8 overflow-hidden bg-green-800 text-white min-h-[400px] flex items-center justify-center">
                <div
                    className="absolute inset-0 opacity-30 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop')" }}
                />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        About Ecoyaan
                    </h1>
                    <p className="text-lg md:text-xl text-green-50 max-w-2xl font-light">
                        We are a community of passionate individuals dedicted to making sustainable
                        living beautiful, accessible, and impactful for everyone.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-24 max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            At Ecoyaan, we believe that every small choice matters. Our journey began with a simple question: How can we make it easier for people to find products that are good for them and good for the planet?
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            The answer was to curate a marketplace of truly sustainable, ethically sourced, and beautifully designed products. We vet every item, brand, and ingredient through our proprietary AI framework so you can shop with confidence.
                        </p>
                        <p className="text-gray-600 leading-relaxed font-semibold text-green-700">
                            Sustainability isn't a trend; it's the future. And we are building that future together.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                            <Image
                                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
                                alt="Sustainable lifestyle"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us component */}
            <WhyChooseUs />

            {/* Join Us Section */}
            <section className="py-16 md:py-24 bg-green-50 border-t border-green-100 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the Movement</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Whether you are just starting your eco-journey or you are a seasoned sustainability advocate, there is a place for you at Ecoyaan. Explore our carefully curated collections and be a part of the positive change.
                    </p>
                    <a href="/" className="inline-flex bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-xl transition-colors">
                        Explore Shop
                    </a>
                </div>
            </section>
        </div>
    );
}
