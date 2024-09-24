import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/Header';
import Main from '@/app/components/Main';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'VIPS',
  description: 'Visualizer for International Patient Summary',
};

// access .env api
// const API_URL = process.env.FHIR_API;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <div className="sticky top-0">{<Header />}</div>
          {<Main>{children}</Main>}
        </div>
      </body>
    </html>
  );
}
