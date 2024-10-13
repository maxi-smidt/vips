import { DefaultConfigEN } from '@/app/config/default_config_en';
import { Config } from '../types/Config';

export default function useConfig() {
  const customConfig = localStorage.getItem('customConfig');
  return {
    config: customConfig
      ? (JSON.parse(customConfig) as Config)
      : DefaultConfigEN,
  };
}
