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
    document.getElementById(sectionKey)?.scrollIntoView();
  };

  return (
    <Button
      className="w-full"
      label={expanded ? sectionKey : undefined}
      severity="secondary"
      outlined
      onClick={() => onClick(sectionKey)}
      tooltip={expanded ? undefined : sectionKey}
      tooltipOptions={{ showDelay: 200 }}
      icon={(_) => (
        <Image src={iconPath} width={20} height={20} alt={sectionKey} />
      )}
    />
  );
}
