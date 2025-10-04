"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const name = String(formData.get("name"));
    if (!name) return toast.error("Name is required");

    const email = String(formData.get("email"));
    if (!email) return toast.error("Email is required");

    const password = String(formData.get("password"));
    if (!password) return toast.error("Password is required");

    console.log({ name, email, password });

    await signUp.email(
      { name, email, password },
      {
        onReqeust: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Registered successfully. You can now log in.");
          router.push("/auth/login");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <Label className="block text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <Input
          type="text"
          name="name"
          //   value={form.name}
          //   onChange={handleChange}
          placeholder="John Doe"
          className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Email */}
      <div>
        <Label className="block text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <Input
          type="email"
          name="email"
          //   value={form.email}
          //   onChange={handleChange}
          placeholder="you@example.com"
          className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Password */}
      <div>
        <Label className="block text-sm font-medium text-gray-700">
          Password
        </Label>
        <div className="relative mt-1">
          <Input
            // type={showPass ? "text" : "password"}
            name="password"
            // value={form.password}
            // onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="button"
            // onClick={() => setShowPass(!showPass)}
            className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {/* {showPass ? <EyeOff size={18} /> : <Eye size={18} />} */}
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        Register
        {/* {loading ? "Registering..." : "Sign Up"} */}
      </Button>
    </form>
  );
}

export default RegisterForm;
