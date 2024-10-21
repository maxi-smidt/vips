'use client';

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';

interface BundleContextType {
  bundle: Bundle | undefined;
  setBundle: Dispatch<SetStateAction<Bundle | undefined>>;
}

export const BundleContext = createContext<BundleContextType>({
  bundle: undefined,
  setBundle: () => {},
});

export default function BundleProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<Bundle | undefined>();

  return (
    <BundleContext.Provider value={{ bundle, setBundle }}>
      {children}
    </BundleContext.Provider>
  );
}
