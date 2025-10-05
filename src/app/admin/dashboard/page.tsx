import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center bg-gray-100 p-4">
        <p className="text-red-500">
          You are not an admin!
          <br /> Please Log in with Admin Credentials.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <h1>Admin Dashboard</h1>
      <p className="text-red-500"> You are an admin </p>
    </div>
  );
}

export default Dashboard;
