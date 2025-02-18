"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, User } from "lucide-react";
import GoogleAuthButton from "../GoogleAuthButton";
import cookies from "js-cookie";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { signupSchema } from "@/lib/validation";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      cookies.set("token", data.access_token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
      toast({
        description: "Account created successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      displayname: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const validatedData = signupSchema.parse(data);
      mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof SignupFormData;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="w-full max-w-[540px] relative">
      {/* Decorative orbs with improved colors */}
      <div className="absolute -top-[10%] -right-[0%] h-40 sm:h-80 w-40 sm:w-80 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-[5%] -left-[10%] h-40 sm:h-80 w-40 sm:w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* Main form container with improved background and border */}
      <div className="relative h-[700px] flex justify-center flex-col bg-white/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-6 sm:space-y-8 border border-violet-100/20 shadow-lg">
        {/* Header with improved text colors */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800 tracking-tight">
            Get started
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Create your account to continue
          </p>
        </div>

        {/* Google Auth Button */}
        <GoogleAuthButton />

        {/* Divider with improved colors */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-gray-500 bg-white/95">
              or continue with
            </span>
          </div>
        </div>

        {/* Form with improved input styling */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            {/* Name Input */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <div className="relative h-16 mt-1.5">
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className={`h-11 rounded-xl bg-white border-gray-200 text-zinc-800 placeholder:text-gray-400 focus-visible:ring-violet-500 focus-visible:ring-2 focus-visible:border-violet-500 pl-11 ${
                      errors.displayname ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                    required
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.displayname && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.displayname}
                  </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="relative h-16 mt-1.5">
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`h-11 rounded-xl bg-white border-gray-200 text-zinc-800 placeholder:text-gray-400 focus-visible:ring-violet-500 focus-visible:ring-2 focus-visible:border-violet-500 pl-11 ${
                      errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative h-16 mt-1.5">
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={`h-11 rounded-xl bg-white border-gray-200 text-zinc-800 placeholder:text-gray-400 focus-visible:ring-violet-500 focus-visible:ring-2 focus-visible:border-violet-500 pl-11 ${
                      errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button with improved gradient and hover effects */}
          <Button
            type="submit"
            disabled={isPending}
            className="relative w-full h-11 rounded-xl bg-violet-600 text-white font-medium transition-all hover:bg-violet-700 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span className="relative">Create account</span>
              </>
            )}
          </Button>
        </form>

        {/* Footer with improved link styling */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}