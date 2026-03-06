import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("ecoyaan");

        const order = {
            ...body,
            createdAt: new Date(),
            status: 'Processing',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            })
        };

        const result = await db.collection("orders").insertOne(order);

        return NextResponse.json({ success: true, orderId: result.insertedId });
    } catch {
        return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
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

        const orders = await db.collection("orders")
            .find({ "userEmail": email })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(orders);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
