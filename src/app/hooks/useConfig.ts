'use client';

import { Config } from '../types/Config';
import { useEffect, useState } from 'react';
import { DefaultConfigEN } from '@/app/config/default_config_en';

export default function useConfig() {
  const [config, setConfig] = useState<Config>(DefaultConfigEN);
  const [defaultConfig] = useState<Config>(DefaultConfigEN);

  useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    if (typeof window !== 'undefined') {
      const customConfig = localStorage.getItem('customConfig');
      if (customConfig) {
        setConfig(JSON.parse(customConfig));
      }
    }
  };

  return {
    config,
    defaultConfig,
    reload,
  };
}
