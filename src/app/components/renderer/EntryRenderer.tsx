import { ConfigEntry } from '@/app/types/Config';
import { RendererType } from '@/app/types/RendererType';
import IdentifierRenderer from '@/app/components/renderer/fhir/IdentifierRenderer';
import HumanNameRenderer from '@/app/components/renderer/fhir/HumanNameRenderer';
import DefaultRenderer from '@/app/components/renderer/fhir/DefaultRenderer';
import CodeableConceptRenderer from '@/app/components/renderer/fhir/CodeableConceptRenderer';
import AddressRenderer from '@/app/components/renderer/fhir/AddressRenderer';
import CodingRenderer from '@/app/components/renderer/fhir/CodingRenderer';
import ContactPointRenderer from '@/app/components/renderer/fhir/ContactPointRenderer';
import { useBundle } from '@/app/hooks/useBundle';
import LinkRenderer from '@/app/components/renderer/fhir/LinkRenderer';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';
import { ResourceUtils } from '@/app/utils/ResourceUtils';

const resourceUtils = new ResourceUtils();

interface RendererProps {
  configEntry: ConfigEntry;
  resource: Resource;
}

export default function EntryRenderer({
  configEntry,
  resource,
}: RendererProps) {
  const { getResourceByReference } = useBundle();
  const values = isReference()
    ? getReference()
    : getNoneReference(configEntry.path);

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
      case RendererType.LINK:
        return <LinkRenderer value={value} configEntry={configEntry} />;
    }
  };

  return (
    <div id={configEntry.path}>
      {values.map((value, index) => (
        <div key={`${configEntry.path}-${index}`}>{getRenderer(value)}</div>
      ))}
    </div>
  );

  function isReference() {
    return configEntry.path.indexOf(':') > -1;
  }

  function getNoneReference(path: string) {
    return resourceUtils.getValuesAtResourcePath(resource, path);
  }

  function getReference() {
    const [referencePath, valuePath] = configEntry.path.split(':');
    const values = resourceUtils.getValuesAtResourcePath(
      resource,
      referencePath,
    );

    if (values.length === 0) return [];
    const reference: string = values[0].reference;

    const referencedResource = getResourceByReference(reference);
    return resourceUtils.getValuesAtResourcePath(referencedResource, valuePath);
  }
}
