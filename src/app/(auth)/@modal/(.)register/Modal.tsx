"use client";

import { RegisterForm } from "@/components/register-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function RModal() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-md">
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
}
