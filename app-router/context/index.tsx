"use client";

import { createContext, useContext, useState } from "react";

const CountContext = createContext<any>(null);

export function CountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

export function useCount() {
  return useContext(CountContext);
}
