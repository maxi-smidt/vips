import React from 'react';
import { ConfigResource } from '@/app/types/Config';

interface EmptySectionRendererProps {
  configResource: ConfigResource;
  message: string;
}

export default function EmptySectionRenderer({
  configResource,
  message,
}: EmptySectionRendererProps) {
  return (
    <div className={`contentClass${configResource.code}`}>
      <div className="p-2 flex justify-center">
        <p>{message}</p>
      </div>
    </div>
  );
}
