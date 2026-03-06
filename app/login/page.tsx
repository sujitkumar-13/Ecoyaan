"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, X, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('userEmail', formData.email);
                router.push("/profile");
            } else {
                setErrors({ server: data.error || "Invalid credentials" });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ server: "Failed to login" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=" bg-[#FDFCFB] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo & Header */}
                <div className="text-center mb-2">
                    <Link href="/" className="inline-flex items-center gap-3 group mb-8">
                        <div className="w-12 h-12 rounded-full bg-[#E5F5ED] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#008C4A] transform -rotate-12">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            </svg>
                        </div>
                        <span className="text-3xl font-black text-[#008C4A] tracking-tighter">Ecoyaan</span>
                    </Link>
                    <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-stone-400 font-medium">Please enter your details to sign in.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-stone-200/50 space-y-6">
                    {errors.server && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
                            <X className="w-4 h-4" /> {errors.server}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-stone-300 group-focus-within:text-[#008C4A] transition-colors" />
                            </div>
                            <input
                                type="email"
                                className={`w-full bg-stone-50 border border-stone-200 rounded-2xl pl-14 pr-6 py-5 text-sm text-stone-900 outline-none focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-red-500/20 border-red-500/50' : 'focus:ring-[#008C4A]/20 focus:border-[#008C4A]/50'}`}
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        {errors.email && <p className="text-[10px] font-bold text-red-500 ml-2">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Password</label>
                            <Link href="#" className="text-[10px] font-black text-[#008C4A] hover:underline uppercase tracking-widest">Forgot?</Link>
                        </div>
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#008C4A] text-white py-6 rounded-[2rem] font-black text-sm hover:bg-[#006b38] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100 uppercase tracking-widest disabled:opacity-50"
                    >
                        {isLoading ? "Signing In..." : "Sign In"} <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-xs text-stone-400 font-bold">
                            Don't have an account? <Link href="/register" className="text-[#008C4A] hover:underline">Register here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
