'use client';

import React, { useEffect, useState } from 'react';
import VipsSideBar from '@/app/components/sidebar/VipsSideBar';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import { BundleUtils } from '@smile-cdr/fhirts';
import { Patient } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/patient';

export default function Main({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useState<Bundle>();
  const bundleUtils = new BundleUtils();

  useEffect(() => {
    const storedExpanded = localStorage.getItem('expanded');
    if (storedExpanded) {
      setExpanded(storedExpanded === 'true');
    }
  }, []);

  // TODO remove
  if (content) {
    console.log(content);
    console.log(bundleUtils.getResources(content?.entry!, 'Patient'));
    const patient: Patient = bundleUtils.getResources(
      content?.entry!,
      'Patient',
    )[0].resource;
    console.log(patient.birthDate);
    if (patient && patient.name && patient.name.length > 0) {
      console.log('Name: ', patient.name[0].family);
    }
  } else {
    console.log('no content');
  }

  return (
    <div className="flex flex-1">
      <VipsSideBar
        expanded={expanded}
        setExpanded={setExpanded}
        setContent={setContent}
      />

      <main
        className={`flex-1 p-4 transition-all duration-300 ${expanded && 'ml-[175px]'}`}
      >
        {children}
      </main>
    </div>
  );
}
