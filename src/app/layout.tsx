import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import VipsSideBar from '@/app/components/VipsSideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
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
        <div className="flex">
          <VipsSideBar />
          {children}
        </div>
      </body>
    </html>
  );
}
