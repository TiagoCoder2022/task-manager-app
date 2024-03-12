"use client";
import React from "react";
import { GlobalProvider } from "../context/global-provider";
import { Toaster } from "react-hot-toast";

interface ContextProviderProps {
  children: React.ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div>
      <GlobalProvider>
        <Toaster />
        {children}
      </GlobalProvider>
    </div>
  );
}

export default ContextProvider;
