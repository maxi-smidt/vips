'use client';

import IPSViewer from '@/app/components/IPSViewer';
import StartPage from '@/app/components/StartPage';
import React from 'react';
import { useBundle } from '@/app/hooks/useBundle';

export default function Home() {
  const { bundle } = useBundle();

  if (!bundle) {
    return <StartPage />;
  }

  return <IPSViewer />;
}
