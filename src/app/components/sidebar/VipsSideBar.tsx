'use client';

import React from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import useConfig from '@/app/hooks/useConfig';
import SidebarItem from '@/app/components/sidebar/SidebarItem';
import { useBundle } from '@/app/hooks/useBundle';

export default function VipsSideBar() {
  const { config } = useConfig();
  const { resourceMap } = useBundle();

  const sections = Object.keys(config).map((sectionKey) => (
    <SidebarItem
      key={sectionKey}
      sectionKey={sectionKey}
      sectionDisplay={config[sectionKey].sectionDisplay}
      iconPath={`${config[sectionKey].icon}`}
      numResources={resourceMap[config[sectionKey].code]?.length ?? 0}
    />
  ));

  return <Sidebar>{sections}</Sidebar>;
}
