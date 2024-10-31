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
  activeTabs: number[];
  setActiveTabs: Dispatch<SetStateAction<number[]>>;
}

export const DataContext = createContext<DataContextType>({
  expanded: true,
  setExpanded: () => {},
  activeTabs: [],
  setActiveTabs: () => {},
});

export default function DataProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [activeTabs, setActiveTabs] = useState<number[]>([]);

  return (
    <DataContext.Provider
      value={{ expanded, setExpanded, activeTabs, setActiveTabs }}
    >
      {children}
    </DataContext.Provider>
  );
}
