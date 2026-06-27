"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  name: string;
  quantity: number;
};

type Order = {
  items: OrderItem[];
  total: number;
  payment: string;
  date: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
       <div className="text-center py-20">
  <div className="text-7xl mb-4">📦</div>

  <h2 className="text-2xl font-bold text-pink-700">
    No Orders Yet
  </h2>

  <p className="text-gray-500 mt-2">
    Your orders will appear here after checkout.
  </p>
</div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 shadow"
          >
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Payment:</strong> {order.payment}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>

            <p className="mt-2"><strong>Items:</strong></p>

            <ul className="list-disc ml-6">
              {order.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}