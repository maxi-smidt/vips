import configData from '../config/config_de.json';
import { Config } from '@/app/types/Config';

const typedConfig: Config = configData as unknown as Config;

export default function useConfig() {
  return { config: typedConfig };
}
