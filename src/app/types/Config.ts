import { RendererType } from '@/app/types/RendererType';

export interface Config {
  [resource: string]: ConfigResource;
}

export interface ConfigResource {
  icon: string;
  section: ConfigSection;
}

export interface ConfigSection {
  title?: string;
  renderers: (ConfigSection | ConfigEntry)[];
}

export interface ConfigEntry {
  display: string;
  path: string;
  renderer: RendererType;
}

export function isConfigEntry(
  entry: ConfigSection | ConfigEntry,
): entry is ConfigEntry {
  return (
    (entry as ConfigEntry).renderer !== undefined &&
    (entry as ConfigEntry).path !== undefined &&
    (entry as ConfigEntry).display !== undefined
  );
}

export function isConfigSection(
  section: ConfigSection | ConfigEntry,
): section is ConfigSection {
  return !isConfigEntry(section);
}
