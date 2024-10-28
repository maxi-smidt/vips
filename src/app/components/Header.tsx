'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [actionbutton, setActionButton] = useState<React.JSX.Element | null>(
    null,
  );

  useEffect(() => {
    if (pathname === '/customize') {
      setActionButton(createButton('/', 'IPS Viewer', 'ips_viewer'));
    } else {
      setActionButton(createButton('/customize', 'Customize', 'customize'));
    }
  }, [pathname]);

  return (
    <header className="bg-stone-100 shadow-md z-10">
      <div className="p-2 flex items-center justify-between">
        <a
          href={process.env.MODE === 'development' ? '/' : '/vips/'}
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

  function createButton(href: string, label: string, iconSrc: string) {
    return (
      <Link href={href}>
        <Button
          className="text-prime-grey"
          label={label}
          outlined
          severity="secondary"
          pt={{
            label: {
              className: 'text-left pl-2',
            },
          }}
          icon={
            <Image
              src={`${process.env.IMAGE_PATH}/icons/${iconSrc}.svg`}
              width={20}
              height={20}
              alt={label}
            />
          }
        />
      </Link>
    );
  }
}
