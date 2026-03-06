import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("ecoyaan");

        // We'll upsert based on email for now as a simple identifier
        const result = await db.collection("users").updateOne(
            { email: body.email },
            { $set: { ...body, updatedAt: new Date() } },
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
