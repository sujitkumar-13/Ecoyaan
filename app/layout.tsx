import type { Metadata } from "next";
import { Geist } from "next/font/google";
export const dynamic = "force-dynamic";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { getCartData } from "@/lib/api";
import { Header } from "@/components/Header";
import { MobileNavBar } from "@/components/MobileNavBar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecoyaan",
  description: "Shop eco-friendly and sustainable products. Browse our curated collection of vegan, zero-waste, and cruelty-free products verified by Ecoverify™.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCartData = await getCartData();

  return (
    <html lang="en" className="bg-stone-50">
      <body
        className={`${geistSans.variable} antialiased bg-stone-50 text-stone-900 flex flex-col min-h-screen pb-16 md:pb-0`}
      >
        <WishlistProvider>
          <CartProvider initialData={initialCartData}>
            <Header />
            <main className="flex-1 w-full mx-auto p-4 md:p-8">
              {children}
            </main>
            <MobileNavBar />
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
