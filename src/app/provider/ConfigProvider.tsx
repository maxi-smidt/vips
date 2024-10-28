'use client';

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { DefaultConfigEN } from '@/app/config/default_config_en';
import { Config } from '../types/Config';

interface ConfigContextType {
  defaultConfig: Config;
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}

export const ConfigContext = createContext<ConfigContextType>({
  config: DefaultConfigEN,
  defaultConfig: DefaultConfigEN,
  setConfig: () => {},
});

export default function ConfigProvider({ children }: { children: ReactNode }) {
  const defaultConfig = DefaultConfigEN;
  const [config, setConfig] = useState<Config>(defaultConfig);

  return (
    <ConfigContext.Provider value={{ config, defaultConfig, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}
