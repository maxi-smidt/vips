import React from 'react';
import { Inter } from 'next/font/google';
import Header from '@/app/components/Header';
import Main from '@/app/components/Main';
import DataProvider from '@/app/provider/DataProvider';
import { ToastProvider } from '@/app/provider/ToastProvider';
import { PrimeReactProvider } from 'primereact/api';

import './globals.css';
import BundleProvider from '@/app/provider/BundleProvider';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'VIPS',
  description: 'Visualizer for International Patient Summary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <ToastProvider>
          <DataProvider>
            <BundleProvider>
              <body
                className={`${inter.className} m-0 h-screen overflow-hidden`}
              >
                <div className="flex flex-col h-full">
                  <Header />
                  <Main>{children}</Main>
                </div>
              </body>
            </BundleProvider>
          </DataProvider>
        </ToastProvider>
      </PrimeReactProvider>
    </html>
  );
}
