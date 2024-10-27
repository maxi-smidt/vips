export const getLink = (systemURL: string, codingValue: string): string => {
  if (systemURL.startsWith('http://terminology.hl7.org/fhir')) {
    return systemURL;
  }

  const linkMap: Record<string, (codingValue: string) => string> = {
    'http://snomed.info/sct': (codingValue) =>
      `https://browser.ihtsdotools.org/?perspective=full&conceptId1=${codingValue}&edition=MAIN/2024-10-01&release=&languages=en`,
    'http://loinc.org': (codingValue) => `http://loinc.org/${codingValue}`,
    'http://hl7.org/fhir/sid/icd-10': (codingValue) =>
      `https://www.icd-code.de/icd/code/${codingValue.split('.')[0]}.-.html`,
  };

  return linkMap[systemURL]?.(codingValue) || '#';
};
