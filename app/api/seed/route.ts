import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const products = [
    {
        id: 101,
        name: "Bamboo Toothbrush (Pack of 4)",
        price: 299,
        oldPrice: 399,
        image: "/brush.jpg",
        images: ["/brush.jpg", "/brush.jpg", "/brush.jpg"],
        description: "Biodegradable bamboo handles with BPA-free bristles. A simple swap for a greener smile.",
        badges: ["Vegan", "Zero Waste", "Recycled", "Cruelty Free", "Plastic-Free"],
        categoryPath: ["Personal Care", "Dental", "Bamboo Toothbrush (Pack of 4)"],
        attributes: {
            "Material": "Bamboo",
            "Bristle Type": "Soft",
            "Pack Size": "4"
        }
    },
    {
        id: 102,
        name: "Reusable Cotton Produce Bags",
        price: 450,
        image: "/bag.jpeg",
        images: ["/bag.jpeg", "/bag.jpeg", "/bag.jpeg"],
        description: "Set of 6 organic cotton mesh bags. Perfect for grocery shopping without the plastic.",
        badges: ["Zero Waste", "Recycled", "Plastic-Free"],
        categoryPath: ["Home & Kitchen", "Storage", "Reusable Cotton Produce Bags"],
        attributes: {
            "Material": "Organic Cotton",
            "Quantity": "6 Bags",
            "Closure": "Drawstring"
        }
    },
    {
        id: 103,
        name: "Stainless Steel Water Bottle",
        price: 699,
        oldPrice: 899,
        image: "/bottle.jpeg",
        images: ["/bottle.jpeg", "/bottle.jpeg", "/bottle.jpeg"],
        description: "Double-walled insulated bottle. Keeps drinks cold 24hrs or hot 12hrs.",
        badges: ["Reusable", "BPA-Free", "Durable"],
        categoryPath: ["Home & Kitchen", "Drinkware", "Stainless Steel Water Bottle"],
        attributes: {
            "Material": "Stainless Steel",
            "Capacity": "750ml",
            "Insulation": "Double-walled"
        }
    },
    {
        id: 104,
        name: "Beeswax Food Wraps (Set of 3)",
        price: 399,
        image: "/wraps.jpeg",
        images: ["/wraps.jpeg", "/wraps.jpeg", "/wraps.jpeg"],
        description: "Natural alternative to plastic wrap. Reusable, washable, and compostable.",
        badges: ["Compostable", "Reusable", "Natural"],
        categoryPath: ["Home & Kitchen", "Food Storage", "Beeswax Food Wraps (Set of 3)"],
        attributes: {
            "Material": "Organic Cotton, Beeswax",
            "Sizes": "Small, Medium, Large",
            "Lifespan": "Up to 1 year"
        }
    },
    {
        id: 105,
        name: "Organic Cotton Tote Bag",
        price: 349,
        oldPrice: 499,
        image: "/tote.jpeg",
        images: ["/tote.jpeg", "/tote.jpeg", "/tote.jpeg"],
        description: "Sturdy, stylish, and 100% organic. Your everyday sustainable carry companion.",
        badges: ["Vegan", "Recycled", "Plastic-Free"],
        categoryPath: ["Bags & Accessories", "Bags", "Organic Cotton Tote Bag"],
        attributes: {
            "Material": "Organic Cotton",
            "Dimensions": "15x16 inches",
            "Capacity": "10 kg"
        }
    },
    {
        id: 106,
        name: "Natural Loofah & Soap Set",
        price: 249,
        image: "/loofah.jpeg",
        images: ["/loofah.jpeg", "/loofah.jpeg", "/loofah.jpeg"],
        description: "Plant-based loofah sponge with handmade organic soap bar. Zero waste bath essentials.",
        badges: ["Vegan", "Zero Waste", "Cruelty Free"],
        categoryPath: ["Personal Care", "Bath & Body", "Natural Loofah & Soap Set"],
        attributes: {
            "Material": "Natural Loofah, Organic Oils",
            "Includes": "1 Loofah, 1 Soap Bar",
            "Soap Scent": "Lavender"
        }
    },
    {
        id: 107,
        name: "Paper Pencil (Plantable Seed) - Pack of 10",
        price: 219,
        oldPrice: 229,
        image: "/bag.jpeg",
        images: ["/bag.jpeg", "/brush.jpg", "/wraps.jpeg"],
        description: "Innovative pencils containing seeds that can be planted after use, turning waste into new plant life. Unlike conventional wooden pencils that end up in landfills, these create a positive environmental cycle.",
        badges: ["Vegan", "Zero Waste", "Recycled", "Cruelty Free", "Plastic-Free"],
        categoryPath: ["Bags & Accessories", "Accessories", "Stationery", "Paper Pencil (Plantable Seed) - Pack of 10"],
        attributes: {
            "Dimensions": "10 x 5 x 5 Inches",
            "What's in the Box": "10 pencils"
        }
    }
];

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("ecoyaan");

        // Clear existing products
        await db.collection("products").deleteMany({});

        // Insert new products
        const result = await db.collection("products").insertMany(products);

        return NextResponse.json({
            success: true,
            message: "Products seeded successfully",
            count: result.insertedCount
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 });
    }
}
