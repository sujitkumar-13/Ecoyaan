"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    ExternalLink
} from "lucide-react";

export default function ProfilePage() {
    const user = getUser();
    const orders = getOrders();
    const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "settings">("overview");

    const tabs = [
        { id: "overview", label: "Overview", icon: UserIcon },
        { id: "orders", label: "My Orders", icon: Package },
        { id: "addresses", label: "Addresses", icon: MapPin },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="max-w-[1200px] mx-auto pb-8 px-4 md:px-0">
            <h1 className="text-3xl font-black text-stone-900 mb-8 tracking-tight">My Account</h1>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-72 shrink-0 bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden sticky top-28">
                    <div className="p-6 bg-stone-50/50 border-b border-stone-100 flex flex-col items-center text-center">
                        <div className="relative group mb-4">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-green-100 flex items-center justify-center">
                                {user.avatar ? (
                                    <Image src={user.avatar} alt={user.name} width={80} height={80} className="object-cover" />
                                ) : (
                                    <UserIcon className="w-8 h-8 text-green-600" />
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-stone-100 text-stone-400 hover:text-green-600 transition-colors opacity-0 group-hover:opacity-100">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="font-bold text-stone-900">{user.name}</h2>
                        <p className="text-xs text-stone-400 font-medium">Member since {user.joinedAt}</p>
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
                                    <button className="text-xs font-bold bg-stone-100 text-stone-600 px-4 py-2 rounded-xl hover:bg-stone-200 transition-colors">Edit Profile</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Full Name</label>
                                        <p className="font-bold text-stone-900">{user.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Address</label>
                                        <p className="font-bold text-stone-900">{user.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Phone Number</label>
                                        <p className="font-bold text-stone-900">{user.phone}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Date Joined</label>
                                        <p className="font-bold text-stone-900">{user.joinedAt}</p>
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
                                    <select className="bg-white border border-stone-100 rounded-xl px-4 py-2 text-sm font-bold text-stone-600 outline-none">
                                        <option>All Orders</option>
                                        <option>Past 3 Months</option>
                                        <option>2023</option>
                                    </select>
                                </div>
                            </div>

                            {orders.map((order) => (
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
                                                        <h4 className="text-sm font-bold text-stone-900 hover:text-green-600 transition-colors cursor-pointer">{item.product_name}</h4>
                                                        <p className="text-xs text-stone-400 mt-1">Qty: {item.quantity}</p>
                                                        <div className="flex gap-4 mt-3">
                                                            <button className="text-[10px] font-black uppercase tracking-widest bg-stone-900 text-white px-3 py-1.5 rounded-lg hover:bg-black transition-colors">Buy it again</button>
                                                            <button className="text-[10px] font-black uppercase tracking-widest bg-white border border-stone-100 text-stone-600 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition-colors">View item</button>
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
                                <button className="bg-stone-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-black transition-all flex items-center gap-2 shadow-xl shadow-stone-100">
                                    <Plus className="w-4 h-4" />
                                    Add New Address
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {user.addresses.map((addr) => (
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
                                            <button className="flex-1 bg-stone-50 text-stone-800 text-xs font-bold py-3 rounded-xl hover:bg-stone-100 transition-colors">Edit</button>
                                            {!addr.isDefault && <button className="flex-1 bg-white border border-stone-100 text-stone-600 text-xs font-bold py-3 rounded-xl hover:bg-stone-50 transition-colors text-red-500">Remove</button>}
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
                                            <div className="w-12 h-6 bg-green-500 rounded-full relative p-1 cursor-pointer">
                                                <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
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
                                            <div className="w-12 h-6 bg-stone-200 rounded-full relative p-1 cursor-pointer">
                                                <div className="w-4 h-4 bg-white rounded-full absolute left-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xs font-black text-stone-300 uppercase tracking-[0.2em] mb-6">Security</h3>
                                    <button className="w-full flex items-center justify-between p-4 bg-stone-50/50 rounded-2xl hover:bg-stone-50 transition-colors">
                                        <span className="font-bold text-stone-900 text-sm">Change Password</span>
                                        <ChevronRight className="w-5 h-5 text-stone-300" />
                                    </button>
                                </section>

                                <section className="pt-4 border-t border-stone-50 text-center">
                                    <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Account ID: {user.id}</p>
                                </section>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

function Plus(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
    );
}
