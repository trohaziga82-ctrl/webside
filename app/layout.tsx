import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { UserProvider } from "@/components/UserContext";

export const metadata: Metadata = {
  title: {
    template: "%s - Lego Store",
    default: "Lego Store",
  },
  description: "Lego Store online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased min-h-screen flex flex-col">
        
        <CartProvider>
          <UserProvider>
            
            
            <Header />

           
            <main className="flex-1">
              {children}
            </main>

            
            <Footer />
            
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}
