import { useContext } from 'react';
import { CustomConfigContext } from '@/app/customize/provider/CustomConfigProvider';
import { ConfigSection, isConfigSection } from '@/app/types/Config';

export default function useCustomConfig() {
  const { customConfig, setCustomConfig } = useContext(CustomConfigContext);

  const deleteComponent = (resourceKey: string, path: number[]) => {
    console.log(resourceKey, path);
    setCustomConfig((prevConfig) => {
      const newConfig = JSON.parse(JSON.stringify(prevConfig));

      let current = newConfig[resourceKey].section.components;
      for (let i = 0; i < path.length - 1; i++) {
        const index = path[i];
        if (Array.isArray(current) && current[index]) {
          current = current[index].components;
        }
      }

      const lastIndex = path[path.length - 1];
      if (Array.isArray(current)) current.splice(lastIndex, 1);

      return newConfig;
    });
  };

  const insertSection = (
    resourceKey: string,
    path: number[],
    sectionTitle: string,
  ) => {
    setCustomConfig((prevConfig) => {
      const newConfig = JSON.parse(JSON.stringify(prevConfig));
      let section: ConfigSection = newConfig[resourceKey].section;
      for (let i = 0; i < path.length; i++) {
        const component = section.components[path[i]];
        if (isConfigSection(component)) {
          section = component;
        }
      }

      section.components.unshift({
        display: sectionTitle,
        components: [],
      });
      return newConfig;
    });
  };

  return {
    customConfig,
    setCustomConfig,
    deleteComponent,
    insertSection,
  };
}
