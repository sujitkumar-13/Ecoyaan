import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export async function GET() {
    // Simulate network delay to make it feel like a real API
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(getProducts());
}
