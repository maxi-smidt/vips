import React from 'react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { useData } from '@/app/hooks/useData';

interface SidebarItemProps {
  sectionKey: string;
  iconPath: string;
  sectionDisplay: string;
}

export default function SidebarItem({
  sectionDisplay,
  sectionKey,
  iconPath,
}: SidebarItemProps) {
  const { expanded } = useData();

  const passTrough = expanded
    ? {
        label: {
          className: 'text-left pl-2 truncate',
        },
      }
    : {};

  const onClick = (sectionKey: string) => {
    const element = document.getElementsByClassName(`${sectionKey}`)[0];
    if (element) {
      element.scrollIntoView();
      const offset = 70;
      window.scrollBy(0, -offset);
    }
  };

  return (
    <Button
      className="w-full"
      label={expanded ? sectionDisplay : undefined}
      severity="secondary"
      outlined
      onClick={() => onClick(sectionKey)}
      tooltip={sectionDisplay}
      tooltipOptions={{ showDelay: 200 }}
      pt={passTrough}
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
