import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("ecoyaan");

        const user = await db.collection("users").findOne({
            email: body.email,
            password: body.password
        });

        if (user) {
            return NextResponse.json({ success: true, email: user.email });
        } else {
            return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Failed to login' }, { status: 500 });
    }
}
