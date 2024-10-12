import { RendererType } from '@/app/types/RendererType';

export interface Config {
  [resource: string]: ConfigEntry[];
}

export interface ConfigEntry {
  display: string;
  path: string;
  type: RendererType;
}
