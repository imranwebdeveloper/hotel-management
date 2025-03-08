import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  return (
    <>
      {children}
      {modal}
    </>
  );
}
