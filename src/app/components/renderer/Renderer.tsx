import { ConfigEntry } from '@/app/types/Config';
import { RendererType } from '@/app/types/RendererType';
import IdentifierRenderer from '@/app/components/renderer/patient/IdentifierRenderer';
import HumanNameRenderer from '@/app/components/renderer/patient/HumanNameRenderer';
import DefaultRenderer from '@/app/components/renderer/common/DefaultRenderer';
import { ResourceUtils } from '@/app/components/renderer/ResourceUtils'; // TODO change back to fhir.ts (for more info go into the class)
import CodeableConceptRenderer from '@/app/components/renderer/condition/CodeableConceptRenderer';
import AddressRenderer from '@/app/components/renderer/patient/AddressRenderer';
import CodingRenderer from '@/app/components/renderer/CodingRenderer';
import ContactPointRenderer from '@/app/components/renderer/patient/ContactPointRenderer';

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
    switch (configEntry.renderer) {
      case RendererType.DEFAULT:
        return <DefaultRenderer value={value} configEntry={configEntry} />;
      case RendererType.HUMAN_NAME:
        return <HumanNameRenderer value={value} configEntry={configEntry} />;
      case RendererType.IDENTIFIER:
        return <IdentifierRenderer value={value} configEntry={configEntry} />;
      case RendererType.ADDRESS:
        return <AddressRenderer value={value} configEntry={configEntry} />;
      case RendererType.CODEABLE_CONCEPT:
        return (
          <CodeableConceptRenderer value={value} configEntry={configEntry} />
        );
      case RendererType.CODING:
        return <CodingRenderer value={value} configEntry={configEntry} />;
      case RendererType.CONTACT_POINT:
        return <ContactPointRenderer value={value} configEntry={configEntry} />;
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
