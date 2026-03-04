import { Product } from "@/types";

export function getProducts(): Product[] {
    return [
        {
            id: 101,
            name: "Bamboo Toothbrush (Pack of 4)",
            price: 299,
            image: "/brush.jpg",
            description: "Biodegradable bamboo handles with BPA-free bristles. A simple swap for a greener smile."
        },
        {
            id: 102,
            name: "Reusable Cotton Produce Bags",
            price: 450,
            image: "/bag.jpeg",
            description: "Set of 6 organic cotton mesh bags. Perfect for grocery shopping without the plastic."
        },
        {
            id: 103,
            name: "Stainless Steel Water Bottle",
            price: 699,
            image: "/bottle.jpeg",
            description: "Double-walled insulated bottle. Keeps drinks cold 24hrs or hot 12hrs."
        },
        {
            id: 104,
            name: "Beeswax Food Wraps (Set of 3)",
            price: 399,
            image: "/wraps.jpeg",
            description: "Natural alternative to plastic wrap. Reusable, washable, and compostable."
        },
        {
            id: 105,
            name: "Organic Cotton Tote Bag",
            price: 349,
            image: "/tote.jpeg",
            description: "Sturdy, stylish, and 100% organic. Your everyday sustainable carry companion."
        },
        {
            id: 106,
            name: "Natural Loofah & Soap Set",
            price: 249,
            image: "/loofah.jpeg",
            description: "Plant-based loofah sponge with handmade organic soap bar. Zero waste bath essentials."
        }
    ];
}
