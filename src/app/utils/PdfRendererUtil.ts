// PdfRendererUtil.ts

import { toJpeg } from 'html-to-image';
import { Config } from '@/app/types/Config';
// eslint-disable-next-line node/no-extraneous-import
import jsPDF from 'jspdf';

interface createPdfProps {
  config: Config;
  patientName: string;
  patientSVNR: string;
}

export default async function createPDF({
  config,
  patientName,
  patientSVNR,
}: createPdfProps) {
  const A4_HEIGHT = 841.89;
  const A4_WIDTH = 595.28;
  const WIDTH_MARGIN = 40;
  const HEIGHT_MARGIN = 20;
  const PAGE_WIDTH = A4_WIDTH - 2 * WIDTH_MARGIN;
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

  const firstPageHeaderText = `IPS Document - Patient: ${patientName}`;
  const otherPageHeaderText = `Patient: ${patientName} SVNR: ${patientSVNR}`;

  const addLogoToPage = async (): Promise<void> => {
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

  let y_pos = HEIGHT_MARGIN + HEADER_HEIGHT;
  let currentPage = 1;

  const addHeader = async (isFirstPage: boolean): Promise<void> => {
    const headerText = isFirstPage ? firstPageHeaderText : otherPageHeaderText;
    const headerFontSize = isFirstPage
      ? FIRST_PAGE_HEADER_FONT_SIZE
      : HEADER_FOOTER_FONT_SIZE;
    pdf.setFontSize(headerFontSize);

    if (isFirstPage) {
      const bannerHeight = 28;
      const bannerColor = '#519ddb';

      pdf.setFillColor(bannerColor);
      pdf.rect(0, HEIGHT_MARGIN, PAGE_WIDTH, bannerHeight, 'F');

      pdf.text(
        headerText,
        WIDTH_MARGIN,
        HEIGHT_MARGIN + FIRST_PAGE_HEADER_FONT_SIZE,
      );
    } else {
      const headerTextWidth = pdf.getTextWidth(headerText);
      pdf.text(headerText, (A4_WIDTH - headerTextWidth) / 2, HEIGHT_MARGIN);

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

  const addFooter = (pdf: jsPDF, currentPage: number): void => {
    const dateTime = new Date();
    const footerText = `PDF Generated on ${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString()}`;
    const pageNumber = `Page ${currentPage}`;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFontSize(HEADER_FOOTER_FONT_SIZE);
    pdf.setLineWidth(0.5);
    pdf.line(
      WIDTH_MARGIN,
      pageHeight - HEIGHT_MARGIN - HEADER_FOOTER_FONT_SIZE - 5,
      pageWidth - WIDTH_MARGIN,
      pageHeight - HEIGHT_MARGIN - HEADER_FOOTER_FONT_SIZE - 5,
    );

    pdf.text(footerText, WIDTH_MARGIN, pageHeight - FOOTER_HEIGHT + 12);
    pdf.text(
      pageNumber,
      pageWidth - WIDTH_MARGIN - pdf.getTextWidth(pageNumber),
      pageHeight - FOOTER_HEIGHT + 12,
    );
  };

  const addSubheading = (pdf: jsPDF, text: string): void => {
    const SUBHEADER_FONT_SIZE = 14;
    const subheadingPaddingY = 5;

    if (
      y_pos + SUBHEADER_FONT_SIZE + 50 * subheadingPaddingY >
      PAGE_HEIGHT + HEIGHT_MARGIN
    ) {
      pdf.addPage();
      currentPage++;
      y_pos = HEIGHT_MARGIN + HEADER_HEIGHT;
      addHeader(false);
      addFooter(pdf, currentPage);
    }

    const subheadingPaddingX = 10;
    const backgroundColor = '#d3e9fc';
    const rectWidth = A4_WIDTH - 2 * WIDTH_MARGIN - 11.5;
    const textXPosition = WIDTH_MARGIN + subheadingPaddingX;
    const textYPosition = y_pos + SUBHEADER_FONT_SIZE + subheadingPaddingY;

    pdf.setFillColor(backgroundColor);
    pdf.roundedRect(
      WIDTH_MARGIN + 4.5,
      textYPosition - 16,
      rectWidth,
      SUBHEADER_FONT_SIZE + 2 * subheadingPaddingY,
      5,
      5,
      'F',
    );

    pdf.setFontSize(SUBHEADER_FONT_SIZE);
    pdf.setTextColor(0, 0, 0);
    pdf.text(text, textXPosition, textYPosition);

    y_pos += SUBHEADER_FONT_SIZE + 2 * subheadingPaddingY;
  };

  await addHeader(true);
  for (const key of Object.keys(config)) {
    const elements = Array.from(
      document.getElementsByClassName(`contentClass${config[key].code}`),
    );
    addSubheading(pdf, config[key].sectionDisplay);
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
            y_pos += HEIGHT_MARGIN / 2;
            const imgWidth = A4_WIDTH - 2 * WIDTH_MARGIN;
            const imgHeight = (imgWidth / img.width) * img.height;

            if (y_pos + imgHeight > PAGE_HEIGHT + HEIGHT_MARGIN) {
              pdf.addPage();
              currentPage++;
              y_pos = HEIGHT_MARGIN + HEADER_HEIGHT;
              addHeader(false);
            }

            pdf.addImage(
              dataUrl,
              'JPEG',
              WIDTH_MARGIN,
              y_pos,
              imgWidth,
              imgHeight,
              undefined,
              'FAST',
            );

            y_pos += imgHeight + HEIGHT_MARGIN;
            addFooter(pdf, currentPage);

            resolve(null);
          };
        });
      } catch (error) {
        console.error('Error capturing element:', error);
      }
    }
  }
  addFooter(pdf, currentPage);

  pdf.save('myPDF.pdf');
}
