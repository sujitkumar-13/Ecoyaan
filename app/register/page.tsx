"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, Mail, User, MapPin, Calendar, Heart, Eye, EyeOff, Phone } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "Male",
        email: "",
        phone: "",
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
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Exactly 10 digits required";
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
        <div className="bg-[#FDFCFB] flex items-center justify-center p-4 min-h-[calc(100vh-145px)] md:min-h-[calc(100vh-96px)]">
            <div className="w-full max-w-2xl">
                {/* Logo & Header */}
                <div className="text-center mb-6 md:mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 group mb-6 md:mb-8">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E5F5ED] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#008C4A] transform -rotate-12">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            </svg>
                        </div>
                        <span className="text-2xl md:text-3xl font-black text-[#008C4A] tracking-tighter">Ecoyaan</span>
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight mb-2">Create Account</h1>
                    <p className="text-sm md:text-base text-stone-400 font-medium px-4">Join our community of eco-conscious shoppers.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-stone-200/50 space-y-6 md:space-y-8">
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
                                    className={`w-full bg-stone-50 border border-stone-200 rounded-2xl pl-14 pr-6 py-5 text-sm text-stone-900 outline-none focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-red-500/20 border-red-500/50' : 'focus:ring-[#008C4A]/20 focus:border-[#008C4A]/50'}`}
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
                                    className={`w-full bg-stone-50 border border-stone-200 rounded-2xl pl-14 pr-6 py-5 text-sm text-stone-900 outline-none focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-red-500/20 border-red-500/50' : 'focus:ring-[#008C4A]/20 focus:border-[#008C4A]/50'}`}
                                    placeholder="sujit@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            {errors.email && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.email}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Phone Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-stone-300 group-focus-within:text-[#008C4A] transition-colors" />
                                </div>
                                <input
                                    type="tel"
                                    className={`w-full bg-stone-50 border border-stone-200 rounded-2xl pl-14 pr-6 py-5 text-sm text-stone-900 outline-none focus:ring-2 transition-all ${errors.phone ? 'ring-2 ring-red-500/20 border-red-500/50' : 'focus:ring-[#008C4A]/20 focus:border-[#008C4A]/50'}`}
                                    placeholder="9876543210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                />
                            </div>
                            {errors.phone && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.phone}</p>}
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
                                    className={`w-full bg-stone-50 border border-stone-200 rounded-2xl pl-14 pr-6 py-5 text-sm text-stone-900 outline-none focus:ring-2 transition-all ${errors.age ? 'ring-2 ring-red-500/20 border-red-500/50' : 'focus:ring-[#008C4A]/20 focus:border-[#008C4A]/50'}`}
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
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Heart className="h-5 w-5 text-stone-300 group-focus-within:text-[#008C4A] transition-colors" />
                                </div>
                                <select
                                    className={`w-full bg-stone-50 border border-stone-200 rounded-2xl pl-14 pr-6 py-5 text-sm text-stone-900 outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${errors.gender ? 'ring-2 ring-red-500/20 border-red-500/50' : 'focus:ring-[#008C4A]/20 focus:border-[#008C4A]/50'}`}
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-stone-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                            {errors.gender && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.gender}</p>}
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
                                className={`w-full bg-stone-50 border border-stone-200 rounded-2xl pl-14 pr-14 py-5 text-sm text-stone-900 outline-none focus:ring-2 transition-all ${errors.password ? 'ring-2 ring-red-500/20 border-red-500/50' : 'focus:ring-[#008C4A]/20 focus:border-[#008C4A]/50'}`}
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
                                className={`w-full bg-stone-50 border border-stone-200 rounded-2xl md:rounded-[2rem] pl-14 pr-6 py-5 text-sm text-stone-900 outline-none focus:ring-2 transition-all min-h-[120px] resize-none ${errors.address ? 'ring-2 ring-red-500/20 border-red-500/50' : 'focus:ring-[#008C4A]/20 focus:border-[#008C4A]/50'}`}
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
                        className="w-full bg-[#008C4A] text-white py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-sm hover:bg-[#006b38] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100 uppercase tracking-widest disabled:opacity-50"
                    >
                        {isLoading ? "Creating Account..." : "Join Now"} <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-xs text-stone-400 font-bold">
                            Already have an account? <Link href="/login" className="text-[#008C4A] hover:underline">Sign In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
