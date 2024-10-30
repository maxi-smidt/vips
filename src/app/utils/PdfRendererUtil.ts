import { toJpeg } from 'html-to-image';
import { Config } from '@/app/types/Config';
import jsPDF from 'jspdf';

interface createPdfProps {
  config: Config;
  patientName: string;
  patientSVNR: string;
  fileName: string;
  showError: (msg: string) => void;
}

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
const SUBHEADER_FONT_SIZE = 14;

let FIRST_PAGE_HEADER_TEXT = '';
let OTHER_PAGE_HEADER_TEXT = '';
let LOGO_URL = '';
let FOOTER_TEXT = '';

function init(patientName: string, patientSVNR: string) {
  LOGO_URL = `${process.env.IMAGE_PATH}/logo.png`;
  FIRST_PAGE_HEADER_TEXT = `IPS Document - Patient: ${patientName}`;
  OTHER_PAGE_HEADER_TEXT = `Patient: ${patientName} SVNR: ${patientSVNR}`;
  const dateTime = new Date();
  FOOTER_TEXT = `PDF generated on ${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

export default async function createPDF({
  config,
  patientName,
  patientSVNR,
  fileName,
  showError,
}: createPdfProps) {
  init(patientName, patientSVNR);
  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
    compress: true,
  });
  const NativeImage = window.Image;

  try {
    let y_pos = HEIGHT_MARGIN + HEADER_HEIGHT;
    let currentPage = 1;

    await addHeader(pdf, true);
    for (const key of Object.keys(config)) {
      const elements = Array.from(
        document.getElementsByClassName(`contentClass${config[key].code}`),
      );
      y_pos = await addSubHeading(
        pdf,
        config[key].sectionDisplay,
        y_pos,
        currentPage,
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
              y_pos += HEIGHT_MARGIN / 2;
              const imgWidth = A4_WIDTH - 2 * WIDTH_MARGIN;
              const imgHeight = (imgWidth / img.width) * img.height;

              if (y_pos + imgHeight > PAGE_HEIGHT + HEIGHT_MARGIN) {
                pdf.addPage();
                currentPage++;
                y_pos = HEIGHT_MARGIN + HEADER_HEIGHT;
                addHeader(pdf, false);
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
    pdf.save(fileName);
  } catch (_) {
    showError('The pdf could not be created');
  }
}

async function addHeader(pdf: jsPDF, isFirstPage: boolean): Promise<void> {
  const headerText = isFirstPage
    ? FIRST_PAGE_HEADER_TEXT
    : OTHER_PAGE_HEADER_TEXT;
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
    pdf.text(headerText, WIDTH_MARGIN, HEIGHT_MARGIN);

    pdf.setLineWidth(0.5);
    pdf.line(
      WIDTH_MARGIN,
      HEIGHT_MARGIN + HEADER_FOOTER_FONT_SIZE,
      A4_WIDTH - WIDTH_MARGIN,
      HEIGHT_MARGIN + HEADER_FOOTER_FONT_SIZE,
    );
  }

  await addLogoToPage(pdf);
}

async function addLogoToPage(pdf: jsPDF): Promise<void> {
  const response = await fetch(LOGO_URL);
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
}

function addFooter(pdf: jsPDF, currentPage: number) {
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

  pdf.text(FOOTER_TEXT, WIDTH_MARGIN, pageHeight - FOOTER_HEIGHT + 12);
  pdf.text(
    pageNumber,
    pageWidth - WIDTH_MARGIN - pdf.getTextWidth(pageNumber),
    pageHeight - FOOTER_HEIGHT + 12,
  );
}

async function addSubHeading(
  pdf: jsPDF,
  text: string,
  y_pos: number,
  currentPage: number,
): Promise<number> {
  const subheadingPaddingY = 5;
  if (
    y_pos + SUBHEADER_FONT_SIZE + 50 * subheadingPaddingY >
    PAGE_HEIGHT + HEIGHT_MARGIN
  ) {
    pdf.addPage();
    currentPage++;
    y_pos = HEIGHT_MARGIN + HEADER_HEIGHT;
    await addHeader(pdf, false);
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

  return y_pos + SUBHEADER_FONT_SIZE + 2 * subheadingPaddingY;
}
