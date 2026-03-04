"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#0A2514] text-stone-300 pt-16 pb-24 md:pb-8 w-full border-t border-green-900/50 mt-auto">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#E5F5ED] flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#008C4A] transform -rotate-12">
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-white leading-none tracking-tight">Ecoyaan</span>
                                <span className="text-[11px] font-semibold text-green-400 leading-tight pt-1">Sustainability made easy</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed text-stone-400 max-w-sm">
                            Discover eco-friendly products that are good for you and the planet. We're on a mission to make sustainable living accessible to everyone.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#008C4A] hover:text-white transition-colors duration-300"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#008C4A] hover:text-white transition-colors duration-300"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#008C4A] hover:text-white transition-colors duration-300"><Instagram size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#008C4A] hover:text-white transition-colors duration-300"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li><Link href="/" className="hover:text-[#008C4A] transition-colors">Home</Link></li>
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">Shop All Products</Link></li>
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">Sustainability Blog</Link></li>
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Customer Service</h3>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">Shipping & Delivery</Link></li>
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-[#008C4A] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Stay Connected</h3>
                        <p className="text-sm text-stone-400 mb-4">Subscribe to our newsletter to get updates on our latest offers and eco-tips.</p>
                        <form className="flex mb-6" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/10 text-white placeholder-stone-500 border border-white/20 px-4 py-2.5 rounded-l-lg w-full focus:outline-none focus:border-[#008C4A] focus:bg-white/15 transition-all text-sm"
                                required
                            />
                            <button type="submit" className="bg-[#008C4A] hover:bg-green-600 text-white px-4 py-2.5 rounded-r-lg transition-colors flex items-center justify-center">
                                <Send size={18} />
                            </button>
                        </form>
                        <div className="flex flex-col gap-3 text-sm text-stone-400 mt-6">
                            <div className="flex items-start gap-3 justify-start">
                                <MapPin size={18} className="text-[#008C4A] mt-0.5 flex-shrink-0" />
                                <span>EcoHub Building, Green Street, New Delhi, 110001, India</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-[#008C4A] flex-shrink-0" />
                                <span>+91 1800-ECO-YAAN</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-[#008C4A] flex-shrink-0" />
                                <span>hello@ecoyaan.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
                    <p>© {new Date().getFullYear()} Ecoyaan Checkout MVC. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span>Secure Checkout</span>
                        <div className="flex gap-2">
                            {/* Simulated payment icons - placeholders for standard production payment methods */}
                            <div className="w-9 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white/50">VISA</div>
                            <div className="w-9 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white/50">MC</div>
                            <div className="w-9 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white/50">AMEX</div>
                            <div className="w-9 h-6 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold text-white/50">PAYPAL</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
