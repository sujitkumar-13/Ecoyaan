import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("ecoyaan");

        // We'll upsert based on email for now as a simple identifier
        const { email, password, ...updateData } = body;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const result = await db.collection("users").updateOne(
            { email: email },
            {
                $set: { ...updateData, updatedAt: new Date() },
                $setOnInsert: {
                    joinedAt: new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    }),
                    addresses: body.address && typeof body.address === 'string' ? [
                        {
                            id: Math.random().toString(36).substring(7),
                            fullName: body.name || "User",
                            email: email,
                            phone: body.phone || "",
                            city: "",
                            state: "",
                            pinCode: "",
                            isDefault: true,
                            label: "Home"
                        }
                    ] : []
                }
            },
            { upsert: true }
        );

        return NextResponse.json({ success: true, id: result.upsertedId });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Failed to save user' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("ecoyaan");

        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
    }
}
