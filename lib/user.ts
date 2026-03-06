import { User, Order } from "@/types";

export const mockUser: User = {
    id: "user_12345",
    name: "Sujit Kumar",
    email: "sujit.kumar@example.com",
    phone: "+91 98765 43210",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sujit",
    joinedAt: "March 2024",
    addresses: []
};

export const mockOrders: Order[] = [];

export function getUser(): User {
    return mockUser;
}

export function getOrders(): Order[] {
    return [];
}
