'use client';

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface DataContextType {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  activeIndexes: number[];
  setActiveIndexes: Dispatch<SetStateAction<number[]>>;
}

export const DataContext = createContext<DataContextType>({
  expanded: true,
  setExpanded: () => {},
  activeIndexes: [],
  setActiveIndexes: () => {},
});

export default function DataProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  return (
    <DataContext.Provider
      value={{ expanded, setExpanded, activeIndexes, setActiveIndexes }}
    >
      {children}
    </DataContext.Provider>
  );
}
