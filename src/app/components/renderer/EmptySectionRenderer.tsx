import React from 'react';
import { ConfigResource } from '@/app/types/Config';

interface EmptySectionRendererProps {
  rootSection: ConfigResource;
}

export default function EmptySectionRenderer({
  rootSection,
}: EmptySectionRendererProps) {
  return (
    <div className={`contentClass${rootSection.code}`}>
      <div className="p-2 flex justify-center">
        <p>No entries available for this section.</p>
      </div>
    </div>
  );
}
