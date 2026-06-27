"use client";

import {
  useUser,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";

export default function ProfilePage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">
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
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">

        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-5"
        />

        <h1 className="text-3xl font-bold text-pink-700">
          {user.fullName}
        </h1>

        <p className="text-gray-600 mt-3">
          {user.primaryEmailAddress?.emailAddress}
        </p>

        <div className="mt-8 flex justify-center">
          <UserButton />
        </div>

      </div>

    </div>
  );
}