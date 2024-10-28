export const SNOMED_SYSTEM = 'http://snomed.info/sct';
export const LOINC_SYSTEM = 'http://loinc.org';
export const ICD10_SYSTEM = 'http://hl7.org/fhir/sid/icd-10';
export const HL7_TERMINOLOGY_SYSTEM = 'http://terminology.hl7.org';
export const HL7_SYSTEM = 'http://hl7.org/fhir';

export const SNOMED_URL =
  'https://browser.ihtsdotools.org/?perspective=full&conceptId1=';
export const LOINC_URL = 'http://loinc.org/';
export const ICD10_URL = 'https://www.icd-code.de/icd/code/';

const DEFINED_URLS = [
  SNOMED_SYSTEM,
  LOINC_SYSTEM,
  ICD10_SYSTEM,
  HL7_TERMINOLOGY_SYSTEM,
];

export const isDefinedSystem = (systemUrl: string): boolean =>
  DEFINED_URLS.includes(systemUrl) ||
  systemUrl.startsWith(HL7_TERMINOLOGY_SYSTEM) ||
  systemUrl.startsWith(HL7_SYSTEM);

export const getLink = (systemURL: string, codingValue: string): string => {
  if (!isDefinedSystem(systemURL)) return null;

  if (systemURL.startsWith(HL7_TERMINOLOGY_SYSTEM)) return systemURL;

  const linkGenerators: Record<string, (value: string) => string> = {
    [SNOMED_SYSTEM]: (value) =>
      `${SNOMED_URL}${value}&edition=MAIN/2024-10-01&release=&languages=en`,
    [LOINC_SYSTEM]: (value) => `${LOINC_URL}${value}`,
    [ICD10_SYSTEM]: (value) => `${ICD10_URL}${value.split('.')[0]}.-.html`,
    [HL7_TERMINOLOGY_SYSTEM]: () => HL7_TERMINOLOGY_SYSTEM,
  };

  return linkGenerators[systemURL]?.(codingValue) || '#';
};
