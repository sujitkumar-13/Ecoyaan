import { CartData } from "@/types";

export async function getCartData(): Promise<CartData> {
    // Simulate network fetch delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        cartItems: [],
        shipping_fee: 50,
        discount_applied: 0,
    };
}
