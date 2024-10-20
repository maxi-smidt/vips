import DropzoneSection from '@/app/customize/components/dropzones/DropzoneSection';
import React from 'react';
import useCustomConfig from '@/app/customize/hooks/useCustomConfig';
import { DndComponent } from '@/app/customize/types/DndComponent';

interface DropzoneProps {
  activeComponent: DndComponent | null;
}

export default function Dropzone({ activeComponent }: DropzoneProps) {
  const { customConfig } = useCustomConfig();
  return (
    <div className="flex flex-col gap-3">
      {Object.keys(customConfig).map((key) => (
        <div key={key}>
          <h4>{key}</h4>
          <DropzoneSection
            activeComponent={activeComponent}
            section={customConfig[key].section}
            resourceKey={key}
            path={[]}
          />
        </div>
      ))}
    </div>
  );
}
