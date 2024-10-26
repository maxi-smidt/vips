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
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number | number[]>>;
}

export const DataContext = createContext<DataContextType>({
  expanded: true,
  setExpanded: () => {},
  activeIndex: 0,
  setActiveIndex: () => {},
});

export default function DataProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number | number[]>(0);

  return (
    <DataContext.Provider
      value={{ expanded, setExpanded, activeIndex, setActiveIndex }}
    >
      {children}
    </DataContext.Provider>
  );
}
