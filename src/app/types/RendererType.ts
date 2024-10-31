import AnnotationRenderer from '@/app/components/renderer/fhir/AnnotationRenderer';
import DefaultRenderer from '@/app/components/renderer/fhir/DefaultRenderer';
import IdentifierRenderer from '@/app/components/renderer/fhir/IdentifierRenderer';
import HumanNameRenderer from '@/app/components/renderer/fhir/HumanNameRenderer';
import AddressRenderer from '@/app/components/renderer/fhir/AddressRenderer';
import CodeableConceptRenderer from '@/app/components/renderer/fhir/CodeableConceptRenderer';
import CodingRenderer from '@/app/components/renderer/fhir/CodingRenderer';
import ContactPointRenderer from '@/app/components/renderer/fhir/ContactPointRenderer';
import LinkRenderer from '@/app/components/renderer/fhir/LinkRenderer';
import PeriodRenderer from '../components/renderer/fhir/PeriodRenderer';
import QuantityRenderer from '../components/renderer/fhir/QuantityRenderer';
import JsonRenderer from '../components/renderer/fhir/JsonRenderer';
import TimingRenderer from '@/app/components/renderer/fhir/TimingRenderer';

export enum RendererType {
  ANNOTATION = 'AnnotationRenderer',
  DEFAULT = 'DefaultRenderer',
  IDENTIFIER = 'IdentifierRenderer',
  HUMAN_NAME = 'HumanNameRenderer',
  ADDRESS = 'AddressRenderer',
  CODEABLE_CONCEPT = 'CodeableConceptRenderer',
  CODING = 'CodingRenderer',
  CONTACT_POINT = 'ContactPointRenderer',
  LINK = 'LinkRenderer',
  PERIOD = 'PeriodRenderer',
  QUANTITY = 'QuantityRenderer',
  JSON = 'JsonRenderer',
  TIMING = 'TimingRenderer',
}

export const rendererMap = {
  [RendererType.ANNOTATION]: AnnotationRenderer,
  [RendererType.DEFAULT]: DefaultRenderer,
  [RendererType.IDENTIFIER]: IdentifierRenderer,
  [RendererType.HUMAN_NAME]: HumanNameRenderer,
  [RendererType.ADDRESS]: AddressRenderer,
  [RendererType.CODEABLE_CONCEPT]: CodeableConceptRenderer,
  [RendererType.CODING]: CodingRenderer,
  [RendererType.CONTACT_POINT]: ContactPointRenderer,
  [RendererType.LINK]: LinkRenderer,
  [RendererType.PERIOD]: PeriodRenderer,
  [RendererType.QUANTITY]: QuantityRenderer,
  [RendererType.JSON]: JsonRenderer,
  [RendererType.TIMING]: TimingRenderer,
};
