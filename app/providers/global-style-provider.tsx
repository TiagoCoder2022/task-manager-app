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
  height: 100vh;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;

export default GlobalStyleProvider;
