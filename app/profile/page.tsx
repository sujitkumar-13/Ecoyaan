"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getUser, getOrders } from "@/lib/user";
import {
    User as UserIcon,
    Package,
    MapPin,
    Settings,
    ChevronRight,
    LogOut,
    Camera,
    CreditCard,
    Star,
    Bell,
    ExternalLink,
    X,
    Plus,
    Trash2,
    Edit3
} from "lucide-react";

export default function ProfilePage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userProfile, setUserProfile] = useState(getUser());
    const orders = getOrders();
    const router = useRouter();
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "settings">("overview");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(null);
    const [orderFilter, setOrderFilter] = useState("All Orders");
    const [settings, setSettings] = useState({
        pushNotifications: true,
        savePaymentMethods: false
    });
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const email = localStorage.getItem('userEmail');
            if (email) {
                try {
                    const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
                    if (response.ok) {
                        const data = await response.json();
                        // Mix with mock user to ensure we have ids and other fields not in the popup
                        setUserProfile(prev => ({
                            ...prev,
                            ...data,
                            // Ensure addresses exist if the DB user doesn't have them yet
                            addresses: data.addresses || prev.addresses
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    const filteredOrders = orders.filter(order => {
        if (orderFilter === "All Orders") return true;
        if (orderFilter === "Past 3 Months") {
            // Mock logic: Jan, Feb, Mar are "Past 3 Months" in our March 2024 context
            return order.date.includes("2024") && (order.date.includes("Jan") || order.date.includes("Feb") || order.date.includes("Mar"));
        }
        if (orderFilter === "2023") {
            return order.date.includes("2023");
        }
        return true;
    });

    const tabs = [
        { id: "overview", label: "Overview", icon: UserIcon },
        { id: "orders", label: "My Orders", icon: Package },
        { id: "addresses", label: "Addresses", icon: MapPin },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleSaveProfile = async (updatedData: { name: string; email: string; phone: string }) => {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...userProfile, ...updatedData })
            });
            if (response.ok) {
                setUserProfile(prev => ({
                    ...prev,
                    ...updatedData
                }));
                localStorage.setItem('userEmail', updatedData.email);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
        setIsEditModalOpen(false);
    };

    const handleSaveAddress = (addressData: any) => {
        if (editingAddress) {
            setUserProfile(prev => ({
                ...prev,
                addresses: prev.addresses.map(a => a.id === editingAddress.id ? { ...addressData, id: a.id } : a)
            }));
        } else {
            // Generate a string ID like "addr_N"
            const maxId = userProfile.addresses.reduce((max, addr) => {
                const num = parseInt(addr.id.split('_')[1]);
                return isNaN(num) ? max : Math.max(max, num);
            }, 0);
            const newAddress = {
                ...addressData,
                id: `addr_${maxId + 1}`,
            };
            setUserProfile(prev => ({
                ...prev,
                addresses: [...prev.addresses, newAddress]
            }));
        }
        setIsAddressModalOpen(false);
        setEditingAddress(null);
    };

    const handleRemoveAddress = (id: string) => {
        setUserProfile(prev => ({
            ...prev,
            addresses: prev.addresses.filter(a => a.id !== id)
        }));
    };

    const handleEditAddress = (address: any) => {
        setEditingAddress(address);
        setIsAddressModalOpen(true);
    };

    const handleToggleSetting = (setting: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            // In a real app, you'd upload the file to storage and get a URL
            // For now, we'll just update state. Since we can't easily save blobs to Mongo 
            // without a storage bucket, we'll just update locally.
            setUserProfile(prev => ({
                ...prev,
                avatar: imageUrl
            }));
        }
    };

    const triggerAvatarUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-[1200px] mx-auto pb-8 px-4 md:px-0 relative">
            <h1 className="text-3xl font-black text-stone-900 mb-8 tracking-tight">My Account</h1>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-72 shrink-0 bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden sticky top-28">
                    <div className="p-6 bg-stone-50/50 border-b border-stone-100 flex flex-col items-center text-center">
                        <div className="relative group mb-4">
                            <div
                                onClick={() => setIsImagePreviewOpen(true)}
                                className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-green-100 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                            >
                                {userProfile.avatar ? (
                                    <Image src={userProfile.avatar} alt={userProfile.name} width={80} height={80} className="object-cover" />
                                ) : (
                                    <UserIcon className="w-8 h-8 text-green-600" />
                                )}
                            </div>
                            <button
                                onClick={triggerAvatarUpload}
                                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-stone-100 text-stone-400 hover:text-green-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                            />
                        </div>
                        <h2 className="font-bold text-stone-900">{userProfile.name}</h2>
                        <p className="text-xs text-stone-400 font-medium">Member since {userProfile.joinedAt}</p>
                    </div>

                    <nav className="p-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all mb-1 ${activeTab === tab.id
                                    ? "bg-stone-900 text-white shadow-lg shadow-stone-200"
                                    : "text-stone-500 hover:bg-stone-50"}`}
                            >
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-green-400" : "text-stone-300"}`} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                                {tab.label}
                                {tab.id === "orders" && <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}`}>{orders.length}</span>}
                            </button>
                        ))}
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all mt-4">
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 w-full min-h-[600px]">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="w-8 h-8 border-4 border-[#008C4A] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            {/* Overview Tab */}
                            {activeTab === "overview" && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-green-50 rounded-2xl">
                                                    <Package className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-black text-stone-900">{orders.length}</p>
                                                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Total Orders</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-green-600 hover:underline flex items-center gap-1">
                                                View all orders <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-blue-50 rounded-2xl">
                                                    <Star className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-black text-stone-900">42</p>
                                                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Eco Points</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-stone-400 font-medium font-bold">18 points to next level</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-purple-50 rounded-2xl">
                                                    <CreditCard className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-black text-stone-900">₹0</p>
                                                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Wallet Balance</p>
                                                </div>
                                            </div>
                                            <button className="text-xs font-bold text-green-600 hover:underline">Add money</button>
                                        </div>
                                    </div>

                                    {/* Recent Orders Overview */}
                                    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden">
                                        <div className="px-8 py-6 border-b border-stone-50 flex items-center justify-between">
                                            <h3 className="font-black text-stone-900 text-lg">Recent Orders</h3>
                                            <button onClick={() => setActiveTab("orders")} className="text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors">See all</button>
                                        </div>
                                        <div className="divide-y divide-stone-50">
                                            {orders.slice(0, 2).map((order) => (
                                                <div key={order.id} className="p-6 hover:bg-stone-50/50 transition-colors group">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-400 group-hover:bg-white group-hover:shadow-md transition-all">
                                                                <Package className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-stone-900">Order #{order.id}</p>
                                                                <p className="text-xs text-stone-400 font-medium">{order.date} • {order.items.length} items</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <div className="text-right">
                                                                <p className="font-black text-stone-900">₹{order.total}</p>
                                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                                    }`}>
                                                                    {order.status}
                                                                </span>
                                                            </div>
                                                            <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-stone-900 transition-colors" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Personal Info Card */}
                                    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="font-black text-stone-900 text-lg">Personal Information</h3>
                                            <button
                                                onClick={() => setIsEditModalOpen(true)}
                                                className="text-xs font-bold bg-stone-100 text-stone-600 px-4 py-2 rounded-xl hover:bg-stone-200 transition-colors"
                                            >
                                                Edit Profile
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Full Name</label>
                                                <p className="font-bold text-stone-900">{userProfile.name}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Address</label>
                                                <p className="font-bold text-stone-900">{userProfile.email}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Phone Number</label>
                                                <p className="font-bold text-stone-900">{userProfile.phone}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Date Joined</label>
                                                <p className="font-bold text-stone-900">{userProfile.joinedAt}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Orders Tab */}
                            {activeTab === "orders" && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-black text-stone-900">Order History</h2>
                                        <div className="flex gap-2">
                                            <select
                                                value={orderFilter}
                                                onChange={(e) => setOrderFilter(e.target.value)}
                                                className="bg-white border border-stone-100 rounded-xl px-4 py-2 text-sm font-bold text-stone-600 outline-none cursor-pointer hover:border-green-200 transition-colors"
                                            >
                                                <option>All Orders</option>
                                                <option>Past 3 Months</option>
                                                <option>2023</option>
                                            </select>
                                        </div>
                                    </div>

                                    {filteredOrders.length === 0 ? (
                                        <div className="bg-white rounded-3xl border border-stone-100 p-12 text-center">
                                            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <Package className="w-8 h-8 text-stone-200" />
                                            </div>
                                            <p className="font-bold text-stone-400">No orders found for this period.</p>
                                        </div>
                                    ) : filteredOrders.map((order) => (
                                        <div key={order.id} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                                            <div className="p-6 border-b border-stone-50 bg-stone-50/30 flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex gap-8">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Order Placed</p>
                                                        <p className="text-sm font-bold text-stone-700">{order.date}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Total</p>
                                                        <p className="text-sm font-black text-stone-900">₹{order.total}</p>
                                                    </div>
                                                    <div className="space-y-1 hidden sm:block">
                                                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Ship To</p>
                                                        <p className="text-sm font-bold text-stone-700">{order.shippingAddress.fullName}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Order ID</p>
                                                    <p className="text-sm font-black text-stone-900 flex items-center gap-1">
                                                        #{order.id} <ExternalLink className="w-3 h-3 text-stone-300" />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                    <p className="text-sm font-black text-stone-900">{order.status}</p>
                                                </div>
                                                <div className="space-y-4">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex gap-4">
                                                            <div className="w-16 h-16 bg-stone-50 rounded-xl overflow-hidden relative shrink-0 border border-stone-100">
                                                                <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4
                                                                    onClick={() => router.push(`/products/${item.product_id}`)}
                                                                    className="text-sm font-bold text-stone-900 hover:text-green-600 transition-colors cursor-pointer"
                                                                >
                                                                    {item.product_name}
                                                                </h4>
                                                                <p className="text-xs text-stone-400 mt-1">Qty: {item.quantity}</p>
                                                                <div className="flex gap-4 mt-3">
                                                                    <button
                                                                        onClick={() => {
                                                                            addToCart({
                                                                                product_id: item.product_id,
                                                                                product_name: item.product_name,
                                                                                product_price: item.product_price,
                                                                                image: item.image,
                                                                                quantity: 1
                                                                            });
                                                                            router.push("/cart");
                                                                        }}
                                                                        className="text-[10px] font-black uppercase tracking-widest bg-stone-900 text-white px-3 py-1.5 rounded-lg hover:bg-black transition-colors"
                                                                    >
                                                                        Buy it again
                                                                    </button>
                                                                    <button
                                                                        onClick={() => router.push(`/products/${item.product_id}`)}
                                                                        className="text-[10px] font-black uppercase tracking-widest bg-white border border-stone-100 text-stone-600 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition-colors"
                                                                    >
                                                                        View item
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Addresses Tab */}
                            {activeTab === "addresses" && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-black text-stone-900">My Addresses</h2>
                                        <button
                                            onClick={() => {
                                                setEditingAddress(null);
                                                setIsAddressModalOpen(true);
                                            }}
                                            className="bg-stone-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-black transition-all flex items-center gap-2 shadow-xl shadow-stone-100"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add New Address
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {userProfile.addresses.map((addr) => (
                                            <div key={addr.id} className={`bg-white rounded-[2rem] border p-8 flex flex-col justify-between ${addr.isDefault ? 'border-green-200 shadow-lg shadow-green-50/20' : 'border-stone-100 shadow-sm'}`}>
                                                <div>
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${addr.isDefault ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>
                                                                {addr.label}
                                                            </span>
                                                            {addr.isDefault && <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">Default</span>}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors"><Settings className="w-4 h-4" /></button>
                                                        </div>
                                                    </div>
                                                    <h3 className="font-black text-stone-900 mb-2">{addr.fullName}</h3>
                                                    <div className="text-sm text-stone-500 font-medium space-y-1">
                                                        <p>{addr.city}, {addr.state}</p>
                                                        <p>{addr.pinCode}</p>
                                                        <p className="pt-2 text-stone-400">{addr.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-8 flex gap-3">
                                                    <button
                                                        onClick={() => handleEditAddress(addr)}
                                                        className="flex-1 bg-stone-50 text-stone-800 text-xs font-bold py-3 rounded-xl hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <Edit3 className="w-3 h-3" /> Edit
                                                    </button>
                                                    {!addr.isDefault && (
                                                        <button
                                                            onClick={() => handleRemoveAddress(addr.id)}
                                                            className="flex-1 bg-white border border-stone-100 text-red-500 text-xs font-bold py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                                                        >
                                                            <Trash2 className="w-3 h-3" /> Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === "settings" && (
                                <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="p-8 border-b border-stone-50">
                                        <h2 className="text-2xl font-black text-stone-900">Account Settings</h2>
                                        <p className="text-sm text-stone-400 font-medium mt-1">Manage your account preferences and security.</p>
                                    </div>
                                    <div className="p-4 sm:p-8 space-y-8">
                                        <section>
                                            <h3 className="text-xs font-black text-stone-300 uppercase tracking-[0.2em] mb-6">Preferences</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-stone-50/50 rounded-2xl">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2.5 bg-white rounded-xl shadow-sm"><Bell className="w-5 h-5 text-stone-400" /></div>
                                                        <div>
                                                            <p className="font-bold text-stone-900 text-sm">Push Notifications</p>
                                                            <p className="text-xs text-stone-400 font-medium">Receive updates about your orders and offers.</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        onClick={() => handleToggleSetting('pushNotifications')}
                                                        className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${settings.pushNotifications ? 'bg-green-500' : 'bg-stone-200'}`}
                                                    >
                                                        <div className={`w-4 h-4 bg-white rounded-full absolute transition-all ${settings.pushNotifications ? 'right-1' : 'left-1'}`}></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-stone-50/50 rounded-2xl">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2.5 bg-white rounded-xl shadow-sm"><CreditCard className="w-5 h-5 text-stone-400" /></div>
                                                        <div>
                                                            <p className="font-bold text-stone-900 text-sm">Save Payment Methods</p>
                                                            <p className="text-xs text-stone-400 font-medium">Fast checkout by saving your card details securely.</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        onClick={() => handleToggleSetting('savePaymentMethods')}
                                                        className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${settings.savePaymentMethods ? 'bg-green-500' : 'bg-stone-200'}`}
                                                    >
                                                        <div className={`w-4 h-4 bg-white rounded-full absolute transition-all ${settings.savePaymentMethods ? 'right-1' : 'left-1'}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="pt-4 border-t border-stone-50 text-center">
                                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Account ID: {userProfile.id}</p>
                                        </section>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={userProfile}
                onSave={handleSaveProfile}
            />

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => {
                    setIsAddressModalOpen(false);
                    setEditingAddress(null);
                }}
                address={editingAddress}
                onSave={handleSaveAddress}
            />

            <ImagePreviewModal
                isOpen={isImagePreviewOpen}
                onClose={() => setIsImagePreviewOpen(false)}
                imageSrc={userProfile.avatar || ""}
                userName={userProfile.name}
            />
        </div>
    );
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    onSave: (data: { name: string; email: string; phone: string }) => void;
}

function EditProfileModal({ isOpen, onClose, user, onSave }: EditProfileModalProps) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-stone-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-stone-900">Edit Profile</h2>
                        <p className="text-sm text-stone-400 font-medium">Update your personal information</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-stone-50 rounded-full text-stone-400 hover:text-stone-900 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <input
                            type="text"
                            className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="p-8 bg-stone-50/50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-4 rounded-2xl text-sm font-black text-stone-500 hover:bg-stone-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(formData)}
                        className="flex-1 px-6 py-4 rounded-2xl text-sm font-black text-white bg-stone-900 hover:bg-black shadow-xl shadow-stone-200 transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

function AddressModal({ isOpen, onClose, address, onSave }: { isOpen: boolean; onClose: () => void; address: any; onSave: (data: any) => void }) {
    const [formData, setFormData] = useState({
        label: address?.label || "Home",
        fullName: address?.fullName || "",
        phone: address?.phone || "",
        pinCode: address?.pinCode || "",
        city: address?.city || "",
        state: address?.state || "",
        isDefault: address?.isDefault || false
    });

    // Update form when address prop changes
    React.useEffect(() => {
        if (address) {
            setFormData({
                label: address.label,
                fullName: address.fullName,
                phone: address.phone,
                pinCode: address.pinCode,
                city: address.city,
                state: address.state,
                isDefault: address.isDefault
            });
        } else {
            setFormData({
                label: "Home",
                fullName: "",
                phone: "",
                pinCode: "",
                city: "",
                state: "",
                isDefault: false
            });
        }
    }, [address, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                <div className="p-8 border-b border-stone-50 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-black text-stone-900">{address ? 'Edit Address' : 'Add New Address'}</h2>
                        <p className="text-sm text-stone-400 font-medium">Provide your delivery details</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-stone-50 rounded-full text-stone-400 hover:text-stone-900 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Label</label>
                            <select
                                className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                                value={formData.label}
                                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                            >
                                <option>Home</option>
                                <option>Office</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Phone Number</label>
                            <input
                                type="text"
                                className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="+91 00000 00000"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">PIN Code</label>
                            <input
                                type="text"
                                className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="000 000"
                                value={formData.pinCode}
                                onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">City</label>
                            <input
                                type="text"
                                className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">State</label>
                            <input
                                type="text"
                                className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-stone-900 outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                                placeholder="State"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-3 p-4 bg-stone-50/50 rounded-2xl cursor-pointer hover:bg-stone-50 transition-colors">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded-lg border-stone-200 text-green-600 focus:ring-green-500"
                            checked={formData.isDefault}
                            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                        />
                        <div>
                            <p className="text-sm font-bold text-stone-900">Set as default address</p>
                            <p className="text-xs text-stone-400 font-medium">Use this address for all future orders.</p>
                        </div>
                    </label>
                </div>

                <div className="p-8 bg-stone-50/50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-4 rounded-2xl text-sm font-black text-stone-500 hover:bg-stone-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(formData)}
                        className="flex-1 px-6 py-4 rounded-2xl text-sm font-black text-white bg-stone-900 hover:bg-black shadow-xl shadow-stone-200 transition-all"
                    >
                        Save Address
                    </button>
                </div>
            </div>
        </div>
    );
}

function ImagePreviewModal({ isOpen, onClose, imageSrc, userName }: { isOpen: boolean; onClose: () => void; imageSrc: string; userName: string }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div className="relative max-w-4xl w-full flex flex-col items-center animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                >
                    <X className="w-8 h-8" />
                </button>
                <div
                    className="relative w-full aspect-square max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5"
                    onClick={(e) => e.stopPropagation()}
                >
                    {imageSrc ? (
                        <Image src={imageSrc} alt={userName} fill className="object-contain" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                            <UserIcon className="w-32 h-32 mb-4" />
                            <p className="font-bold text-lg">No Profile Photo</p>
                        </div>
                    )}
                </div>
                <div className="mt-8 text-center text-white">
                    <h3 className="text-2xl font-black">{userName}</h3>
                    <p className="text-sm text-white/50 font-medium">Profile Photo</p>
                </div>
            </div>
        </div>
    );
}
