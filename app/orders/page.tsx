import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        My Orders
      </h1>
      <p>Your order history will appear here.</p>
    </div>
  );
}