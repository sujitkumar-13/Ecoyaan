import { CartData } from "@/types";

export async function getCartData(): Promise<CartData> {
    return {
        cartItems: [],
        shipping_fee: 50,
        discount_applied: 0,
    };
}
