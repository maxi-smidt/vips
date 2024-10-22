'use client';

import React from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import useConfig from '@/app/hooks/useConfig';
import SidebarItem from '@/app/components/sidebar/SidebarItem';
import { useBundle } from '@/app/hooks/useBundle';

export default function VipsSideBar() {
  const { config } = useConfig();
  const { extractResources } = useBundle();
  const allResourcesDict = extractResources();

  const sections = Object.keys(config).map((sectionKey) => (
    <SidebarItem
      key={sectionKey}
      sectionKey={sectionKey}
      sectionDisplay={config[sectionKey].sectionDisplay}
      iconPath={`${config[sectionKey].icon}`}
      numResources={
        allResourcesDict[config[sectionKey].code]
          ? allResourcesDict[config[sectionKey].code].length
          : 0
      }
    />
  ));

  return <Sidebar>{sections}</Sidebar>;
}
