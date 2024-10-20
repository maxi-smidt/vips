import React from 'react';
import { useBundle } from '@/app/hooks/useBundle';
import Image from 'next/image';
import { Button } from 'primereact/button';

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
  const { expanded } = useBundle();

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
      tooltip={sectionKey}
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
