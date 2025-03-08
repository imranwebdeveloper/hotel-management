"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const routes = [
    {
      href: "/hotels",
      label: "Manage Hotels",
      active: pathname === "/hotels",
      auth: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container  mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            {/* <Hotel className="h-6 w-6" /> */}
            <span className="font-bold text-xl">Hotel Sys</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className=" flex items-center gap-6">
          {routes.map((route) => {
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className=" flex items-center gap-4">
          {session ? (
            <Button variant={"destructive"} onClick={() => signOut()}>
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Login
              </Link>
              <Link href="/register" className={buttonVariants({ size: "sm" })}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
