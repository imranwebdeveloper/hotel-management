import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Property } from "@prisma/client";

import HotelCardAction from "./HotalCardAction";
import Image from "next/image";

interface HotelCardProps {
  hotel: Property;
  showAction?: boolean;
}

export function HotelCard({ hotel, showAction }: HotelCardProps) {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative h-32">
        <Image
          src={hotel.imageUrl || "/no.png"}
          alt={hotel.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center">
            {showAction && <HotelCardAction id={hotel.id} name={hotel.name} />}
          </div>
          {/* <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{hotel.rating.toFixed(1)}</span>
          </div> */}
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
          {hotel.address}
        </p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium">
            ${hotel.costPerNight}{" "}
            <span className="text-sm text-muted-foreground">per night</span>
          </p>
          <p className="text-sm">{hotel.availableRooms} rooms available</p>
        </div>
      </CardContent>
      <CardFooter className=" pt-0 flex gap-2">
        <Link
          href={`/hotels/${hotel.id}`}
          className={buttonVariants({ className: "w-full" })}
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
