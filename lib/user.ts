import { User, Order } from "@/types";

export const mockUser: User = {
    id: "user_12345",
    name: "Sujit Kumar",
    email: "sujit.kumar@example.com",
    phone: "+91 98765 43210",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sujit",
    joinedAt: "March 2024",
    addresses: [
        {
            id: "addr_1",
            fullName: "Sujit Kumar",
            email: "sujit.kumar@example.com",
            phone: "+91 98765 43210",
            pinCode: "110001",
            city: "New Delhi",
            state: "Delhi",
            isDefault: true,
            label: "Home"
        },
        {
            id: "addr_2",
            fullName: "Sujit Kumar",
            email: "sujit.kumar@example.com",
            phone: "+91 98765 43210",
            pinCode: "560001",
            city: "Bengaluru",
            state: "Karnataka",
            isDefault: false,
            label: "Office"
        }
    ]
};

export const mockOrders: Order[] = [
    {
        id: "ORD-99281",
        date: "Feb 24, 2024",
        status: "Delivered",
        total: 1249,
        items: [
            {
                product_id: 101,
                product_name: "Bamboo Toothbrush (Pack of 4)",
                product_price: 299,
                quantity: 2,
                image: "/brush.jpg"
            },
            {
                product_id: 103,
                product_name: "Stainless Steel Water Bottle",
                product_price: 699,
                quantity: 1,
                image: "/bottle.jpeg"
            }
        ],
        shippingAddress: mockUser.addresses[0]
    },
    {
        id: "ORD-98122",
        date: "Jan 12, 2024",
        status: "Delivered",
        total: 450,
        items: [
            {
                product_id: 102,
                product_name: "Reusable Cotton Produce Bags",
                product_price: 450,
                quantity: 1,
                image: "/bag.jpeg"
            }
        ],
        shippingAddress: mockUser.addresses[0]
    }
];

export function getUser(): User {
    return mockUser;
}

export function getOrders(): Order[] {
    return mockOrders;
}
