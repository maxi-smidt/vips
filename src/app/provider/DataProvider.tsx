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
}

export const DataContext = createContext<DataContextType>({
  expanded: true,
  setExpanded: () => {},
});

export default function DataProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <DataContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </DataContext.Provider>
  );
}
