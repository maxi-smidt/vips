import React from 'react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { useData } from '@/app/hooks/useData';
import { RelevanceCategory } from '@/app/types/RelevanceCategory';

interface SidebarItemProps {
  sectionKey: string;
  iconPath: string;
  sectionDisplay: string;
  numResources: number;
  color: RelevanceCategory;
  index: number;
}

export default function SidebarItem({
  sectionDisplay,
  sectionKey,
  iconPath,
  numResources,
  color,
  index,
}: SidebarItemProps) {
  const { expanded, setActiveIndex } = useData();

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
      setActiveIndex(index);
    }
  };

  return (
    <Button
      className={`w-full text-white`}
      style={{ backgroundColor: `${color}` }}
      label={expanded ? `${sectionDisplay}` : undefined}
      severity="secondary"
      outlined
      onClick={() => onClick(sectionKey)}
      tooltip={sectionDisplay}
      tooltipOptions={{ showDelay: 200 }}
      pt={passTrough}
      badge={`${numResources}`}
      badgeClassName="p-badge-secondary"
      icon={(_) => (
        <Image
          src={`${process.env.IMAGE_PATH}${iconPath}`}
          width={20}
          height={20}
          alt={sectionKey}
          className="filter invert"
        />
      )}
    />
  );
}
