"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Hotel,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between flex-col md:flex-row gap-8">
          {/* Company Info */}
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <Hotel className="h-6 w-6" />
              <span className="font-bold text-xl">Hotel Sys</span>
            </div>
            <p className="text-muted-foreground">
              Providing exceptional hotel management solutions since 2023. Find
              and manage the best hotels around the world.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">contact@hotelmanagement.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">123 Hotel Street, City, Country</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 flex-1">
            <h3 className="font-semibold text-lg">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-muted-foreground">
              Stay updated with the latest news, special offers, and hotel
              management tips.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email address"
                type="email"
                className="max-w-[220px]"
              />
              <Button size="sm" className="px-2">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-4 pt-2">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hotel Management System. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
