"use client";
import React from "react";
import GlobalStyleProvider from "./global-style-provider";

interface ContextProviderProps {
  children: React.ReactNode;
}

function ContextProvider({ children }: ContextProviderProps) {
  return (
    <div>
      <GlobalStyleProvider>{children}</GlobalStyleProvider>
    </div>
  );
}

export default ContextProvider;
