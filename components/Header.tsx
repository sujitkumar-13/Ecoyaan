"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Search, Heart, ShoppingCart, User, MapPin, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileFormData, setProfileFormData] = useState({
        name: "",
        age: "",
        address: "",
        email: "",
        gender: ""
    });

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlistItems.length;

    const isCheckoutPage = ["/cart", "/wishlist", "/shipping", "/payment", "/success", "/profile"].includes(pathname);

    const MENU_DATA: Record<string, { columns: { title: string, links?: string[] }[], width: string, gridClass: string }> = {
        "Beauty & Personal Care": {
            columns: [
                { title: "Hair Care", links: ["Shampoo", "Combs", "Hair Oil", "Hair Color", "Conditioner"] },
                { title: "Skin Care", links: ["Rollers", "Scrub", "Moisturizer", "Face Pack", "Body Cream", "Face Wash"] },
                { title: "Bath & Body", links: ["Body Oils", "Body Wash", "Deodorant", "Accessories", "Hand Wash", "Soaps"] },
                { title: "Hygiene", links: ["Pain Relief", "Grooming", "Intimate Wash", "Foot Care"] },
                { title: "Oral Care", links: ["Tooth Brush", "Mouth Wash", "Oral Set", "Whitening", "Tongue Cleaner"] },
            ],
            width: "680px",
            gridClass: "grid-cols-5"
        },
        "Kitchen & Home Care": {
            columns: [
                { title: "Kitchen", links: ["Coasters", "Utensils", "Straws", "Cutting Board", "Bottles", "Storage", "Dishwash"] },
                { title: "Home", links: ["Desk Acc.", "Reusable Bags", "Candles", "Baskets", "Fragrances", "Lamps"] },
                { title: "Cleaning", links: ["Floor Cleaner", "Soap Dishes", "Garbage Bags", "Detergent", "Brushes"] },
            ],
            width: "420px",
            gridClass: "grid-cols-3"
        },
        "Bags & Accessories": {
            columns: [
                { title: "Acc.", links: ["Stationery", "Buntings"] },
                { title: "Bags", links: ["Handbags", "Tote Bags", "Sling Bags", "Laptop Bag"] },
                { title: "Wellness", links: ["Yoga Mats", "Yoga Acc."] },
            ],
            width: "380px",
            gridClass: "grid-cols-3"
        },
        "Food & Beverages": {
            columns: [
                { title: "Beverages", links: ["Coffee", "Tea", "Beverage Delights"] },
                { title: "Foods", links: ["Chocolates", "Baked Goods", "Grains & Flours", "Snacks", "Oils & Ghee"] },
            ],
            width: "250px",
            gridClass: "grid-cols-2"
        },
        "Gifts & Festivals": {
            columns: [
                { title: "Cultural", links: ["Holi", "Raksha Bandhan", "Christmas", "Diwali"] },
                { title: "Gifts", links: ["Personalized", "Hampers", "Eco-friendly", "Corporate"] },
            ],
            width: "250px",
            gridClass: "grid-cols-2"
        },
        "Mom & Baby": {
            columns: [
                { title: "Fashion", links: ["Baby Clothes", "Maternity"] },
                { title: "Nursery", links: ["Swaddles", "Bedding", "Toys"] },
                { title: "Care", links: ["Diapers", "Baby Food", "Skin Care"] },
            ],
            width: "420px",
            gridClass: "grid-cols-3"
        },
    };

    return (
        <header className="w-full bg-white relative">
            {/* Spacer for fixed header */}
            <div className="h-[145px] md:h-[96px]" />
            {/* Fixed Top Bar (Logo, Search, Icons) */}
            <div className="fixed top-0 left-0 right-0 bg-white py-4 md:py-5 px-4 md:px-8 z-50 w-full shadow-sm">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-5 md:gap-10">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E5F5ED] flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#008C4A] transform -rotate-12">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-bold text-[#008C4A] leading-none tracking-tight">Ecoyaan</span>
                            <span className="text-[11px] md:text-[13px] font-semibold text-[#008C4A] leading-tight pt-1">Sustainability made easy</span>
                        </div>
                    </Link>

                    {/* Location Section */}
                    <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#008C4A]" />
                        <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-gray-800 leading-tight">New Delhi, 110001</span>
                            <span className="text-[12px] font-medium text-[#7D5A9C] cursor-pointer hover:underline pt-0.5">Update Location</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-grow hidden md:block max-w-[700px] w-full">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-[#008C4A] opacity-90" strokeWidth={2.5} />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-5 py-[12px] border-[1.5px] border-[#A3D9B1] rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#008C4A] focus:border-[#008C4A] text-[16px] transition-colors text-gray-700 shadow-sm"
                                placeholder="Search for 'Garbage Bags'"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6 lg:gap-10 flex-shrink-0">
                        <div
                            onClick={() => setIsProfileModalOpen(true)}
                            className="hidden md:flex items-center gap-3 cursor-pointer group hover:text-[#006b38] transition-colors"
                        >
                            <User className="w-7 h-7 text-[#008C4A]" />
                        </div>

                        <Link href="/wishlist" className="relative text-[#008C4A] hover:text-[#006b38]">
                            <Heart className="w-7 h-7" strokeWidth={2.5} />
                            {wishlistCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#008C4A] text-white text-[11px] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-white -translate-y-2.5 translate-x-2.5">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/cart" className="relative text-[#008C4A] hover:text-[#006b38] hidden md:flex">
                            <ShoppingCart className="w-7 h-7" strokeWidth={2.5} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#008C4A] text-white text-[11px] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-white -translate-y-2.5 translate-x-2.5">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden mt-4 w-full px-2">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-[18px] w-[18px] text-[#008C4A] opacity-90" strokeWidth={2.5} />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-3 border-[1.5px] border-[#A3D9B1] rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#008C4A] focus:border-[#008C4A] text-[15px] transition-colors text-gray-700 shadow-sm"
                            placeholder="Search for 'Garbage Bags'"
                        />
                    </div>
                </div>
            </div>

            {/* Non-Sticky Categories Navigation Bar */}
            {!isCheckoutPage && (
                <div
                    className="w-full border-t border-gray-100 py-4 lg:overflow-visible overflow-x-auto no-scrollbar relative z-40 bg-white"
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <div className="max-w-[1400px] mx-auto flex items-center lg:overflow-visible gap-6 md:gap-8 whitespace-nowrap text-[13px] md:text-[14px] font-semibold text-gray-800 px-1 relative">
                        <button className="flex items-center gap-2 hover:text-[#008C4A] transition-colors group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 group-hover:text-[#008C4A]"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                            <span>All</span>
                        </button>

                        {[
                            "Beauty & Personal Care",
                            "Kitchen & Home Care",
                            "Bags & Accessories",
                            "Food & Beverages",
                            "Gifts & Festivals",
                            "Mom & Baby",
                        ].map((item) => (
                            <div
                                key={item}
                                className="relative h-full flex items-center"
                                onMouseEnter={() => MENU_DATA[item] && setActiveDropdown(item)}
                            >
                                <Link href="#" className={`flex items-center gap-1 transition-colors group py-1 ${activeDropdown === item ? 'text-[#008C4A]' : 'hover:text-[#008C4A]'}`}>
                                    <span>{item}</span>
                                    {MENU_DATA[item] && MENU_DATA[item].columns.length > 0 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 transition-colors ${activeDropdown === item ? 'text-[#008C4A]' : 'text-gray-400 group-hover:text-[#008C4A]'}`}><path d="m6 9 6 6 6-6" /></svg>
                                    )}
                                </Link>

                                {/* Mega Menu Dropdown */}
                                {activeDropdown === item && MENU_DATA[item] && MENU_DATA[item].columns.length > 0 && (
                                    <div
                                        className={`absolute top-[calc(100%-4px)] ${item === "Beauty & Personal Care" || item === "Kitchen & Home Care" ? 'left-0' :
                                            'right-0 lg:left-1/2 lg:-translate-x-1/2'
                                            } bg-white shadow-2xl border border-gray-100 rounded-b-xl p-5 z-[60] grid ${MENU_DATA[item].gridClass} gap-8 cursor-default`}
                                        style={{ width: MENU_DATA[item].width }}
                                    >
                                        {MENU_DATA[item].columns.map((col, idx) => (
                                            <div key={idx} className="flex flex-col gap-3">
                                                <h4 className="text-[#008C4A] font-bold text-[13px]">{col.title}</h4>
                                                {col.links && (
                                                    <div className="flex flex-col gap-2.5 text-[12px] text-gray-700 font-medium whitespace-nowrap">
                                                        {col.links.map((link) => (
                                                            <Link key={link} href="#" className="hover:text-[#008C4A] transition-colors">{link}</Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ProfileDetailsModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                formData={profileFormData}
                setFormData={setProfileFormData}
                onSubmit={async () => {
                    try {
                        const response = await fetch('/api/user', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(profileFormData)
                        });
                        const data = await response.json();
                        if (data.success) {
                            localStorage.setItem('userEmail', profileFormData.email);
                            setIsProfileModalOpen(false);
                            router.push("/profile");
                        } else {
                            alert('Failed to save user details');
                        }
                    } catch (error) {
                        console.error('Error saving user:', error);
                        alert('Something went wrong');
                    }
                }}
            />
        </header>
    );
}


function ProfileDetailsModal({
    isOpen,
    onClose,
    formData,
    setFormData,
    onSubmit
}: {
    isOpen: boolean;
    onClose: () => void;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: () => void;
}) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Full name is required";
        else if (formData.name.trim().length < 2) newErrors.name = "Name is too short";

        if (!formData.age) newErrors.age = "Age is required";
        else if (parseInt(formData.age) <= 0) newErrors.age = "Invalid age";

        if (!formData.gender) newErrors.gender = "Gender is required";

        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";

        if (!formData.address.trim()) newErrors.address = "Address is required";
        else if (formData.address.trim().length < 10) newErrors.address = "Please enter full address";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = () => {
        if (validate()) {
            onSubmit();
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 pb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-stone-900 tracking-tight">Profile Details</h3>
                        <p className="text-sm text-stone-400 font-medium">Please enter your information to proceed.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 pt-4 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                            type="text"
                            className={`w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                            placeholder="Sujit Kumar"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        {errors.name && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Age</label>
                            <input
                                type="number"
                                className={`w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all ${errors.age ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                                placeholder="24"
                                value={formData.age}
                                onChange={(e) => handleInputChange('age', e.target.value)}
                            />
                            {errors.age && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{errors.age}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Gender</label>
                            <select
                                className={`w-full bg-stone-50 border-none rounded-2xl px-6 py-[18px] text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${errors.gender ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                                value={formData.gender}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                            >
                                <option value="" disabled>Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{errors.gender}</p>}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            className={`w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                            placeholder="sujit@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        {errors.email && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Address</label>
                        <textarea
                            className={`w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 transition-all min-h-[100px] resize-none ${errors.address ? 'ring-2 ring-red-500/20' : 'focus:ring-[#008C4A]/20'}`}
                            placeholder="Enter your full address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                        {errors.address && <p className="text-[10px] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{errors.address}</p>}
                    </div>
                </div>

                <div className="p-8 bg-stone-50/50">
                    <button
                        onClick={handleFormSubmit}
                        className="w-full bg-[#008C4A] text-white py-5 rounded-[1.5rem] font-black text-sm hover:bg-[#006b38] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100 uppercase tracking-widest"
                    >
                        Continue to Profile <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
