import React from "react";
import { RefreshCcw, ShieldCheck, Mail } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We want you to love your sustainable swaps. If something isn't right, our hassle-free returns policy ensures you can shop with confidence.
                </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    <div className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-700">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">7-Day Guarantee</h3>
                        <p className="text-sm text-gray-500">Return most items within 7 days of delivery for a full refund.</p>
                    </div>
                    <div className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-700">
                            <RefreshCcw className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Easy Exchanges</h3>
                        <p className="text-sm text-gray-500">Wrong size or damaged? We'll replace it quickly and at no extra cost.</p>
                    </div>
                    <div className="p-8 text-center">
                        <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-700">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Dedicated Support</h3>
                        <p className="text-sm text-gray-500">Our customer care team is always here to help you through the process.</p>
                    </div>
                </div>
            </div>

            <div className="prose prose-green max-w-none text-gray-600">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Initiate a Return</h2>
                <ol className="list-decimal list-inside space-y-3 mb-8">
                    <li>Log into your Ecoyaan account and navigate to "My Orders".</li>
                    <li>Select the order containing the item you wish to return.</li>
                    <li>Click on "Initiate Return" and select the reason from the dropdown menu.</li>
                    <li>Wait for our delivery partner to pick up the item within 48-72 hours.</li>
                </ol>

                <h2 className="text-xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
                <p className="mb-6">
                    For hygiene and safety reasons, certain items are strictly non-returnable unless they arrive damaged or defective. These include:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-8 text-sm bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <li>Personal care items (e.g., bamboo toothbrushes, natural deodorants, menstrual cups).</li>
                    <li>Intimate apparel and undergarments.</li>
                    <li>Opened food or perishable items.</li>
                    <li>Customized or personalized products.</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 mb-4">Refund Process</h2>
                <p>
                    Once we receive your returned item at our warehouse, it undergoes a quick quality check. If approved, your refund will be initiated immediately. Please allow 5-7 business days for the amount to reflect in your original payment method. If you opted for Cash on Delivery (COD), we will send you a link to securely enter your bank details for a direct transfer.
                </p>
            </div>
        </div>
    );
}
