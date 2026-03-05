"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, Plus, Minus } from "lucide-react";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Are all your products 100% sustainable?",
            answer: "We strive to offer products that have a significantly lower environmental impact than conventional alternatives. Every product goes through our proprietary AI vetting engine, Ecoverify™, to ensure claims like 'plastic-free', 'biodegradable', and 'ethically sourced' hold true."
        },
        {
            question: "How do you ensure carbon-neutral shipping?",
            answer: "We carefully calculate the carbon emissions generated from transporting each order from our warehouse to your doorstep. We then offset 100% of these emissions by investing in verified environmental projects, such as reforestation and renewable energy initiatives."
        },
        {
            question: "Can I recycle your packaging?",
            answer: "Yes! A core part of our mission is minimizing waste. Our shipping boxes, tape, and internal padding are made from recycled materials and are 100% recyclable or compostable. Please check your local recycling guidelines."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we only ship within India. We are working hard to expand our logistics networks sustainably so we can offer international shipping in the near future."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is dispatched, you will receive an email and an SMS with a tracking link. You can also track the status directly from your Ecoyaan account dashboard."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex flex-col items-center text-center mb-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-700">
                    <HelpCircle className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                <p className="text-gray-600 max-w-2xl">
                    Got questions? We have answers. Learn more about our products, shipping, sustainability practices, and more below.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300">
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full text-left p-6 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                        >
                            <h3 className={`text-lg font-bold transition-colors md:pr-8 ${openIndex === index ? 'text-green-700' : 'text-gray-900'}`}>
                                {faq.question}
                            </h3>
                            <div className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${openIndex === index ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                            </div>
                        </button>
                        <div
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center border border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Still have questions?</h3>
                <p className="text-gray-600 mb-6">Our dedicated support team is here to help you with anything you need.</p>
                <Link href="#" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-700 hover:bg-green-800 transition-colors">
                    Contact Us
                </Link>
            </div>
        </div>
    );
}
