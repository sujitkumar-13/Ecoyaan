import { CartData } from "@/types";

export async function getCartData(): Promise<CartData> {
    // Simulate network fetch delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        cartItems: [
            {
                product_id: 101,
                product_name: "Bamboo Toothbrush (Pack of 4)",
                product_price: 299,
                quantity: 2,
                image: "https://via.placeholder.com/150?text=Bamboo+Toothbrush",
            },
            {
                product_id: 102,
                product_name: "Reusable Cotton Produce Bags",
                product_price: 450,
                quantity: 1,
                image: "https://via.placeholder.com/150?text=Produce+Bags",
            },
        ],
        shipping_fee: 50,
        discount_applied: 0,
    };
}
