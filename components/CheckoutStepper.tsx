"use client";

import { Check, ShoppingCart, MapPin, CreditCard } from "lucide-react";

const steps = [
    { id: 1, name: "Cart", icon: ShoppingCart },
    { id: 2, name: "Shipping", icon: MapPin },
    { id: 3, name: "Payment", icon: CreditCard },
];

export function CheckoutStepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="w-full max-w-4xl mx-auto mb-12 md:mb-16 px-4">
            <div className="relative flex justify-between items-center">
                {/* Connection Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-stone-100 -z-10" />
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-green-600 transition-all duration-700 ease-in-out -z-10"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center group">
                            <div
                                className={`
                                    w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 border-4
                                    ${isCompleted ? 'bg-green-600 border-green-600' :
                                        isActive ? 'bg-white border-green-600 shadow-xl shadow-green-100 scale-110' :
                                            'bg-white border-stone-100 text-stone-300'}
                                `}
                            >
                                {isCompleted ? (
                                    <Check className="w-6 h-6 text-white animate-in zoom-in duration-300" />
                                ) : (
                                    <step.icon className={`w-6 h-6 ${isActive ? 'text-green-600' : 'text-stone-300'}`} />
                                )}
                            </div>
                            <span className={`
                                absolute -bottom-7 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors duration-300
                                ${isActive ? 'text-stone-900' : isCompleted ? 'text-green-700' : 'text-stone-400'}
                            `}>
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
