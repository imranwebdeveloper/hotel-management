import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground mt-4 max-w-md">
        The page you are looking for does not exist.
      </p>
      <div className="flex gap-4 mt-8">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
