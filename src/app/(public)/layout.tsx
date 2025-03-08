import { Footer } from "@/components/Footer";
import Header from "@/components/header";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="max-w-7xl py-6 px-4 mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default PublicLayout;
