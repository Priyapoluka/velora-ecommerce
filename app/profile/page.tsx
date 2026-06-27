"use client";

import Link from "next/link";
import {
  useUser,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";

export default function ProfilePage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
        <h1 className="text-3xl font-bold mb-6 text-pink-700">
          Please Login
        </h1>

        <SignInButton mode="modal">
          <button className="bg-pink-500 text-white px-6 py-3 rounded-lg">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-pink-200"
        />

        <h1 className="text-3xl font-bold text-pink-700">
          {user.fullName || "Velora User"}
        </h1>

        <p className="text-gray-600 mt-2 break-words">
          {user.primaryEmailAddress?.emailAddress}
        </p>

        <div className="border-t my-6"></div>

        <div className="space-y-4 text-left">
          <Link
            href="/orders"
            className="block bg-pink-50 hover:bg-pink-100 p-4 rounded-xl font-semibold text-pink-700"
          >
            📦 My Orders
          </Link>

          <Link
            href="/wishlist"
            className="block bg-pink-50 hover:bg-pink-100 p-4 rounded-xl font-semibold text-pink-700"
          >
            ❤️ My Wishlist
          </Link>
        </div>

        <div className="border-t my-6"></div>

        <div className="flex justify-center">
          <UserButton />
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Use the profile menu to sign out.
        </p>
      </div>
    </main>
  );
}