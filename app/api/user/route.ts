import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne(
            { email },
            { projection: { password: 0 } } // Never return the hashed password
        );

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            id: user._id.toString(),
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            avatar: user.avatar || "",
            joinedAt: user.joinedAt || "",
            addresses: user.addresses || [],
            age: user.age || "",
            gender: user.gender || "",
        });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

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

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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

    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
