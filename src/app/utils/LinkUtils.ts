export const SNOMED_SYSTEM = 'http://snomed.info/sct';
export const LOINC_SYSTEM = 'http://loinc.org/';
export const ICD10_SYSTEM = 'http://hl7.org/fhir/sid/icd-10';
export const HL7_TERMINOLOGY_SYSTEM = 'http://terminology.hl7.org/';

export const SNOMED_URL =
  'https://browser.ihtsdotools.org/?perspective=full&conceptId1=';
export const LOINC_URL = 'http://loinc.org/';
export const ICD10_URL = 'https://www.icd-code.de/icd/code/';

export const isValidSystemURL = (url: string): boolean => {
  const validSystems = [
    SNOMED_SYSTEM,
    LOINC_SYSTEM,
    ICD10_SYSTEM,
    HL7_TERMINOLOGY_SYSTEM,
  ];
  return validSystems.includes(url);
};

export const getLink = (systemURL: string, codingValue: string): string => {
  if (!isValidSystemURL(systemURL)) {
    return '#';
  }

  if (systemURL.startsWith(HL7_TERMINOLOGY_SYSTEM)) {
    return systemURL;
  }

  const linkMap: Record<string, (codingValue: string) => string> = {
    [SNOMED_SYSTEM]: (codingValue) =>
      `${SNOMED_URL}${codingValue}&edition=MAIN/2024-10-01&release=&languages=en`,
    [LOINC_SYSTEM]: (codingValue) => `${LOINC_URL}${codingValue}`,
    [ICD10_SYSTEM]: (codingValue) =>
      `${ICD10_URL}${codingValue.split('.')[0]}.-.html`,
  };

  return linkMap[systemURL]?.(codingValue) || '#';
};
