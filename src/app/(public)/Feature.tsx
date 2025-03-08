import { HotelCard } from "@/components/hotel-card";
import getData from "@/lib/fetcher";
import { ApiResponse } from "@/types";
import { Property } from "@prisma/client";
import React from "react";

const Feature = async () => {
  const data = await getData<ApiResponse<Property[]>>("/api/hotels");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data?.data?.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default Feature;
