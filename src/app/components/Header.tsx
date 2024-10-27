'use client';

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
import { useData } from '@/app/hooks/useData';
import useConfig from '@/app/hooks/useConfig';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Header() {
  const { setActiveIndex } = useData();
  const { config } = useConfig();
  const handleDownload = async () => {
    setActiveIndex(Object.keys(config).map((_, index) => index));
    await sleep(1000);

    const A4_HEIGHT = 841.89;
    const A4_WIDTH = 595.28;
    const WIDTH_MARGIN = 10;
    const HEIGHT_MARGIN = 10;
    const PAGE_HEIGHT = A4_HEIGHT - 2 * HEIGHT_MARGIN;
    const HEADER_HEIGHT = 50;
    const FOOTER_HEIGHT = 30;

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4',
      compress: true,
    });

    // Define the header text
    const headerText = 'This is the IPS PDF Version.';
    const headerFontSize = 18; // Adjust as needed

    // Get elements by class and convert to an array
    const elements = Array.from(
      document.getElementsByClassName('contentClass'),
    );

    // Convert each element to a canvas and store in array
    const canvases = await Promise.all(
      elements.map((element) => html2canvas(element as HTMLElement)),
    );

    let position = HEIGHT_MARGIN + HEADER_HEIGHT; // Position below header
    let currentPage = 1;

    // Add header for the first page
    pdf.setFontSize(headerFontSize);
    const headerTextWidth = pdf.getTextWidth(headerText);
    pdf.text(
      headerText,
      (A4_WIDTH - headerTextWidth) / 2,
      HEIGHT_MARGIN + 30, // Adjust as needed for vertical position
    );

    canvases.forEach((canvas) => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgWidth = A4_WIDTH - 2 * WIDTH_MARGIN;
      const imgHeight = (imgWidth / canvasWidth) * canvasHeight;

      const pageImg = canvas.toDataURL('image/png', 1.0);

      // Check if adding the image exceeds the page height
      if (position + imgHeight > PAGE_HEIGHT + HEIGHT_MARGIN) {
        pdf.addPage();
        position = HEIGHT_MARGIN + HEADER_HEIGHT;

        // Add the header to the new page
        pdf.setFontSize(headerFontSize);
        pdf.text(
          headerText,
          (A4_WIDTH - headerTextWidth) / 2,
          HEIGHT_MARGIN + 30, // Adjust as needed for vertical position
        );
        currentPage++; // Increment page count for footer
      }

      pdf.addImage(pageImg, 'PNG', WIDTH_MARGIN, position, imgWidth, imgHeight);
      position += imgHeight + HEIGHT_MARGIN;

      // Add footer to each page
      const footerText = `Page ${currentPage}`;
      const footerFontSize = 10; // Reduced font size for footer
      pdf.setFontSize(footerFontSize);
      const textWidth = pdf.getTextWidth(footerText);
      pdf.text(
        footerText,
        (A4_WIDTH - textWidth) / 2,
        pdf.internal.pageSize.getHeight() - FOOTER_HEIGHT + 12, // Center the footer
      );
    });

    // Finalize the last page's footer
    if (position <= PAGE_HEIGHT + HEIGHT_MARGIN) {
      const footerText = `Page ${currentPage}`;
      const footerFontSize = 10; // Reduced font size for footer
      pdf.setFontSize(footerFontSize);
      const textWidth = pdf.getTextWidth(footerText);
      pdf.text(
        footerText,
        (A4_WIDTH - textWidth) / 2,
        pdf.internal.pageSize.getHeight() - FOOTER_HEIGHT + 12, // Center the footer
      );
    }

    pdf.save('myPDF.pdf');
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
              handleDownload();
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
