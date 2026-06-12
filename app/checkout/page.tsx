"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    alert(`Order placed successfully using ${paymentMethod}! 🎉`);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Checkout 💳
        </h1>

        <h2 className="font-semibold mb-4">
          Select Payment Method
        </h2>

        <div className="space-y-3">
          <label className="flex gap-2">
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            UPI
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              name="payment"
              value="Credit/Debit Card"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Credit/Debit Card
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Cash on Delivery
          </label>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-pink-500 text-white py-3 rounded-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}