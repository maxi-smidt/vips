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
    console.log('cc', customConfig);

    const updatedConfig = ((prevConfig: Config) => {
      console.log(prevConfig);

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
      console.log('deleted component inside 1', deletedComponent, Date.now());

      section.components.splice(lastIndex, 1);

      console.log('deleted component inside 2', deletedComponent, Date.now());
      return newConfig;
    })(customConfig);

    setCustomConfig(updatedConfig);

    console.log('deleted component outside ', deletedComponent, Date.now());

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

      for (let i = 0; i < path.length; i++) {
        const component = section.components[path[i]];
        if (!isConfigSection(component)) {
          throw new Error('Invalid component detected');
        }
        section = component;
      }

      section.components.unshift({
        display: component.display,
        components: [],
      });

      return newConfig;
    });
  };

  const moveComponent = (
    sourceResourceKey: string,
    targetResourceKey: string,
    sourcePath: number[],
    targetPath: number[],
  ) => {
    const component = deleteComponent(sourceResourceKey, sourcePath);
    console.log(component);
    insertComponent(targetResourceKey, targetPath, component);
  };

  return {
    customConfig,
    setCustomConfig,
    deleteComponent,
    insertComponent,
    moveComponent,
  };
}
