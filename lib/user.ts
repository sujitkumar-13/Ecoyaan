import { User } from "@/types";

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
