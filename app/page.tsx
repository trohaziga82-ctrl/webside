"use client"

import Container from "@/components/Container"
import Image from "next/image"
import React from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"

type Product = {
  id: number
  name: string
  price: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "LEGO TIE Interceptor",
    price: 229.99,
    image: "/TIE.png",
  },
  {
    id: 2,
    name: "LEGO Star Wars X-Wing",
    price: 239.99,
    image: "/xwing.png",
  },
  {
    id: 3,
    name: "LEGO Captain Jack Sparrow's Pirate Ship",
    price: 359.99,
    image: "/Captain Jack Sparrow's Pirate Ship.jpg",
  },
  {
    id: 4,
    name: "LEGO Venator-Class Republic Attack Cruiser",
    price: 649.99,
    image: "/Venator-Class Republic Attack Cruiser.jpg",
  },
  {
    id: 5,
    name: "LEGO Gingerbread AT-AT Walker",
    price: 64.99,
    image: "/Gingerbread AT-AT™ Walker.jpg",
  },
  {
    id: 6,
    name: "LEGO AT-ST Walker",
    price: 199.99,
    image: "/AT-ST™ Walker.png",
  },
  {
    id: 7,
    name: "LEGO Battle of Felucia Separatist MTT",
    price: 159.99,
    image: "/Battle of Felucia Separatist MTT.png",
  },
  {
    id: 8,
    name: "LEGO Jango Fett's Firespray-Class Starship",
    price: 299.99,
    image: "/Jango Fett's Firespray-Class Starship.jpg",
  },
  {
    id: 9,
    name: "LEGO AT-TE Walker",
    price: 149.99,
    image: "/AT-TE™ Walker.jpg",
  },
]

const Home = () => {
  const { addToCart } = useCart()

  return (
    <Container className="py-10">
      <h2 className="text-2xl font-semibold mb-6">Izdelki</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="object-cover rounded mb-4"
            />

            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-gray-600 mb-4">
              {product.price.toFixed(2)} €
            </p>

            <Button
              onClick={() => addToCart(product)}
              className="mt-auto"
            >
              Dodaj v košarico
            </Button>
          </div>
        ))}
      </div>
    </Container>
  )
}


export default Home
