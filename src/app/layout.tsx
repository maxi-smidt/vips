import React from 'react';
import { Inter } from 'next/font/google';
import Header from '@/app/components/Header';
import Main from '@/app/components/Main';
import DataProvider from '@/app/provider/DataProvider';
import { ToastProvider } from '@/app/provider/ToastProvider';
import { PrimeReactProvider } from 'primereact/api';

import './globals.css';
import BundleProvider from '@/app/provider/BundleProvider';
import ConfigProvider from '@/app/provider/ConfigProvider';

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
      <body className={`${inter.className} m-0`}>
        <div className="flex flex-col h-screen">
          <PrimeReactProvider>
            <ToastProvider>
              <DataProvider>
                <BundleProvider>
                  <ConfigProvider>
                    <Header />
                    <Main>{children}</Main>
                  </ConfigProvider>
                </BundleProvider>
              </DataProvider>
            </ToastProvider>
          </PrimeReactProvider>
        </div>
      </body>
    </html>
  );
}
