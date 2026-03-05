import React from "react";
import { Truck, Package, Clock } from "lucide-react";

export default function ShippingPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shipping & Delivery</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We're committed to delivering your eco-friendly essentials swiftly while maintaining our promise of carbon-neutral shipping on every single order.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-700">
                        <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Standard Delivery</h3>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                    <p className="text-xs text-gray-500 mt-2">Free on orders over ₹499</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm border-t-4 border-t-green-600">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-700">
                        <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Express Delivery</h3>
                    <p className="text-sm text-gray-600">1-2 business days</p>
                    <p className="text-xs text-gray-500 mt-2">Available in select metro cities</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-700">
                        <Package className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Sustainable Packaging</h3>
                    <p className="text-sm text-gray-600">100% plastic-free</p>
                    <p className="text-xs text-gray-500 mt-2">Compostable & recyclable materials</p>
                </div>
            </div>

            <div className="prose prose-green max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing</h2>
                <p className="mb-6">
                    Orders are processed and dispatched within 24 hours of being placed, Monday through Friday. Orders placed on weekends or public holidays will be processed on the next business day. You will receive a tracking link via email and SMS as soon as your package leaves our warehouse.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Carbon Neutral Promise</h2>
                <p className="mb-6">
                    Shipping products inevitably creates carbon emissions. However, we take full responsibility for our ecological footprint. We calculate the exact carbon footprint of delivering your package and invest in certified environmental projects—like preserving forests and building wind farms—to offset those emissions completely.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pincode Serviceability</h2>
                <p>
                    While we strive to reach every corner of India, delivery times and courier availability may vary based on your specific pincode. You can check the estimated delivery time for your location on any product page before placing an order. If your area is not serviceable by our standard courier partners, we will reach out to you to make alternative arrangements.
                </p>
            </div>
        </div>
    );
}
