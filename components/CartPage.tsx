"use client";

import Container from "@/components/Container";
import Image from "next/image";
import { useCart } from "@/components/CartContext";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <Container className="py-10">
      <h2 className="text-2xl font-semibold mb-6">Košarica</h2>

      {cart.length === 0 ? (
        <p>Košarica je prazna.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-4 rounded"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">{item.price.toFixed(2)} €</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default CartPage;
