"use client";

import { LoginForm } from "@/components/login-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function LModal() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-md">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
