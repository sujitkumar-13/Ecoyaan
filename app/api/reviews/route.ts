import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json({ error: 'productId is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('ecoyaan');

        const reviews = await db
            .collection('reviews')
            .find({ productId: Number(productId) })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(reviews);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { productId, userEmail, userName, rating, title, comment } = body;

        if (!productId || !userEmail || !rating || !title || !comment) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('ecoyaan');

        const review = {
            productId: Number(productId),
            userEmail,
            userName: userName || userEmail.split('@')[0],
            rating: Number(rating),
            title,
            comment,
            createdAt: new Date(),
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
        };

        const result = await db.collection('reviews').insertOne(review);

        return NextResponse.json({ success: true, reviewId: result.insertedId });
    } catch {
        return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
    }
}
