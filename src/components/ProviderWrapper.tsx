"use client";
import { store } from "@/store/reduxStore";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import Spinner from "./ui/spiner";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <SessionAwareComponent>{children}</SessionAwareComponent>
      </Provider>
    </SessionProvider>
  );
};

export default ProviderWrapper;

const SessionAwareComponent = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }
  console.log(session);

  return <>{children}</>;
};
