import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";
import getData from "@/lib/fetcher";
import { ApiResponse } from "@/types";
import { Property } from "@prisma/client";
import { SocialShareButtons } from "@/components/SocialShare";

import { Metadata } from "next";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // No need to `await` params

  // Fetch hotel data
  const data = await getData<ApiResponse<Property>>(`/api/hotels/${id}`);
  const hotel = data?.data;

  // Handle case where hotel is not found
  if (!hotel) {
    return {
      title: "Hotel Not Found",
      description: "The requested hotel could not be found",
    };
  }

  // Return metadata for the hotel
  return {
    title: hotel.name,
    description: "Find and manage the best hotels around the world",
    openGraph: {
      images: hotel.imageUrl ? [hotel.imageUrl] : [],
    },
  };
}

export default async function HotelDetailsPage({ params }: Props) {
  const { id } = await params;

  const data = await getData<ApiResponse<Property>>(`/api/hotels/${id}`);
  const hotel = data?.data;

  if (!hotel) {
    notFound();
  }
  const fullUrl = `${process.env.NEXTAUTH_URL}/hotels/${hotel.id}`;

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src={hotel.imageUrl || "/no"}
              alt={hotel.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.address},</span>
              </div>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(hotel.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 fill-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({hotel.rating.toFixed(1)})
                </span>
              </div>
            </div>
            <SocialShareButtons
              url={fullUrl}
              title={`Check out ${hotel.name}`}
            />
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">About this hotel</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {hotel.description}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span>{hotel.availableRooms} Rooms Available</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                <span>No Prepayment Needed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Details</CardTitle>
              <CardDescription>Per night stay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Price</span>
                  <span>${hotel.costPerNight.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span>Taxes & Fees</span>
                  <span>${(hotel.costPerNight * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>${(hotel.costPerNight * 1.1).toFixed(2)}</span>
                </div>
                <Button className="w-full">Book Now</Button>
                {/* {isOwner && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/hotels/${hotel.id}/edit`}>Edit Hotel</Link>
                  </Button>
                )} */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <span>
                    info@{hotel.name.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  <span>
                    {hotel.name.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
