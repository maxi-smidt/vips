import React from 'react';
import { ConfigResource } from '@/app/types/Config';

interface EmptySectionRendererProps {
  configResource: ConfigResource;
}

export default function EmptySectionRenderer({
  configResource,
}: EmptySectionRendererProps) {
  return (
    <div className={`contentClass${configResource.code}`}>
      <div className="p-2 flex justify-center">
        <p>No entries available for this section.</p>
      </div>
    </div>
  );
}
