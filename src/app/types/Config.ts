import { RendererType } from '@/app/types/RendererType';

export interface Config {
  [resource: string]: ConfigResource;
}

export interface ConfigResource {
  icon: string;
  section: ConfigSection;
}

export type ConfigComponent = ConfigSection | ConfigEntry;

export interface ConfigSection {
  display?: string;
  components: ConfigComponent[];
}

export interface ConfigEntry {
  display: string;
  path: string;
  renderer: RendererType;
}

export function isConfigEntry(
  component: ConfigComponent,
): component is ConfigEntry {
  return (
    (component as ConfigEntry).renderer !== undefined &&
    (component as ConfigEntry).path !== undefined &&
    (component as ConfigEntry).display !== undefined
  );
}

export function isConfigSection(
  component: ConfigComponent,
): component is ConfigSection {
  return !isConfigEntry(component);
}
