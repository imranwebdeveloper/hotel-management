import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Feature from "./Feature";
import { Suspense } from "react";
import Spinner from "@/components/ui/spiner";

export const generateMetadata = () => ({
  title: "Hotel Management System",
});
const Home = async () => {
  return (
    <div className="space-y-8">
      <section className="py-12 space-y-4">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Hotel Management System
        </h1>
        <p className="text-xl text-center text-muted-foreground">
          Find and manage the best hotels around the world
        </p>
      </section>

      <section className="py-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-6">Featured Hotels</h2>
          <Link href="/hotels" className={buttonVariants({ size: "sm" })}>
            View All
          </Link>
        </div>
        <Suspense fallback={<Spinner></Spinner>}>
          <Feature />
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
