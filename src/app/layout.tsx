import React from 'react';
import { Inter } from 'next/font/google';
import VipsSideBar from '@/app/components/VipsSideBar';
import './globals.css';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VIPS',
  description: 'Visualizer for International Patient Summary',
};
// access .env api
const API_URL = process.env.FHIR_API;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
console.log(API_URL);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="flex flex-col min-h-screen">
          {/* Main content area */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <VipsSideBar />

            {/* Content area */}
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
