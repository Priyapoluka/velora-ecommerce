"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 shadow"
          >
            <p>
              <strong>Date:</strong> {order.date}
            </p>

            <p>
              <strong>Payment:</strong> {order.payment}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>

            <p className="mt-2">
              <strong>Items:</strong>
            </p>

            <ul className="list-disc ml-6">
              {order.items.map(
                (item: string, i: number) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}