import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("ecoyaan");

        const wishlist = await db.collection("wishlists").findOne({ email });
        return NextResponse.json(wishlist?.items || []);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Failed to fetch wishlist' }, { status: 500 });
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

        await db.collection("wishlists").updateOne(
            { email },
            { $set: { items, updatedAt: new Date() } },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Failed to save wishlist' }, { status: 500 });
    }
}
