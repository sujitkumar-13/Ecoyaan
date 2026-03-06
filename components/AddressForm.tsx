"use client";

import { useState } from "react";
import { ShippingAddress } from "@/types";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Mail, User } from "lucide-react";

interface InputFieldProps {
    label: string;
    name: keyof ShippingAddress;
    type?: string;
    placeholder: string;
    icon: any;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
}

const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    icon: Icon,
    value,
    onChange,
    error,
}: InputFieldProps) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-[13px] font-bold text-stone-700 uppercase tracking-wider ml-1">
            {label}
        </label>
        <div className={`relative group transition-all duration-300 ${error ? 'ring-2 ring-red-100' : 'focus-within:ring-4 focus-within:ring-green-50'}`}>
            <div className={`absolute left-4 top-[14px] ${error ? 'text-red-400' : 'text-stone-400 group-focus-within:text-green-600'} transition-colors`}>
                <Icon className="w-5 h-5" />
            </div>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 bg-stone-50/30 text-stone-900 font-medium placeholder:text-stone-400 focus:outline-none transition-all ${error ? 'border-red-200 focus:border-red-400' : 'border-stone-100 focus:border-green-500'}`}
                placeholder={placeholder}
            />
            {error && <span className="absolute -bottom-5 left-1 text-[11px] font-bold text-red-500 italic">{error}</span>}
        </div>
    </div>
);

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

    const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target;

        if (name === 'phone') {
            // Remove any non-digit characters
            value = value.replace(/\D/g, '');
            // Enforce 10 digit limit
            if (value.length > 10) value = value.slice(0, 10);
        }

        setFormData({ ...formData, [name]: value });
        if (errors[name as keyof ShippingAddress]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            await new Promise((resolve) => setTimeout(resolve, 600));
            setShippingAddress(formData);
            router.push("/payment");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-4">
            <div className="flex flex-col gap-7">
                {/* Row 1: Full Name */}
                <div className="w-full">
                    <InputField
                        label="Full Name"
                        name="fullName"
                        icon={User}
                        placeholder="Jane Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                    />
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        icon={Mail}
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <InputField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        icon={Phone}
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                </div>

                {/* Row 3: PIN Code */}
                <div className="w-full">
                    <InputField
                        label="PIN Code"
                        name="pinCode"
                        icon={MapPin}
                        placeholder="110001"
                        value={formData.pinCode}
                        onChange={handleChange}
                        error={errors.pinCode}
                    />
                </div>

                {/* Row 4: City & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <InputField
                        label="City"
                        name="city"
                        icon={MapPin}
                        placeholder="New Delhi"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                    />
                    <InputField
                        label="State"
                        name="state"
                        icon={MapPin}
                        placeholder="Delhi"
                        value={formData.state}
                        onChange={handleChange}
                        error={errors.state}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 bg-stone-900 hover:bg-black text-white py-4 px-8 rounded-2xl font-black text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-stone-200 active:scale-[0.99] flex items-center justify-center min-h-[64px]"
            >
                {isSubmitting ? (
                    <div className="w-7 h-7 border-4 border-stone-600 border-t-white rounded-full animate-spin"></div>
                ) : (
                    "Continue to Payment"
                )}
            </button>
        </form>
    );
}
