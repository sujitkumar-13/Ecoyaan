import { NextResponse } from 'next/server';

// Generate SVG placeholder for cart items
function generateCartSVG(text: string): string {
  const svg = `
    <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      <rect width="150" height="150" fill="#10b981"/>
      <text x="75" y="75" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export async function GET() {
  // Mock cart data as specified in the requirements
  const mockCartData = {
    "cartItems": [
      {
        "product_id": 101,
        "product_name": "Bamboo Toothbrush (Pack of 4)",
        "product_price": 299,
        "quantity": 2,
        "image": generateCartSVG("Bamboo Toothbrush")
      },
      {
        "product_id": 102,
        "product_name": "Reusable Cotton Produce Bags",
        "product_price": 450,
        "quantity": 1,
        "image": generateCartSVG("Cotton Bags")
      }
    ],
    "shipping_fee": 50,
    "discount_applied": 0
  };

  return NextResponse.json(mockCartData);
}