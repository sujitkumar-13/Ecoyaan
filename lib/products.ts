import { Product } from "@/types";

export function getProducts(): Product[] {
    return [
        {
            id: 101,
            name: "Bamboo Toothbrush (Pack of 4)",
            price: 299,
            image: "https://images.unsplash.com/photo-1608681283625-f38b14644da0?q=80&w=600&auto=format&fit=crop",
            description: "Biodegradable bamboo handles with BPA-free bristles. A simple swap for a greener smile."
        },
        {
            id: 102,
            name: "Reusable Cotton Produce Bags",
            price: 450,
            image: "https://images.unsplash.com/photo-1610419266395-5cb58c14d9be?q=80&w=600&auto=format&fit=crop",
            description: "Set of 6 organic cotton mesh bags. Perfect for grocery shopping without the plastic."
        },
        {
            id: 103,
            name: "Stainless Steel Water Bottle",
            price: 699,
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
            description: "Double-walled insulated bottle. Keeps drinks cold 24hrs or hot 12hrs."
        },
        {
            id: 104,
            name: "Beeswax Food Wraps (Set of 3)",
            price: 399,
            image: "https://images.unsplash.com/photo-1628147814421-2e6730a905ee?q=80&w=600&auto=format&fit=crop",
            description: "Natural alternative to plastic wrap. Reusable, washable, and compostable."
        },
        {
            id: 105,
            name: "Organic Cotton Tote Bag",
            price: 349,
            image: "https://images.unsplash.com/photo-1597484661643-2f5fef640df1?q=80&w=600&auto=format&fit=crop",
            description: "Sturdy, stylish, and 100% organic. Your everyday sustainable carry companion."
        },
        {
            id: 106,
            name: "Natural Loofah & Soap Set",
            price: 249,
            image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600&auto=format&fit=crop",
            description: "Plant-based loofah sponge with handmade organic soap bar. Zero waste bath essentials."
        }
    ];
}
