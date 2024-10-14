import React from 'react';
import Image from 'next/image';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { Button } from 'primereact/button';

export default function Header() {
  return (
    <header className="bg-stone-100">
      <div className="p-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Image
            src={`${process.env.IMAGE_PATH}/raccoon-forwards.png`}
            alt="HAPI FHIR Logo"
            className="h-12 w-12"
            width={266}
            height={293}
          />
          <span className="ml-4 text-2xl font-semibold text-gray-800">
            VIPS
          </span>
        </div>
        <div className="flex items-center mr-3 gap-3">
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

          <Button className="ml-auto" severity="secondary" text>
            <Image
              src={`${process.env.IMAGE_PATH}/icons/file_pdf.svg`}
              alt="Pdf export"
              width={20}
              height={20}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
