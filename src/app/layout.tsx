import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/Header';
import Main from '@/app/components/Main';
import DataProvider from '@/app/components/DataContext';

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
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <DataProvider>
            <div className="fixed top-0 w-full shadow-md">{<Header />}</div>
            <div className="mt-10">{<Main>{children}</Main>}</div>
          </DataProvider>
        </div>
      </body>
    </html>
  );
}
