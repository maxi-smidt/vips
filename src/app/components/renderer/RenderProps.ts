import { ConfigEntry } from '@/app/types/Config';

export interface RenderProps {
  value: unknown;
  configEntry: ConfigEntry;
  pdf?: boolean;
}
