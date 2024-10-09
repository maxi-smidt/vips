import React, { useState } from 'react';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import PatientSection from './PatientSection';
import MedicationSection from './MedicationSection';
import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from 'primereact/accordion';
import { Button } from 'primereact/button';

interface IPSViewerProps {
  bundle: Bundle;
}

export default function IPSViewer({ bundle }: IPSViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | number[]>(0);

  const onTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  const accordionSections = [
    {
      title: 'Patient Information',
      content: <PatientSection bundle={bundle} />,
      numResources: 1,
    },
    {
      title: 'Medications',
      content: <MedicationSection bundle={bundle} />,
      numResources: 2,
    },
    // TODO add other sections
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-content-end gap-2 mb-3">
        <ul>
          {accordionSections.map((section, index) => (
            <li key={index}>
              <Button onClick={() => setActiveIndex(index)} outlined>
                {section.title} {section.numResources}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Accordion multiple activeIndex={activeIndex} onTabChange={onTabChange}>
        {accordionSections.map((section, index) => (
          <AccordionTab key={index} header={section.title}>
            {section.content}
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
}
