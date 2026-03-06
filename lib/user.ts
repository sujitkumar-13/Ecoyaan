import { User, Order } from "@/types";

export function getUser(): User {
    return {
        id: "",
        name: "",
        email: "",
        phone: "",
        avatar: "",
        joinedAt: "",
        addresses: []
    };
}

export function getOrders(): Order[] {
    return [];
}
