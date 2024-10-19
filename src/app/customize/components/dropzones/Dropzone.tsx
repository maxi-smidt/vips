import DropzoneSection from '@/app/customize/components/dropzones/DropzoneSection';
import React from 'react';
import useCustomConfig from '@/app/customize/hooks/useCustomConfig';

export default function Dropzone() {
  const { customConfig } = useCustomConfig();
  return (
    <div className="flex flex-col gap-3">
      {Object.keys(customConfig).map((key) => (
        <div key={key}>
          <h4>{key}</h4>
          <DropzoneSection
            section={customConfig[key].section}
            resourceKey={key}
            path={[]}
          />
        </div>
      ))}
    </div>
  );
}
