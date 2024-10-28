'use client';

import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
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
import { ProgressSpinner } from 'primereact/progressspinner';
import { toJpeg } from 'html-to-image';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Header() {
  const { setActiveIndex } = useData();
  const { config } = useConfig();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setActiveIndex(Object.keys(config).map((_, index) => index));
    await sleep(1000);

    const A4_HEIGHT = 841.89;
    const A4_WIDTH = 595.28;
    const WIDTH_MARGIN = 40;
    const HEIGHT_MARGIN = 20;
    const PAGE_WIDTH = A4_HEIGHT - 2 * WIDTH_MARGIN;
    const PAGE_HEIGHT = A4_HEIGHT - 2 * HEIGHT_MARGIN;
    const HEADER_HEIGHT = 50;
    const FIRST_PAGE_HEADER_FONT_SIZE = 18;
    const HEADER_FOOTER_FONT_SIZE = 10;
    const FOOTER_HEIGHT = 30;
    const LOGO_WIDTH = 50;
    const LOGO_HEIGHT = 50;
    const LOGO_MARGIN_TOP = 10;
    const LOGO_MARGIN_RIGHT = 10;
    const NativeImage = window.Image;

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4',
      compress: true,
    });

    const logoUrl = `${process.env.IMAGE_PATH}/logo.png`;

    const names = Array.from(
      document.getElementsByClassName('name'),
    ) as HTMLElement[];
    const patientName = names[0]?.textContent || '';
    const patientSVNRElement = document.getElementById(
      'SVNR',
    ) as HTMLElement | null;
    const patientSVNR = patientSVNRElement?.textContent || '';

    const firstPageHeaderText = `IPS Document - Patient: ${patientName}`;
    const otherPageHeaderText = `Patient: ${patientName} SVNR: ${patientSVNR}`;

    const addLogoToPage = async () => {
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const reader = new FileReader();

      return new Promise<void>((resolve) => {
        reader.onloadend = () => {
          const logoDataUrl = reader.result as string;
          pdf.addImage(
            logoDataUrl,
            'PNG',
            A4_WIDTH - LOGO_WIDTH - LOGO_MARGIN_RIGHT,
            LOGO_MARGIN_TOP,
            LOGO_WIDTH,
            LOGO_HEIGHT,
          );
          resolve();
        };
        reader.readAsDataURL(blob);
      });
    };

    let position = HEIGHT_MARGIN + HEADER_HEIGHT;
    let currentPage = 1;

    const addHeader = async (isFirstPage: boolean) => {
      const headerText = isFirstPage
        ? firstPageHeaderText
        : otherPageHeaderText;
      const headerFontSize = isFirstPage
        ? FIRST_PAGE_HEADER_FONT_SIZE
        : HEADER_FOOTER_FONT_SIZE;
      pdf.setFontSize(headerFontSize);

      if (isFirstPage) {
        // Adjusted banner settings
        const bannerHeight = 28; // Increased height for better appearance
        const bannerColor = '#519ddb'; // Blue color

        // Draw the banner under the header text
        pdf.setFillColor(bannerColor);
        pdf.rect(0, HEIGHT_MARGIN, PAGE_WIDTH, bannerHeight, 'F');

        // Center the header text above the banner
        pdf.text(
          headerText,
          WIDTH_MARGIN,
          HEIGHT_MARGIN + FIRST_PAGE_HEADER_FONT_SIZE,
        ); // Adjusted Y-position for better spacing
      } else {
        // Header for other pages
        const headerTextWidth = pdf.getTextWidth(headerText);
        pdf.text(headerText, (A4_WIDTH - headerTextWidth) / 2, HEIGHT_MARGIN);

        // Line below the header on other pages
        pdf.setLineWidth(0.5);
        pdf.line(
          WIDTH_MARGIN,
          HEIGHT_MARGIN + HEADER_FOOTER_FONT_SIZE,
          A4_WIDTH - WIDTH_MARGIN,
          HEIGHT_MARGIN + HEADER_FOOTER_FONT_SIZE,
        );
      }

      await addLogoToPage();
    };

    const addFooter = (pdf: jsPDF, currentPage: number) => {
      const dateTime = new Date();
      const footerText = `PDF Generated on ${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString()}`;
      const pageNumber = `Page ${currentPage}`;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.setFontSize(HEADER_FOOTER_FONT_SIZE);

      // Draw a horizontal line above the footer
      pdf.setLineWidth(0.5);
      pdf.line(
        WIDTH_MARGIN,
        pageHeight - HEIGHT_MARGIN - HEADER_FOOTER_FONT_SIZE - 5,
        pageWidth - WIDTH_MARGIN,
        pageHeight - HEIGHT_MARGIN - HEADER_FOOTER_FONT_SIZE - 5,
      );

      // footerText on the left
      pdf.text(footerText, WIDTH_MARGIN, pageHeight - FOOTER_HEIGHT + 12);

      // pageNumber on the right
      pdf.text(
        pageNumber,
        pageWidth - WIDTH_MARGIN - pdf.getTextWidth(pageNumber),
        pageHeight - FOOTER_HEIGHT + 12,
      );
    };

    // First Page Header
    await addHeader(true);

    const elements = Array.from(
      document.getElementsByClassName('contentClass'),
    );
    for (const element of elements) {
      try {
        const dataUrl = await toJpeg(element as HTMLElement, {
          quality: 0.9,
          backgroundColor: '#FFFFFF',
        });
        const img = new NativeImage();
        img.src = dataUrl;

        await new Promise((resolve) => {
          img.onload = () => {
            const imgWidth = A4_WIDTH - 2 * WIDTH_MARGIN;
            const imgHeight = (imgWidth / img.width) * img.height;

            if (position + imgHeight > PAGE_HEIGHT + HEIGHT_MARGIN) {
              pdf.addPage();
              currentPage++;
              position = HEIGHT_MARGIN + HEADER_HEIGHT;

              // Add header for new page (not first page)
              addHeader(false);
            }

            pdf.addImage(
              dataUrl,
              'JPEG',
              WIDTH_MARGIN,
              position,
              imgWidth,
              imgHeight,
              undefined,
              'FAST',
            );

            position += imgHeight + HEIGHT_MARGIN;

            // Add footer on each page
            addFooter(pdf, currentPage);

            resolve(null);
          };
        });
      } catch (error) {
        console.error('Error capturing element:', error);
      }
    }

    // Final Footer Text for the Last Page
    addFooter(pdf, currentPage);

    pdf.save('myPDF.pdf');
    setLoading(false);
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
            {loading && (
              <ProgressSpinner
                style={{ width: '30px', height: '30px' }}
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
            {!loading && (
              <Image
                src={`${process.env.IMAGE_PATH}/icons/file_pdf.svg`}
                alt="Pdf export"
                width={30}
                height={30}
              />
            )}
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
