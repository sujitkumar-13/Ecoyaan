"use client";

import { useState } from "react";
import { ShippingAddress } from "@/types";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export function AddressForm() {
    const { setShippingAddress, shippingAddress } = useCart();
    const router = useRouter();

    const [formData, setFormData] = useState<ShippingAddress>({
        fullName: shippingAddress?.fullName || "",
        email: shippingAddress?.email || "",
        phone: shippingAddress?.phone || "",
        pinCode: shippingAddress?.pinCode || "",
        city: shippingAddress?.city || "",
        state: shippingAddress?.state || "",
    });

    const [errors, setErrors] = useState<Partial<ShippingAddress>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: Partial<ShippingAddress> = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Valid Email is required";
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone Number must be exactly 10 digits";
        }
        if (!formData.pinCode.trim()) newErrors.pinCode = "PIN Code is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error for field on change
        if (errors[e.target.name as keyof ShippingAddress]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            // Simulate brief network delay
            await new Promise((resolve) => setTimeout(resolve, 400));
            setShippingAddress(formData);
            router.push("/payment");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-stone-800 border-b border-stone-100 pb-2">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-stone-700">Full Name *</label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow ${errors.fullName ? 'border-red-500' : 'border-stone-300'}`}
                        placeholder="John Doe"
                    />
                    {errors.fullName && <span className="text-red-500 text-xs font-medium">{errors.fullName}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-stone-700">Email Address *</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow ${errors.email ? 'border-red-500' : 'border-stone-300'}`}
                        placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs font-medium">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="text-sm font-medium text-stone-700">Phone Number *</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow ${errors.phone ? 'border-red-500' : 'border-stone-300'}`}
                        placeholder="9876543210"
                    />
                    {errors.phone && <span className="text-red-500 text-xs font-medium">{errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                    <label htmlFor="pinCode" className="text-sm font-medium text-stone-700">PIN Code *</label>
                    <input
                        id="pinCode"
                        name="pinCode"
                        type="text"
                        value={formData.pinCode}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow ${errors.pinCode ? 'border-red-500' : 'border-stone-300'}`}
                        placeholder="110001"
                    />
                    {errors.pinCode && <span className="text-red-500 text-xs font-medium">{errors.pinCode}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="city" className="text-sm font-medium text-stone-700">City *</label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow ${errors.city ? 'border-red-500' : 'border-stone-300'}`}
                        placeholder="New Delhi"
                    />
                    {errors.city && <span className="text-red-500 text-xs font-medium">{errors.city}</span>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="state" className="text-sm font-medium text-stone-700">State *</label>
                    <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow ${errors.state ? 'border-red-500' : 'border-stone-300'}`}
                        placeholder="Delhi"
                    />
                    {errors.state && <span className="text-red-500 text-xs font-medium">{errors.state}</span>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-stone-900 hover:bg-stone-800 text-white py-3 px-6 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[52px]"
            >
                {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    "Continue to Payment"
                )}
            </button>
        </form>
    );
}
