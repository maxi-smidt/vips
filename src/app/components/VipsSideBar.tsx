import React, { Dispatch } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import { IoPersonSharp } from 'react-icons/io5';
import {
  MdCoronavirus,
  MdFormatListBulleted,
  MdMedicationLiquid,
} from 'react-icons/md';
import { GiMedicalDrip } from 'react-icons/gi';
import { PiClockCounterClockwiseBold } from 'react-icons/pi';
import SidebarItem from '@/components/sidebar/SidebarItem';

export interface VipsSideBarProps {
  expanded: boolean;
  setExpanded: Dispatch<React.SetStateAction<boolean>>;
}

export default function VipsSideBar({
  expanded,
  setExpanded,
}: VipsSideBarProps) {
  return (
    <Sidebar expanded={expanded} setExpanded={setExpanded}>
      <SidebarItem icon={<IoPersonSharp size={25} />} text="Patients" />
      <SidebarItem icon={<MdMedicationLiquid size={25} />} text="Medications" />
      <SidebarItem
        icon={<GiMedicalDrip size={25} />}
        text="Allergies & Intolerances"
      />
      <SidebarItem
        icon={<MdCoronavirus size={25} />}
        text="History of Past Illnesses"
      />
      <SidebarItem
        icon={<PiClockCounterClockwiseBold size={25} />}
        text="Active Problems"
      />
      <SidebarItem
        icon={<MdFormatListBulleted size={25} />}
        text="Plan of Treatment"
      />
    </Sidebar>
  );
}
