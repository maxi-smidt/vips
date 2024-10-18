import { Config } from '@/app/types/Config';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { RendererType } from '@/app/types/RendererType';

interface CustomConfigContextType {
  customConfig: Config;
  setCustomConfig: Dispatch<SetStateAction<Config>>;
}

export const CustomConfigContext = createContext<CustomConfigContextType>({
  customConfig: {},
  setCustomConfig: () => {},
});

export default function CustomConfigProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [customConfig, setCustomConfig] = useState<Config>({
    Patient: {
      icon: '',
      section: {
        renderers: [
          {
            path: 'testPath1',
            display: 'testDisplay1',
            renderer: RendererType.DEFAULT,
          },
          {
            path: 'testPath2',
            display: 'testDisplay2',
            renderer: RendererType.DEFAULT,
          },
          {
            title: 'Section2',
            renderers: [
              {
                path: 'testPath3',
                display: 'testDisplay3',
                renderer: RendererType.DEFAULT,
              },
              {
                path: 'testPath4',
                display: 'testDisplay4',
                renderer: RendererType.DEFAULT,
              },
            ],
          },
        ],
      },
    },
    Condition: {
      icon: '',
      section: {
        renderers: [
          {
            path: 'testPath1',
            display: 'testDisplay1',
            renderer: RendererType.DEFAULT,
          },
          {
            path: 'testPath2',
            display: 'testDisplay2',
            renderer: RendererType.DEFAULT,
          },
        ],
      },
    },
  });

  return (
    <CustomConfigContext.Provider value={{ customConfig, setCustomConfig }}>
      {children}
    </CustomConfigContext.Provider>
  );
}
