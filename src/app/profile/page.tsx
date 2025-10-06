import SignOutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/auth/login");

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headerList,
    body: {
      userId: session.user.id,
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Profile
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          {session.user.role === "ADMIN" && (
            <Button asChild>
              <Link href="/admin/dashboard">Dashboard</Link>
            </Button>
          )}
          <SignOutButton />
        </div>
        <div className="text-2xl font-bold">Permissions</div>

        <div className="space-x-4">
          <Button size="sm">Manage Own Posts</Button>
          <Button size="sm" disabled={!FULL_POST_ACCESS.success}>
            Manage All Posts
          </Button>
        </div>

        <pre className="text-sm overflow-clip">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default page;
