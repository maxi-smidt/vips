import React from 'react';
import { useData } from '@/app/hooks/useData';
import Image from 'next/image';
import { Button } from 'primereact/button';

interface SidebarItemProps {
  sectionKey: string;
  iconPath: string;
}

export default function SidebarItem({
  sectionKey,
  iconPath,
}: SidebarItemProps) {
  const { expanded } = useData();

  const onClick = (sectionKey: string) => {
    const element = document.getElementsByClassName(`target-${sectionKey}`)[0];
    if (element) {
      element.scrollIntoView();
      const offset = 70;
      window.scrollBy(0, -offset);
    }
  };

  return (
    <Button
      className="w-full"
      label={expanded ? sectionKey : undefined}
      severity="secondary"
      outlined
      onClick={() => onClick(sectionKey)}
      tooltip={sectionKey}
      tooltipOptions={{ showDelay: 200 }}
      pt={{
        label: {
          className: 'text-left pl-2 truncate',
        },
      }}
      icon={(_) => (
        <Image
          src={`${process.env.IMAGE_PATH}${iconPath}`}
          width={20}
          height={20}
          alt={sectionKey}
        />
      )}
    />
  );
}
