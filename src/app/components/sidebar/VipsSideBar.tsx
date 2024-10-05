import React, { Dispatch } from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import { IoPersonSharp } from 'react-icons/io5';
import {
  MdCoronavirus,
  MdFormatListBulleted,
  MdMedicationLiquid,
} from 'react-icons/md';
import { GiMedicalDrip } from 'react-icons/gi';
import { PiClockCounterClockwiseBold } from 'react-icons/pi';
import SidebarItem from '@/app/components/sidebar/SidebarItem';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';

export interface VipsSideBarProps {
  expanded: boolean;
  setExpanded: Dispatch<React.SetStateAction<boolean>>;
  setContent: Dispatch<React.SetStateAction<Bundle | undefined>>;
}

export default function VipsSideBar({
  expanded,
  setExpanded,
  setContent,
}: VipsSideBarProps) {
  return (
    <Sidebar
      expanded={expanded}
      setExpanded={setExpanded}
      setContent={setContent}
    >
      <SidebarItem
        icon={<IoPersonSharp size={25} />}
        text="Patient"
        expanded={expanded}
      />
      <SidebarItem
        icon={<MdMedicationLiquid size={25} />}
        text="Medications"
        expanded={expanded}
      />
      <SidebarItem
        icon={<GiMedicalDrip size={25} />}
        text="Allergies & Intolerances"
        expanded={expanded}
      />
      <SidebarItem
        icon={<MdCoronavirus size={25} />}
        text="History of Past Illnesses"
        expanded={expanded}
      />
      <SidebarItem
        icon={<PiClockCounterClockwiseBold size={25} />}
        text="Active Problems"
        expanded={expanded}
      />
      <SidebarItem
        icon={<MdFormatListBulleted size={25} />}
        text="Plan of Treatment"
        expanded={expanded}
      />
    </Sidebar>
  );
}
