// IPSViewer.tsx
import React, { useState } from 'react';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import { Patient } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/patient';
import { Medication } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/medication';
import PatientSection from './PatientSection';
import MedicationSection from './MedicationSection';
import BaseAccordion from './BaseAccordion';
import { AccordionTabChangeEvent } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { BundleUtils } from '@smile-cdr/fhirts';

interface IPSViewerProps {
  bundle: Bundle;
}

const IPSViewer: React.FC<IPSViewerProps> = ({ bundle }) => {
  const [activeIndex, setActiveIndex] = useState<number | number[]>(0);
  const bundleUtils = new BundleUtils();

  const patient: Patient = bundleUtils.getResources(bundle.entry!, 'Patient')[0]
    .resource as Patient;

  const medications: Medication[] = bundleUtils
    .getResources(bundle.entry!, 'Medication')
    .map((entry: any) => entry.resource as Medication);

  const handleTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };
  const handleSectionClick = (index: number) => {
    setActiveIndex(index);
  };

  const accordionSections = [
    {
      title: 'Patient Information',
      content: <PatientSection patient={patient} />,
      numResources: 1,
    },
    {
      title: 'Medications',
      content: <MedicationSection medications={medications} />,
      numResources: medications.length,
    },
    // TBD add other sections
  ];

  return (
    <div>
      {/* Table of Contents */}
      <div className="flex flex-wrap justify-content-end gap-2 mb-3">
        <ul>
          {accordionSections.map((section, index) => (
            <li key={index}>
              <Button onClick={() => handleSectionClick(index)} outlined>
                {section.title} {section.numResources}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {/* Accordion */}
      <BaseAccordion
        sections={accordionSections}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default IPSViewer;
