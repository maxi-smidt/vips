'use client';

import IPSViewer from '@/app/components/IPSViewer';
import React from 'react';
import { useData } from '@/app/hooks/useData';

export default function Home() {
  const { bundle } = useData();

  if (!bundle) {
    return <p>No content available</p>; // TODO change to animation for example
  }

  return <IPSViewer bundle={bundle} />;
}
