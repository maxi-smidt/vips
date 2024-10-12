import { ConfigEntry } from '@/app/types/Config';
import { RendererType } from '@/app/types/RendererType';
import IdentifierRenderer from '@/app/components/renderer/IdentifierRenderer';
import HumanNameRenderer from '@/app/components/renderer/HumanNameRenderer';
import DefaultRenderer from '@/app/components/renderer/DefaultRenderer';
import { ResourceUtils } from '@/app/components/renderer/ResourceUtils'; // TODO change back to fhir.ts (for more info go into the class)

const resourceUtils = new ResourceUtils();

interface RendererProps {
  configEntry: ConfigEntry;
  resources: unknown[];
}

export default function Renderer({ configEntry, resources }: RendererProps) {
  const values = [];
  for (const resource of resources) {
    values.push(
      ...resourceUtils.getValuesAtResourcePath(resource, configEntry.path),
    );
  }

  const getRenderer = (value: unknown) => {
    switch (configEntry.type) {
      case RendererType.DEFAULT:
        return <DefaultRenderer value={value} configEntry={configEntry} />;
      case RendererType.HUMAN_NAME:
        return <HumanNameRenderer value={value} configEntry={configEntry} />;
      case RendererType.IDENTIFIER:
        return <IdentifierRenderer value={value} configEntry={configEntry} />;
    }
  };

  return (
    <div id={configEntry.path}>
      {values.map((value, index) => (
        <div key={`${configEntry.path}-${index}`}>{getRenderer(value)}</div>
      ))}
    </div>
  );
}
