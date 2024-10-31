'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { Button } from 'primereact/button';
import useConfig from '@/app/hooks/useConfig';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useData } from '@/app/hooks/useData';
import createPDF from '@/app/utils/PdfRendererUtil';
import { useBundle } from '@/app/hooks/useBundle';
import { useToast } from '@/app/hooks/useToast';
import { Patient } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/patient';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Header() {
  const { setActiveIndex } = useData();
  const { bundle, resourceMap } = useBundle();
  const { showError } = useToast();
  const { config } = useConfig();
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const [actionbutton, setActionButton] = useState<React.JSX.Element | null>(
    null,
  );

  // to change the action button depending on the route
  useEffect(() => {
    if (pathname === '/customize') {
      setActionButton(createButton('/', 'IPS Viewer', 'pi pi-file-check'));
    } else {
      setActionButton(
        createButton('/customize', 'Customize', 'pi pi-objects-column'),
      );
    }
  }, [pathname]);

  const handleDownload = async () => {
    if (!bundle) {
      showError('You need to load a bundle before you can download the pdf');
      return;
    }

    setIsLoading(true);
    setActiveIndex(Object.keys(config).map((_, index) => index)); // opens all accordions
    const { patientName, patientSVNR } = getPatientData();
    await sleep(1000); // there is a sleep time needed to wait for all the accordions to open

    await createPDF({
      config,
      patientName,
      patientSVNR,
      fileName: 'vips',
      showError,
    });
    setIsLoading(false);
  };

  return (
    <header className="bg-stone-100 shadow-md z-10">
      <div className="p-2 flex items-center justify-between">
        <a
          href={process.env.HOME_URL}
          className="flex items-center no-underline"
        >
          <Image
            src={`${process.env.IMAGE_PATH}/logo.png`}
            alt="VIPS Logo"
            className="pl-2 h-16 w-16 object-contain"
            width={440}
            height={440}
          />
          <span className="ml-4 text-2xl font-semibold text-gray-800">
            VIPS
          </span>
        </a>

        <div className="flex items-center mr-3 gap-3">
          {actionbutton}
          <div>
            <div className="relative">
              <IconField iconPosition="left">
                <InputIcon>
                  <Image
                    src={`${process.env.IMAGE_PATH}/icons/search.svg`}
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </InputIcon>
                <InputText placeholder="Search" />
              </IconField>
            </div>
          </div>

          <Button
            className="ml-auto"
            severity="secondary"
            outlined
            icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-file-pdf'}
            onClick={async () => await handleDownload()}
            disabled={isLoading}
          />
        </div>
      </div>
    </header>
  );

  function createButton(href: string, label: string, iconSrc: string) {
    return (
      <Link href={href}>
        <Button label={label} outlined severity="secondary" icon={iconSrc} />
      </Link>
    );
  }

  function getPatientData() {
    const patientResource = resourceMap['patient']?.[0]?.resource as Patient;
    const patientName =
      patientResource?.name?.at(0)?.given?.at(0) +
      ' ' +
      patientResource?.name?.at(0)?.family;
    const patientSVNR =
      patientResource?.identifier?.find((id) =>
        id.type?.coding?.some(
          (coding) =>
            coding.system === 'http://terminology.hl7.org/CodeSystem/v2-0203' &&
            coding.code === 'SS',
        ),
      )?.value || '';

    return { patientName, patientSVNR };
  }
}
