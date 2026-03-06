import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("ecoyaan");

        const cart = await db.collection("carts").findOne({ email });
        return NextResponse.json(cart?.items || []);
    } catch (e) {
        console.error("Fetch cart error:", e);
        return NextResponse.json({ success: false, error: 'Failed to fetch cart' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { email, items } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("ecoyaan");

        await db.collection("carts").updateOne(
            { email },
            { $set: { items, updatedAt: new Date() } },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Save cart error:", e);
        return NextResponse.json({ success: false, error: 'Failed to save cart' }, { status: 500 });
    }
}
