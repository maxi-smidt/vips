import React from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import useConfig from '@/app/hooks/useConfig';
import SidebarItem from '@/app/components/sidebar/SidebarItem';

export default function VipsSideBar() {
  const { config } = useConfig();

  const sections = Object.keys(config).map((sectionKey) => (
    <SidebarItem
      key={sectionKey}
      sectionKey={config[sectionKey].sectionDisplay}
      iconPath={`${config[sectionKey].icon}`}
    />
  ));

  return <Sidebar>{sections}</Sidebar>;
}
