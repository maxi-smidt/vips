'use client';

import IPSViewer from '@/app/components/IPSViewer';
import EmptyPage from '@/app/components/EmptyPage';
import React from 'react';
import { useData } from '@/app/hooks/useData';

export default function Home() {
  const { bundle } = useData();

  if (!bundle) {
    return <EmptyPage />; // TODO change to animation for example
  }

  return <IPSViewer bundle={bundle} />;
}
