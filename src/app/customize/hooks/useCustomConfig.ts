import { useContext } from 'react';
import { CustomConfigContext } from '@/app/customize/provider/CustomConfigProvider';
import {
  ConfigSection,
  ConfigComponent,
  isConfigSection,
  Config,
} from '@/app/types/Config';

export default function useCustomConfig() {
  const { customConfig, setCustomConfig } = useContext(CustomConfigContext);
  const deleteComponent = (resourceKey: string, path: number[]) => {
    let deletedComponent: ConfigComponent;

    const updatedConfig = ((prevConfig: Config) => {
      const newConfig = JSON.parse(JSON.stringify(prevConfig));
      let section: ConfigSection = newConfig[resourceKey].section;
      for (let i = 0; i < path.length - 1; i++) {
        const component = section.components[path[i]];
        if (!isConfigSection(component)) {
          throw new Error('Invalid component detected');
        }
        section = component;
      }

      const lastIndex = path[path.length - 1];
      deletedComponent = section.components[lastIndex];

      section.components.splice(lastIndex, 1);

      return newConfig;
    })(customConfig);

    setCustomConfig(updatedConfig);

    return deletedComponent;
  };

  const insertComponent = (
    resourceKey: string,
    path: number[],
    component: ConfigComponent,
  ) => {
    setCustomConfig((prevConfig) => {
      const newConfig = JSON.parse(JSON.stringify(prevConfig));
      let section: ConfigSection = newConfig[resourceKey].section;
      for (let i = 0; i < path.length - 1; i++) {
        const component = section.components[path[i]];
        if (!isConfigSection(component)) {
          if (i < path.length - 1)
            // only the last element should be an entry
            throw new Error('Invalid component detected');
          break;
        }
        if (component) {
          section = component;
        }
      }
      const lastIndex = path[path.length - 1];
      section.components.splice(lastIndex, 0, component);
      return newConfig;
    });
  };

  const moveComponent = (
    sourceResourceKey: string,
    targetResourceKey: string,
    sourcePath: number[],
    targetPath: number[],
  ) => {
    if (!isNeighbour(targetPath, sourcePath)) {
      const component = deleteComponent(sourceResourceKey, sourcePath);
      insertComponent(targetResourceKey, targetPath, component);
    }
  };

  const isNeighbour = (firstPath: number[], secondPath: number[]) => {
    if (firstPath.length !== secondPath.length) return false;
    const firstIndex = firstPath[firstPath.length - 1];
    const secondIndex = secondPath[secondPath.length - 1];
    return firstIndex === secondIndex || secondIndex === firstIndex - 1;
  };

  return {
    customConfig,
    setCustomConfig,
    deleteComponent,
    insertComponent,
    moveComponent,
    isNeighbour,
  };
}
