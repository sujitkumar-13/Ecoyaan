"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, Mail, User, MapPin, Calendar, Heart, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "Male",
        email: "",
        password: "",
        address: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.age.trim()) newErrors.age = "Age is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Min 6 characters required";
        if (!formData.address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                router.push("/login?registered=true");
            } else {
                setErrors({ server: data.error || "Registration failed" });
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ server: "Something went wrong. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-2xl">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 group mb-8">
                        <div className="w-12 h-12 rounded-full bg-[#E5F5ED] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#008C4A] transform -rotate-12">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            </svg>
                        </div>
                        <span className="text-3xl font-black text-[#008C4A] tracking-tighter">Ecoyaan</span>
                    </Link>
                    <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-2">Create Account</h1>
                    <p className="text-stone-400 font-medium">Join our community of eco-conscious shoppers.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-stone-200/50 space-y-8">
                    {errors.server && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
                            <Lock className="w-4 h-4" /> {errors.server}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-stone-300 group-focus-within:text-[#008C4A] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    className={`w-full bg-stone-50 border-none rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                                    placeholder="Sujit Kumar"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            {errors.name && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.name}</p>}
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-stone-300 group-focus-within:text-[#008C4A] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    className={`w-full bg-stone-50 border-none rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                                    placeholder="sujit@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            {errors.email && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.email}</p>}
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Age</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-stone-300 group-focus-within:text-[#008C4A] transition-colors" />
                                </div>
                                <input
                                    type="number"
                                    className={`w-full bg-stone-50 border-none rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all ${errors.age ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                                    placeholder="25"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                            {errors.age && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.age}</p>}
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Gender</label>
                            <div className="flex gap-2">
                                {["Male", "Female", "Other"].map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, gender: g })}
                                        className={`flex-1 py-5 rounded-2xl text-xs font-black transition-all ${formData.gender === g ? 'bg-[#008C4A] text-white shadow-lg shadow-green-100' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Set Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-stone-300 group-focus-within:text-[#008C4A] transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`w-full bg-stone-50 border-none rounded-2xl pl-14 pr-14 py-5 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all ${errors.password ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.password}</p>}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Address</label>
                        <div className="relative group">
                            <div className="absolute top-6 left-6 pointer-events-none">
                                <MapPin className="h-5 w-5 text-stone-300 group-focus-within:text-[#008C4A] transition-colors" />
                            </div>
                            <textarea
                                className={`w-full bg-stone-50 border-none rounded-[2rem] pl-14 pr-6 py-5 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all min-h-[120px] resize-none ${errors.address ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                                placeholder="House No, Street, City, State, PIN..."
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        {errors.address && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.address}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#008C4A] text-white py-6 rounded-[2rem] font-black text-sm hover:bg-[#006b38] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100 uppercase tracking-widest disabled:opacity-50"
                    >
                        {isLoading ? "Creating Account..." : "Join Now"} <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-xs text-stone-400 font-bold">
                            Already have an account? <Link href="/login" className="text-[#008C4A] hover:underline">Sign In</Link>
                        </p>
                    </div>
                </form>

                <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-stone-400 hover:text-stone-900 transition-colors mt-8 ml-4 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Store
                </Link>
            </div>
        </div>
    );
}
