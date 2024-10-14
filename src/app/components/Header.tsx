import React from 'react';
import Image from 'next/image';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-stone-100">
      <div className="p-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={`${process.env.IMAGE_PATH}/raccoon-forwards.png`}
              alt="HAPI FHIR Logo"
              className="h-12 w-12"
              width={266}
              height={293}
            />
          </Link>
          <span className="ml-4 text-2xl font-semibold text-gray-800">
            VIPS
          </span>
        </div>
        <div className="flex items-center mr-3 gap-3">
          <Link href="/customize">
            <Button
              icon="pi pi-objects-column"
              label="Customize"
              outlined
              severity="secondary"
            />
          </Link>

          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText placeholder="Search" />
          </IconField>

          <Button
            className="ml-auto"
            severity="secondary"
            outlined
            icon="pi pi-file-pdf"
          />
        </div>
      </div>
    </header>
  );
}
