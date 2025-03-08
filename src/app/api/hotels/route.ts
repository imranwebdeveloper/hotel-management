import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/authMiddleware";
import { verifyAccessToken } from "@/lib/jwt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 8;
  const skip = (page - 1) * limit;
  const authorization = request.headers.get("authorization");
  const token = authorization?.split(" ")[1];
  let where: { ownerId?: string } = {};
  if (token) {
    const user = verifyAccessToken(token);
    where = { ownerId: user.id };
  }

  try {
    const hotels = await prisma.property.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      where: where,
    });

    const totalHotels = await prisma.property.count({ where });
    const totalPages = Math.ceil(totalHotels / limit);

    return NextResponse.json(
      {
        success: true,
        message: "Hotels fetched successfully",
        data: hotels,
        pagination: {
          perPage: limit,
          total: totalPages,
          currentPage: page,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch hotels", error, success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await requireAuth();
    const ownerId = session?.user?.id as string;

    const body = await request.json();
    const {
      name,
      address,
      costPerNight,
      availableRooms,
      imageUrl,
      rating,
      description,
    } = body;

    const newHotel = await prisma.property.create({
      data: {
        name,
        address,
        costPerNight,
        availableRooms,
        imageUrl,
        rating,
        ownerId,
        description,
      },
    });

    return NextResponse.json(
      { data: newHotel, success: true, message: "Hotel created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json(
      { message: "Failed to create hotel", error, success: false },
      { status: 500 }
    );
  }
}
