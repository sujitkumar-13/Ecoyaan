"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import {
    ChevronRight, Share2, Heart, Leaf, Recycle, MapPin,
    Minus, Plus, ShoppingBag, ShieldCheck, ChevronDown, ChevronUp, Star,
    X, Camera
} from "lucide-react";
import { Product } from "@/types";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = getProductById(Number(id));
    const { addToCart } = useCart();

    const [mainImage, setMainImage] = useState(product?.image || "");
    const [quantity, setQuantity] = useState(1);
    const [openAccordions, setOpenAccordions] = useState<string[]>(["why-loves-it"]);
    const [pincode, setPincode] = useState("");
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewComment, setReviewComment] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    if (!product) {
        return (
            <div className="max-w-[1400px] mx-auto min-h-[50vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link href="/" className="text-green-600 hover:underline">Return to Home</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            image: product.image,
            quantity: quantity,
        });
    };

    const discountPercentage = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    const toggleAccordion = (name: string) => {
        setOpenAccordions(prev =>
            prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
        );
    };

    const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedImages(prev => [...prev, ...filesArray]);

            const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => {
            const newUrls = prev.filter((_, i) => i !== index);
            URL.revokeObjectURL(prev[index]); // Free memory
            return newUrls;
        });
    };

    const handleCloseModal = () => {
        setIsReviewModalOpen(false);
        setRating(0);
        setReviewTitle("");
        setReviewComment("");
        setSelectedImages([]);
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        setPreviewUrls([]);
    };

    return (
        <div className="max-w-[1400px] mx-auto py-4 md:py-8 space-y-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-xs text-green-700 font-medium whitespace-nowrap overflow-x-auto pb-2">
                <Link href="/" className="hover:underline">Home</Link>
                <ChevronRight className="w-3 h-3 mx-1 flex-shrink-0 text-gray-400" />
                {product.categoryPath ? (
                    product.categoryPath.map((cat, index) => (
                        <React.Fragment key={index}>
                            <Link href="#" className="hover:underline">{cat}</Link>
                            {index !== product.categoryPath!.length - 1 && (
                                <ChevronRight className="w-3 h-3 mx-1 flex-shrink-0 text-gray-400" />
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    <span>{product.name}</span>
                )}
            </nav>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* Left: Image Gallery */}
                <div className="w-full lg:w-1/2 flex gap-4 h-[400px] md:h-[600px] sticky top-28 z-10">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar py-1 shrink-0 w-[60px] md:w-[80px]">
                        {product.images?.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${mainImage === img ? 'border-green-600' : 'border-transparent hover:border-green-300'}`}
                            >
                                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="relative flex-grow rounded-2xl border border-gray-200 overflow-hidden bg-white">
                        <Image src={mainImage} alt={product.name} fill className="object-contain p-4" priority />
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="w-full lg:w-1/2 flex flex-col">

                    {/* Header: Title & Actions */}
                    <div className="flex justify-between items-start gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex gap-3 text-gray-500 shrink-0">
                            <button className="hover:text-green-600 transition-colors hidden md:block"><Share2 className="w-5 h-5" /></button>
                            <button className="hover:text-red-500 transition-colors"><Heart className="w-5 h-5" /></button>
                        </div>
                    </div>

                    {/* Sustainability Badges */}
                    <div className="mt-4 bg-[#F2FCF6] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border border-green-50 mb-4">
                        <div className="relative w-[60px] h-[60px] flex items-center justify-center shrink-0">
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <path className="text-green-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="100, 100" />
                                <path className="text-green-600" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="89, 100" />
                            </svg>
                            <div className="flex flex-col items-center leading-none">
                                <span className="text-sm font-bold text-green-800">89%</span>
                                <span className="text-[9px] text-green-700">Eco Score</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">Sustainability Badges</h3>
                            <p className="text-xs text-gray-500 mb-3">AI-verified product claims</p>
                            <div className="flex flex-wrap gap-2">
                                {product.badges?.map((badge, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-green-200 rounded-full text-xs font-medium text-green-800 shadow-sm">
                                        <Leaf className="w-3 h-3 text-green-600" />
                                        {badge}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Ecoverify Banner */}
                    <div className="bg-[#FFF8E7] rounded-lg p-4 border-l-4 border-yellow-400 mb-6 flex gap-3 items-start">
                        <div className="p-1.5 bg-yellow-100 rounded-md shrink-0 mt-1">
                            <ShieldCheck className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">Vetted by Ecoverify™ - Ecoyaan's Proprietary AI Vetting Tool</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                This product has been evaluated through Ecoverify — our AI system that analyses ingredients, packaging, certifications, impact metrics, and supply chain information using Ecoyaan's in-house framework developed in alignment with global sustainability standards to ensure each claim is credible and trustworthy.
                            </p>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-end gap-3 mb-1">
                        <span className="text-sm text-gray-500 mb-1">M.R.P</span>
                        <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                        {product.oldPrice && (
                            <>
                                <span className="text-sm text-gray-400 line-through mb-1">₹{product.oldPrice}</span>
                                <span className="text-sm font-semibold text-red-600 mb-1">{discountPercentage}% off</span>
                            </>
                        )}
                    </div>
                    <p className="text-[11px] text-gray-500 mb-6">Inclusive of all taxes</p>

                    {/* Actions & Quantity */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 w-full">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className="text-sm text-gray-600 whitespace-nowrap">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shrink-0">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100 transition-colors"><Minus className="w-4 h-4 text-gray-600" /></button>
                                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100 transition-colors"><Plus className="w-4 h-4 text-gray-600" /></button>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto flex-grow">
                            <button onClick={handleAddToCart} className="flex-1 flex justify-center items-center gap-2 py-2.5 px-4 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm">
                                <ShoppingBag className="w-4 h-4" />
                                Add to Bag
                            </button>
                            <button onClick={handleAddToCart} className="flex-1 flex justify-center items-center py-2.5 px-4 bg-[#008C4A] text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Delivery Estimation */}
                    <div className="border-t border-gray-200 pt-6 mb-8">
                        <h4 className="text-sm font-bold text-gray-900 mb-3">Get Delivery Estimation:</h4>
                        <div className="flex items-center gap-2 text-sm text-green-700 font-medium bg-green-50 py-2 px-3 rounded inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" /><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
                            Arrives by Mar 7
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="space-y-4">
                        {/* Why Ecoyaan Loves It */}
                        {product.description && (
                            <div className="border border-green-200 rounded-lg overflow-hidden bg-white">
                                <button
                                    onClick={() => toggleAccordion('about-product')}
                                    className="flex items-center justify-between w-full p-4 bg-green-50/50 hover:bg-green-50 transition-colors text-left"
                                >
                                    <span className="font-bold text-green-800 text-sm">About This Product</span>
                                    {openAccordions.includes('about-product') ? <Minus className="w-5 h-5 text-green-700" /> : <Plus className="w-5 h-5 text-green-700" />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openAccordions.includes('about-product') ? 'max-h-[500px]' : 'max-h-0'}`}>
                                    <div className="p-4 bg-white border-t border-green-100 text-sm text-gray-600">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li className="text-xs leading-relaxed"><span className="font-semibold text-gray-800">Description:</span> {product.description}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ingredients */}
                        <div className="border border-green-200 rounded-lg overflow-hidden bg-white">
                            <button
                                onClick={() => toggleAccordion('ingredients')}
                                className="flex items-center justify-between w-full p-4 bg-green-50/50 hover:bg-green-50 transition-colors text-left"
                            >
                                <span className="font-bold text-green-800 text-sm">Ingredients</span>
                                {openAccordions.includes('ingredients') ? <Minus className="w-5 h-5 text-green-700" /> : <Plus className="w-5 h-5 text-green-700" />}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openAccordions.includes('ingredients') ? 'max-h-[500px]' : 'max-h-0'}`}>
                                <div className="p-4 bg-white border-t border-green-100 text-sm text-gray-600">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li className="text-xs leading-relaxed"><span className="font-semibold text-gray-800">Ingredients:</span> Made carefully with nature in mind. Specific composition details are available on the product packaging.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Return Policy */}
                        <div className="border border-green-200 rounded-lg overflow-hidden bg-white">
                            <button
                                onClick={() => toggleAccordion('return-policy')}
                                className="flex items-center justify-between w-full p-4 bg-green-50/50 hover:bg-green-50 transition-colors text-left"
                            >
                                <span className="font-bold text-green-800 text-sm">Return Policy</span>
                                {openAccordions.includes('return-policy') ? <Minus className="w-5 h-5 text-green-700" /> : <Plus className="w-5 h-5 text-green-700" />}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openAccordions.includes('return-policy') ? 'max-h-[500px]' : 'max-h-0'}`}>
                                <div className="p-4 bg-white border-t border-green-100 text-sm text-gray-600">
                                    <ul className="list-disc list-inside space-y-1 text-gray-500">
                                        <li className="text-xs leading-relaxed">Product not returnable.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Section: About this item */}
            <div className="pt-12 mt-12 mb-8">
                <h2 className="text-xl font-bold text-[#1a3b2b] mb-6">About this item</h2>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {product.attributes ? (
                        Object.entries(product.attributes).map(([key, value], index) => (
                            <div key={key} className={`flex text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-[#fcfdfc]'} px-6 py-4`}>
                                <div className="w-1/3 text-gray-600 font-medium">{key}</div>
                                <div className="w-2/3 text-gray-800">{value}</div>
                            </div>
                        ))
                    ) : (
                        <div className="p-6 text-sm text-gray-500">No additional attributes available.</div>
                    )}
                </div>
            </div>

            {/* Bottom Section: Ratings and Reviews */}
            <div className="py-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Left: Rating Breakdown */}
                    <div className="w-full md:w-1/3 shrink-0">
                        <button
                            onClick={() => setIsReviewModalOpen(true)}
                            className="w-full md:w-auto px-6 py-2 border border-green-600 text-green-700 rounded-lg font-medium text-sm hover:bg-green-50 mb-8 transition-colors"
                        >
                            Write a Review
                        </button>

                        <h3 className="font-bold text-[#1a3b2b] mb-4 text-[15px]">Rating Breakdown</h3>

                        <div className="space-y-2 mb-6 text-sm">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="w-12 text-gray-600 text-xs">{star} star</span>
                                    <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${star === 5 ? 'bg-green-600' : 'bg-transparent'}`}
                                            style={{ width: star === 5 ? '100%' : '0%' }}
                                        />
                                    </div>
                                    <span className="w-10 text-right text-gray-500 text-xs">{star === 5 ? '100%' : '0%'}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500">1 global ratings</p>
                    </div>

                    {/* Right: Individual Reviews */}
                    <div className="w-full md:w-2/3">
                        <div className="border border-green-50 rounded-2xl p-6 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
                                    <UserIcon />
                                </div>
                                <div>
                                    <span className="font-bold text-gray-900 block text-sm">Sss</span>
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-green-600">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                        </div>
                                        <span className="text-[10px] text-gray-400">5/28/2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Write a Review</h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            {/* Product Info Mini */}
                            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="w-[100px] h-[100px] relative overflow-hidden flex-shrink-0 bg-yellow-400 object-contain">
                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 mt-2">{product.name}</h3>
                            </div>

                            {/* Overall Rating */}
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <h4 className="text-lg font-bold text-gray-900 mb-4">Overall Rating</h4>
                                <div className="flex gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="focus:outline-none"
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setRating(star)}
                                        >
                                            <Star
                                                strokeWidth={1}
                                                className={`w-8 h-8 ${star <= (hoverRating || rating)
                                                    ? 'fill-[#008C4A] text-[#008C4A]'
                                                    : 'text-gray-300'
                                                    } transition-colors duration-200`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Review Title */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Review Title"
                                    value={reviewTitle}
                                    onChange={(e) => setReviewTitle(e.target.value)}
                                    className="w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all text-sm"
                                />
                            </div>

                            {/* Review Comment */}
                            <div className="mb-8">
                                <textarea
                                    placeholder="Write your comment..."
                                    rows={5}
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                    className="w-full px-4 py-3 rounded border border-gray-300 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all text-sm resize-none"
                                />
                            </div>

                            {/* Add Photos */}
                            <div className="mb-8 pb-6 border-b border-gray-100">
                                <h4 className="text-[17px] font-bold text-gray-900 mb-2">Add Photos (Optional)</h4>
                                <p className="text-sm text-gray-600 mb-4">Upload images to enhance your review. Supported formats: JPG, JPEG, PNG, GIF, WebP (Max 10MB each)</p>
                                <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <Camera className="w-4 h-4 text-gray-700" />
                                    Choose Images
                                    <input
                                        type="file"
                                        className="hidden"
                                        multiple
                                        accept="image/png, image/jpeg, image/gif, image/webp"
                                        onChange={handleImageSelection}
                                    />
                                </label>

                                {previewUrls.length > 0 && (
                                    <div className="mt-5">
                                        <h5 className="text-[14px] text-gray-800 mb-3">Selected Images:</h5>
                                        <div className="flex gap-4 flex-wrap pt-1 pr-2">
                                            {previewUrls.map((url, idx) => (
                                                <div key={idx} className="relative group w-[100px] h-[100px]">
                                                    <div className="w-full h-full rounded-xl border border-gray-200 overflow-hidden">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute -top-2.5 -right-2.5 bg-[#f64c4c] text-white shadow-md rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 focus:outline-none"
                                                    >
                                                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button aligned to right */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleCloseModal}
                                    disabled={rating === 0 || !reviewTitle || !reviewComment}
                                    className="px-6 py-2.5 bg-[#00A859] text-white rounded font-medium text-[15px] hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Simple Icon fallback logic
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
