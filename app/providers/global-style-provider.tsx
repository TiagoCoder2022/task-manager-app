"use client";
import React from "react";
import styled from "styled-components";

interface GlobalStyleProviderProps {
  children: React.ReactNode;
}

function GlobalStyleProvider({ children }: GlobalStyleProviderProps) {
  return <GlobalStyles>{children} </GlobalStyles>;
}

const GlobalStyles = styled.div`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100%;
`;

export default GlobalStyleProvider;
