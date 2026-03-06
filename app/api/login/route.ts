import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection("users");

        // Find user by email
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Calculate expiry for localStorage (24 hours)
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;

        return NextResponse.json({
            message: "Login successful",
            token,
            userEmail: user.email,
            tokenExpiry: expiry.toString()
        }, { status: 200 });

    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
