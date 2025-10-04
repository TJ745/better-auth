import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <p className="text-destructive">Please log in to view your profile.</p>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Profile
        </h1>
        <SignOutButton />
        <pre className="text-sm overflow-clip">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default page;
