import React from 'react';
import CustomConfigProvider from '@/app/customize/provider/CustomConfigProvider';

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomConfigProvider>{children}</CustomConfigProvider>;
}
