"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        My Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 mb-4 rounded mb-4"
          >
            <h2 className="font-bold">{item.name}</h2>

            <p>₹{item.price}</p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}