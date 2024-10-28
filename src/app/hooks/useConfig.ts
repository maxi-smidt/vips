'use client';

import { Config } from '../types/Config';
import { useContext, useEffect } from 'react';
import { DefaultConfigEN } from '@/app/config/default_config_en';
import { useToast } from '@/app/hooks/useToast';
import { ConfigContext } from '@/app/provider/ConfigProvider';

export default function useConfig() {
  const { showError } = useToast();
  const { config, defaultConfig, setConfig } = useContext(ConfigContext);

  useEffect(() => {
    if (shouldUseCustom()) {
      loadCustomConfig(false);
    } else {
      loadDefaultConfig();
    }
  }, []);

  const loadCustomConfig = (showMessage: boolean = true) => {
    if (typeof window !== 'undefined') {
      const customConfig = localStorage.getItem('customConfig');
      if (customConfig) {
        let parsedConfig = undefined;
        try {
          parsedConfig = JSON.parse(customConfig);
          setConfig(parsedConfig);
        } catch (_) {
          if (showMessage) showError('Custom configuration format was no JSON');
        }
      } else {
        if (showMessage) showError('No custom configuration found');
      }
    }
    localStorage.setItem('useCustom', 'true');
  };

  const shouldUseCustom = () => {
    return localStorage.getItem('useCustom') === 'true';
  };

  const saveCustomConfig = (config: Config) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('customConfig', JSON.stringify(config));
    }
  };

  const clearCustomConfig = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customConfig');
      setConfig(DefaultConfigEN);
    }
  };

  const loadDefaultConfig = () => {
    localStorage.setItem('useCustom', 'false');
    setConfig(DefaultConfigEN);
  };

  return {
    config,
    defaultConfig,
    loadCustomConfig,
    loadDefaultConfig,
    clearCustomConfig,
    saveCustomConfig,
  };
}
