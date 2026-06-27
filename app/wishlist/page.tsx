"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const products = [
  {
    name: "Vitamin C Serum",
    price: 799,
    image: "/products/serum.jpg",
  },
  {
    name: "Aloe Vera Gel",
    price: 349,
    image: "/products/aloe_vera_gel.jpg",
  },
  {
    name: "Niacinamide Serum",
    price: 699,
    image: "/products/niacinamide-serum.jpg",
  },
  {
    name: "Moisturizer",
    price: 549,
    image: "/products/moisturizer.jpg",
  },
  {
    name: "Lip Balm",
    price: 299,
    image: "/products/lipbalm.jpg",
  },
  {
    name: "Tinted Lip Gloss",
    price: 399,
    image: "/products/tinted-lip-gloss.jpg",
  },
  {
    name: "Sunscreen SPF 50",
    price: 499,
    image: "/products/sunscreen.jpg",
  },
  {
    name: "Hair Growth Serum",
    price: 599,
    image: "/products/hair-care.jpg",
  },
  {
    name: "Vanilla Body Wash",
    price: 449,
    image: "/products/vanilla-bodywash.jpg",
  },
  {
    name: "Rose Body Wash",
    price: 399,
    image: "/products/rose-bodywash.jpg",
  },
  {
    name: "Rosemary Hair Growth Serum",
    price: 599,
    image: "/products/hairr-care.jpg",
  },
  {
    name: "Onion Hair Oil",
    price: 499,
    image: "/products/onion-hair-oil.jpg",
  },
  {
    name: "Strawberry Lip Balm",
    price: 249,
    image: "/products/strawberry-lipbalm.jpg",
  },
  {
    name: "Cherry Lip Gloss",
    price: 349,
    image: "/products/cherry-lipgloss.jpg",
  },
  {
    name: "Coffee Body Scrub",
    price: 549,
    image: "/products/coffee.jpg",
  },
  {
    name: "Lip Care Combo",
    price: 599,
    image: "/products/lip-combo.jpg",
  },
  {
    name: "Hair Growth Combo",
    price: 999,
    image: "/products/hair-combo.jpg",
  },
  {
    name: "Body Care Combo",
    price: 1099,
    image: "/products/body-combo.jpg",
  },
];

type CartItem = {
  name: string;
  quantity: number;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const savedCart = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

    setWishlist(savedWishlist);
    setCartItems(savedCart);
  }, []);

  const removeFromWishlist = (productName: string) => {
    const updatedWishlist = wishlist.filter(
      (item) => item !== productName
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const addToCart = (productName: string) => {
    const existing = cartItems.find(
      (item) => item.name === productName
    );

    let updatedCart: CartItem[];

    if (existing) {
      updatedCart = cartItems.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        { name: productName, quantity: 1 },
      ];
    }

    setCartItems(updatedCart);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );

    alert("🛒 Added to Cart");
  };

  return (
    <main className="min-h-screen bg-pink-50 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-7xl mb-4">❤️</div>

          <h2 className="text-2xl font-bold text-pink-600">
            Your Wishlist is Empty
          </h2>

          <p className="text-gray-500 mt-3">
            Save your favorite products here.
          </p>

          <Link
            href="/"
            className="inline-block mt-6 bg-pink-500 text-white px-6 py-3 rounded-xl"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {wishlist.map((item, index) => {
            const product = products.find(
              (p) => p.name === item
            );

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center"
              >
                <img
                  src={product?.image}
                  alt={item}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-pink-700">
                    {item}
                  </h3>

                  <p className="text-pink-500 font-semibold">
                    ₹{product?.price}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg text-sm mr-2"
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}