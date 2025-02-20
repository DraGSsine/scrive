" use client";
import { ArrowRight, Chrome } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative h-screen">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-fuchsia-200/20 to-fuchsia-300/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-violet-200/20 to-violet-300/20 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center p-32">
        {/* Hero section */}
        <div className="space-y-6 mb-20 max-w-3xl">
          <h1 className="text-6xl text-center md:text-7xl font-bold text-zinc-800 tracking-tight leading-[1.1]">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-violet-500">
              scrive
            </span>
          </h1>

          <p className="text-xl text-zinc-600 leading-relaxed text-center ">
            Your intelligent companion for crafting the perfect LinkedIn
            responses, powered by advanced AI
          </p>
        </div>

        {/* Action cards */}

        <div className="w-full max-w-3xl mx-auto mb-20 px-4">
          <Link
            href="https://chromewebstore.google.com/detail/scrive/hfadoenckgoahdcacngfebieckmhemef"
            className="group relative block p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 z-10">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ease-in-out">
                <Chrome className="w-8 h-8 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300 ease-in-out" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white mb-3 flex items-center justify-center md:justify-start gap-2 transition-colors duration-300 ease-in-out">
                  Install Extension
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300 ease-in-out" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 ease-in-out text-base max-w-md">
                  Get started with our Chrome extension and elevate your
                  LinkedIn messaging experience.
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
          </Link>
        </div>
      </div>
    </main>
  );
}
