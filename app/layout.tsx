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
        {/* Ovijemo celotno aplikacijo v Providerje za košarico in uporabnika */}
        <CartProvider>
          <UserProvider>
            
            {/* GLAVNI HEADER (Logo, Košarica, Profil) */}
            <Header />

            {/* GLAVNA VSEBINA - Tukaj se izrisujejo tvoji izdelki */}
            <main className="flex-1">
              {children}
            </main>

            {/* NOGA STRANI */}
            <Footer />
            
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}