"use client";

import type React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reduxStore";
import { hideModal } from "@/store/globalSlice";
import api from "@/store/reduxApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteHotelDialog() {
  const { action, id, title, modal } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [deleteHotel, { isLoading }] = api.useDeleteHotelMutation();

  const handleDelete = async () => {
    try {
      if (id) {
        const res = await deleteHotel(id as string).unwrap();
        if (res.success) {
          dispatch(hideModal());
          toast.success(res.message);
          router.refresh();
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.massage || "Something went wrong");
    }
  };

  return (
    <>
      <AlertDialog
        open={action === "DELETE" && modal === "HOTEL"}
        onOpenChange={() => {
          dispatch(hideModal());
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold">{title}</span> and all associated
              data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
