"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="text-7xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold text-pink-600">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with
        </p>

        <h2 className="text-2xl font-bold text-purple-600 mt-2">
          Velora ✨
        </h2>

        <div className="bg-pink-50 rounded-xl p-4 mt-6">
          <p className="text-gray-500">Order ID</p>

          <p className="font-bold text-xl text-pink-600 tracking-wider">
  #VLR-2026
</p>

          <p className="mt-3 text-gray-500">
            Estimated Delivery
          </p>

        <p className="font-bold text-pink-600 text-lg">
  3 - 5 Business Days
</p>
         
        </div>

        <Link
          href="/"
          className="block mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl hover:scale-105 transition"
        >
          Continue Shopping 🛍️
        </Link>
      </div>
    </main>
  );
}