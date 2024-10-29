enum UrlType {
  SNOMED_URL = 'https://browser.ihtsdotools.org/?perspective=full&conceptId1=',
  LOINC_URL = 'http://loinc.org/',
  ICD10_URL = 'https://www.icd-code.de/icd/code/',
}

enum SystemUrlType {
  SNOMED_SYSTEM = 'http://snomed.info/sct',
  LOINC_SYSTEM = 'http://loinc.org',
  ICD10_SYSTEM = 'http://hl7.org/fhir/sid/icd-10',
  HL7_TERMINOLOGY_SYSTEM = 'http://terminology.hl7.org',
  HL7_SYSTEM = 'http://hl7.org/fhir',
}

export const getLink = (
  systemURL: string,
  codingValue: string,
): string | null => {
  if (systemURL.startsWith(SystemUrlType.HL7_TERMINOLOGY_SYSTEM))
    return systemURL;

  switch (systemURL as SystemUrlType) {
    case SystemUrlType.SNOMED_SYSTEM:
      return `${UrlType.SNOMED_URL}${codingValue}&edition=MAIN/2024-10-01&release=&languages=en`;
    case SystemUrlType.LOINC_SYSTEM:
      return `${UrlType.LOINC_URL}${codingValue}`;
    case SystemUrlType.ICD10_SYSTEM:
      return `${UrlType.ICD10_URL}${codingValue.split('.')[0]}.-.html`;
  }

  if (systemURL.startsWith(SystemUrlType.HL7_SYSTEM)) return systemURL;

  return null;
};
