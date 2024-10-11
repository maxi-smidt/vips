'use client';

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';

interface DataContextType {
  bundle: Bundle | undefined;
  setBundle: Dispatch<SetStateAction<Bundle | undefined>>;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextType>({
  bundle: undefined,
  setBundle: () => {},
  expanded: true,
  setExpanded: () => {},
});

export default function DataProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<Bundle | undefined>();
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <DataContext.Provider value={{ bundle, setBundle, expanded, setExpanded }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
