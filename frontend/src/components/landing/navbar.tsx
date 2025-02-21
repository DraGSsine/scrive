"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import Link from "next/link";

const links = {
  testimonials: "Testimonials",
  howItWorks: "How it Works",
  pricing: "Pricing",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300  ",
        hasScrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[9vh] items-center justify-between">
        <Logo size={40} mode="dark" />

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-8">
                {Object.entries(links).map(([key, value]) => (
                  <NavigationMenuItem key={key}>
                    <NavigationMenuLink
                      href={`#${key}`}
                      className="text-zinc-600 hover:text-zinc-800 transition-colors"
                    >
                      {value}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    className="text-violet-500 hover:text-violet-500 bg-white/30 text-md font-semibold bg-white rounded-full border border-violet-400"
                    asChild
                  >
                    <NavigationMenuLink href="/auth/signin">
                      Sign In
                    </NavigationMenuLink>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    className="bg-violet-500 hover:bg-violet-600 rounded-full text-white text-md font-semibold"
                    asChild
                  >
                    <NavigationMenuLink href="/auth/signup">
                      Try it free
                    </NavigationMenuLink>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden bg-white hover:bg-white "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-zinc-700" />
            ) : (
              <Menu className="h-6 w-6 text-zinc-700" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-40 w-[280px] bg-white shadow-xl transition-transform duration-300 ease-in-out transform md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-end px-4">
          <Button className=" bg-white hover:bg-white" onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6 text-zinc-700" />
          </Button>
        </div>
        <div className="px-4 pb-6">
          {Object.entries(links).map(([key, value]) => (
            <Link
              key={key}
              href={`#${key}`}
              className="block px-3 py-2 text-base text-zinc-600 hover:text-zinc-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {value}
            </Link>
          ))}
          <div className="mt-6 space-y-4 px-3">
            <Button
              variant="ghost"
              className="w-full justify-center text-violet-500 hover:text-violet-600 hover:bg-violet-50 border border-violet-200"
              asChild
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button
              className="w-full bg-violet-500 hover:bg-violet-600 text-white"
              asChild
            >
              <Link href="/auth/signup">Try it free</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;