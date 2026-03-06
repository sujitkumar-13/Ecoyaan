import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key-please-change';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("ecoyaan");

        const user = await db.collection("users").findOne({
            email: body.email
        });

        if (user) {
            let isMatch = false;
            // Handle both bcrypt hashes and plain text legacy passwords
            if (user.password && user.password.startsWith('$2')) {
                isMatch = await bcrypt.compare(body.password, user.password);
            } else {
                isMatch = user.password === body.password;
            }

            if (isMatch) {
                // Generate JWT token with 7-day expiration
                const token = jwt.sign(
                    { email: user.email, id: user._id },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                return NextResponse.json({ success: true, email: user.email, token });
            } else {
                return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
            }
        } else {
            return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Failed to login' }, { status: 500 });
    }
}
