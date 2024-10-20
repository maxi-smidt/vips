'use client';

import IPSViewer from '@/app/components/IPSViewer';
import EmptyPage from '@/app/components/EmptyPage';
import React from 'react';
import { useBundle } from '@/app/hooks/useBundle';

export default function Home() {
  const { bundle } = useBundle();

  if (!bundle) {
    return <EmptyPage />; // TODO change to animation for example
  }

  return <IPSViewer />;
}
