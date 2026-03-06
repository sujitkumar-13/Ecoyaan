import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("ecoyaan");
        const products = await db.collection("products").find({}).toArray();
        return NextResponse.json(products);
    } catch (e: any) {
        console.error("Fetch products error details:", {
            message: e.message,
            stack: e.stack,
            name: e.name
        });
        return NextResponse.json({ success: false, error: 'Failed to fetch products', details: e.message }, { status: 500 });
    }
}
