import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/authMiddleware";
import { User } from "@prisma/client";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function GET(request: Request, { params }: Props) {
  const currParams = await params;

  try {
    const hotel = await prisma.property.findUnique({
      where: { id: currParams.id },
    });

    if (!hotel) {
      return NextResponse.json(
        { error: "Hotel not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: hotel, success: true, message: "Hotel fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch hotel details", success: false, error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json(
        { message: "Not logged in", success: false },
        { status: 401 }
      );
    }
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
    const currParams = await params;
    const updatedHotel = await prisma.property.update({
      where: { id: currParams.id },
      data: {
        name,
        address,
        costPerNight,
        availableRooms,
        imageUrl,
        rating,
        description,
      },
    });

    return NextResponse.json(
      {
        data: updatedHotel,
        message: "Hotel updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update hotel", success: false, error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json(
        { message: "Not logged in", success: false },
        { status: 401 }
      );
    }
    const currId = await params;
    const currUser = session.user as User;

    await prisma.property.delete({
      where: { id: currId?.id, ownerId: currUser.id },
    });

    return NextResponse.json({
      message: "Hotel deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete hotel", success: false, error },
      { status: 500 }
    );
  }
}
