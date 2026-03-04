# Ecoyaan Checkout Flow MVP

A robust, responsive, and sustainable-themed Checkout Flow built to demonstrate modern React and Next.js App Router architectures.

## Overview

This project implements a multi-step checkout process (`Cart -> Shipping -> Payment -> Success`) focused on clean architecture, strong state management, and an eco-friendly UI aesthetic inspired by Ecoyaan. 

## Technical Stack & Architecture

- **Core Framework**: React + Next.js (App Router `app/` directory).
- **Styling**: Tailwind CSS (strict mobile-first, neutral/green aesthetic).
- **State Management**: React Context API (`CartContext`), ensuring that Cart data and Shipping information persist across the pages without using `localStorage` for core state requirements.
- **Server-Side Rendering (SSR)**: The root layout automatically fetches mock cart data using an async server function. This data is then hydrated into the Context layer directly, ensuring that initial cart calculations and UI are available instantly on the first paint before client-side hydration completes.

## Why App Router?

The Next.js App Router (version 13+) provides an intuitive nested routing system that naturally aligns with the `cart -> shipping -> payment` progression. It also enforces React Server Components (RSC) by default, forcing developers to make explicit, deliberate choices about the client/server boundary (`"use client"`). This leads to smaller client bundle sizes and vastly improved initial load performance (SEO friendly). 

## How SSR is Implemented

Instead of a `useEffect` API call upon mounting, the `app/layout.tsx` is an async Server Component. It fetches a mock API response via `getCartData()` with a simulated delay to mimic real-world network requests. The fetched `CartData` payload is passed synchronously as the `initialData` prop into the `<CartProvider>`, immediately seeding the application's global context.

## Managing State with Context API

The application maintains the `CartContext` at the global level to preserve logical edge cases:
- Preventing access to Payment routes if the address is missing.
- Propagating updates from the Cart Quantity modifier into the overarching `OrderSummary` across the `Cart`, `Shipping`, and `Payment` steps dynamically.
The Context layer handles data manipulations (`updateQuantity`, `removeItem`, `setShippingAddress`) cleanly separated from the UI components.

## Folder Structure Summary

```text
/app
  /api/cart         # Mock JSON internal API
  /cart             # Cart Page (Step 1)
  /shipping         # Form/Shipping Page (Step 2)
  /payment          # Review & Simulation Page (Step 3)
  /success          # Clean Success page
  layout.tsx        # Global SSR Data Fetch & Provider wrap
  page.tsx          # Hero/Landing Entry Route

/components
  AddressForm.tsx   # Controlled complex billing form
  CartItem.tsx      # Interactive cart product row
  OrderSummary.tsx  # Dynamic side-panel totals calculator

/context
  CartContext.tsx   # Global Provider & hook implementation

/lib
  api.ts            # SSR direct fetching logic

/types
  index.ts          # TypeScript domain definitions
```

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Design Decisions

- **Tailwind CSS Variants**: Extensively scoped styling utilizing Tailwind utility classes for minimal CSS payload. Includes interactive disabled/loading configurations for all calls-to-action out of the box.
- **Validation Form**: In-browser client-side controlled form validations to ensure correct types (Email format, 10-digit number schema).
- **Graceful Error Redirects**: Directly navigating to `/payment` seamlessly kicks the user backward down the funnel flow to ensure correct logical state entry. 

*Designed for the Ecoyaan MVP assessment.*
