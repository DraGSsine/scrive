"use client";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Chrome } from "lucide-react";
import Link from "next/link";

export default function Page() {
  useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const res = await api.get("/users/token");
      console.log(res?.data?.token)
      if (typeof window !== "undefined")
        window.postMessage({ type: "FROM_PAGE", token: res?.data?.token }, "*");
      return res.data;
    },
  });
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -left-[20%] -top-[20%] h-[600px] w-[600px] 
        rounded-full bg-gradient-to-tr from-fuchsia-200/20 to-fuchsia-300/20 
        blur-3xl transform-gpu"
        />
        <div
          className="absolute -right-[20%] -bottom-[20%] h-[600px] w-[600px] 
        rounded-full bg-gradient-to-bl from-violet-200/20 to-violet-300/20 
        blur-3xl transform-gpu"
        />
      </div>

      {/* Main content container */}
      <div className="relative flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-32 py-20 lg:py-32">
        {/* Hero section */}
        <div className="space-y-6 mb-12 md:mb-20 max-w-3xl w-full">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold 
          text-zinc-800 tracking-tight leading-[1.1] transition-all duration-300"
          >
            Welcome to{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r 
            from-fuchsia-500 to-violet-500 animate-gradient"
            >
              scrive
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl text-zinc-600 leading-relaxed text-center 
          max-w-2xl mx-auto px-4"
          >
            Your intelligent companion for crafting the perfect LinkedIn
            responses, powered by advanced AI
          </p>
        </div>

        {/* Action card */}
        <div className="w-full max-w-3xl mx-auto px-4">
          <Link
            href="https://chromewebstore.google.com/detail/scrive/hfadoenckgoahdcacngfebieckmhemef"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 
            shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 
            overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            {/* Card hover effect background */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 
            dark:from-gray-700 dark:to-gray-800 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 ease-in-out"
            />

            {/* Card content */}
            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 z-10">
              {/* Icon container */}
              <div
                className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 
              group-hover:bg-gray-200 dark:group-hover:bg-gray-600 
              flex items-center justify-center flex-shrink-0 
              transition-colors duration-300 ease-in-out transform group-hover:scale-105"
              >
                <Chrome
                  className="w-8 h-8 text-gray-600 dark:text-gray-300 
                group-hover:text-gray-800 dark:group-hover:text-white 
                transition-colors duration-300 ease-in-out"
                />
              </div>

              {/* Text content */}
              <div className="text-center sm:text-left flex-1">
                <h3
                  className="text-xl font-semibold text-gray-800 dark:text-gray-200 
                group-hover:text-gray-900 dark:group-hover:text-white mb-3 
                flex items-center justify-center sm:justify-start gap-2 
                transition-colors duration-300 ease-in-out"
                >
                  Install Extension
                  <ArrowRight
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600 
                  dark:text-gray-500 dark:group-hover:text-gray-300 
                  transition-transform duration-300 ease-in-out 
                  transform group-hover:translate-x-1"
                  />
                </h3>
                <p
                  className="text-gray-600 dark:text-gray-400 
                group-hover:text-gray-700 dark:group-hover:text-gray-300 
                transition-colors duration-300 ease-in-out text-base max-w-md"
                >
                  Get started with our Chrome extension and elevate your
                  LinkedIn messaging experience.
                </p>
              </div>
            </div>

            {/* Bottom border animation */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 
            bg-gradient-to-r from-fuchsia-500 to-violet-500 
            transform scale-x-0 group-hover:scale-x-100 
            transition-transform duration-300 ease-in-out"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
