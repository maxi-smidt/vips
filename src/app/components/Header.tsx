'use client';

import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { Button } from 'primereact/button';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { pdf } from '@react-pdf/renderer';
import { useBundle } from '@/app/hooks/useBundle';
import useConfig from '@/app/hooks/useConfig';
import PdfRenderer from '@/app/components/pdfExport/PdfRenderer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [showPdfHeader, setShowPdfHeader] = useState(false);
  const handleDownload = async (mainContentId: string, headerId: string) => {
    // Show header only for PDF generation
    setShowPdfHeader(true);
    const A4_HEIGHT = 841.89;
    const A4_WIDTH = 595.28;

    const WIDTH_MARGIN = 10;
    const HEIGHT_MARGIN = 10;
    const PAGE_HEIGHT = A4_HEIGHT - 2 * HEIGHT_MARGIN;

    /** create pdf instance */
    const pdf = new jsPDF('p', 'pt', 'a4'); // orientation, unit, format

    /** convert html to canvas */
    const body = document.getElementById(mainContentId);
    const canvas = await html2canvas(body as HTMLElement);

    /** calculate the imgWidth, imgHeight to print on PDF
     *  so it can scale in equal proportions*/
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgWidth = A4_WIDTH - 2 * WIDTH_MARGIN;
    const imgHeight = (imgWidth / canvasWidth) * canvasHeight;

    /** print pageImg on to pdf */
    const pageImg = canvas.toDataURL('image/png', 1.0);

    let position = HEIGHT_MARGIN;
    if (imgHeight > PAGE_HEIGHT) {
      // need multi page pdf
      let heightUnprinted = imgHeight;
      while (heightUnprinted > 0) {
        pdf.addImage(
          pageImg,
          'PNG',
          WIDTH_MARGIN,
          position,
          imgWidth,
          imgHeight,
        );

        // draw the margin top and margin bottom if needed
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, A4_WIDTH, HEIGHT_MARGIN, 'F'); // margin top
        pdf.rect(0, A4_HEIGHT - HEIGHT_MARGIN, A4_WIDTH, HEIGHT_MARGIN, 'F'); // margin bottom

        heightUnprinted -= PAGE_HEIGHT;
        position -= PAGE_HEIGHT; // next vertical placement

        // add another page if there's more contents to print
        if (heightUnprinted > 0) pdf.addPage();
      }
    } else {
      // print single page pdf
    }

    /** save the pdf */
    pdf.save(`myPDF.pdf`);
  };
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
      {showPdfHeader && (
        <div
          id="headerId"
          className={`${
            showPdfHeader ? 'block' : 'hidden'
          } bg-gray-100 p-4 border-b border-gray-300 flex items-center space-x-4`}
        >
          <Image
            src={`${process.env.IMAGE_PATH}/logo.png`}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-md"
          />
          <h1 className="text-lg font-semibold text-gray-800">
            This is the PDF Header
          </h1>
        </div>
      )}
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

          <Button
            className="ml-auto"
            severity="secondary"
            text
            onClick={() => {
              handleDownload('mainContentId', 'headerId');
            }}
          >
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
