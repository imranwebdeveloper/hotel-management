"use client";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAction, setId, setTitle, showModal } from "@/store/globalSlice";
import { useSession } from "next-auth/react";

const HotelCardAction = ({ id, name }: { id: string; name: string }) => {
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEdit = () => {
    router.push(`/hotels/manage/${id}`);
  };
  if (!session?.data) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch(showModal("HOTEL"));
            dispatch(setAction("DELETE"));
            dispatch(setId(id));
            dispatch(setTitle(name));
          }}
          className="text-destructive focus:text-destructive"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HotelCardAction;
