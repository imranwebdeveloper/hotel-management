/* eslint-disable @typescript-eslint/no-explicit-any */
import { Property } from "@prisma/client";
import { ApiResponse } from "@/types";
import getData from "@/lib/fetcher";
import { HotelCard } from "@/components/hotel-card";
import { PaginationControls } from "@/components/pagination-controls";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DeleteHotelDialog } from "@/components/delete-hotel-dialog";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = () => ({
  title: "Hotels",
});
const Hotels = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const session: any = await getServerSession(authOptions);

  const page = parseInt(params?.page?.toString() || "1");
  const data = await getData<ApiResponse<Property[]>>(
    `/api/hotels?page=${page}`,
    {
      headers: session
        ? { authorization: `Bearer ${session?.user?.accessToken}` }
        : {},
    }
  );
  return (
    <div className="space-y-8">
      <section className="space-y-8">
        <div>
          {session && (
            <div className="bg-red-100 rounded p-4">
              <p className="text-lg font-extrabold">
                You are authenticated : {session?.user?.email}
              </p>
              <p className="text-red-500">
                You Will see all the hotels that you have created
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Hotels</h1>
          {session && (
            <Link href="/hotels/manage/new" className={buttonVariants()}>
              <Plus className=" h-4 w-4" />
              Create Hotel
            </Link>
          )}
        </div>
        {data?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-4xl font-bold">No Hotels Found</h1>
            <p className="text-muted-foreground mt-4 max-w-md">
              You have no hotels yet. Create a new one.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.data?.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} showAction />
          ))}
        </div>
      </section>
      <PaginationControls
        currentPage={data?.pagination?.currentPage || 1}
        totalPages={data?.pagination?.total}
      />
      <DeleteHotelDialog />
    </div>
  );
};

export default Hotels;
