import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
export const dynamic = "force-dynamic";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { getCartData } from "@/lib/api";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecoyaan | Checkout",
  description: "Sustainable eCommerce Checkout Flow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCartData = await getCartData();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 text-stone-900 flex flex-col min-h-screen`}
      >
        <CartProvider initialData={initialCartData}>
          <Header />
          <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8">
            {children}
          </main>
          <footer className="bg-stone-100 py-6 text-center text-stone-500 text-sm mt-auto">
            © {new Date().getFullYear()} Ecoyaan Checkout MVC. All rights reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
