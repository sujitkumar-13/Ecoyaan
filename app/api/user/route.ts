import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, age, gender, email, phone, password, address } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection("users");

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            name,
            age,
            gender,
            email,
            phone,
            password: hashedPassword,
            address,
            joinedAt: new Date().toISOString()
        };

        const result = await usersCollection.insertOne(newUser);

        return NextResponse.json({
            message: "User created successfully",
            userId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("Registration API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
