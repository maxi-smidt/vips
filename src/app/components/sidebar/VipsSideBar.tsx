import React from 'react';
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

export default function VipsSideBar() {
  return (
    <Sidebar>
      <SidebarItem icon={<IoPersonSharp size={25} />} text="Patient" />
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
      <SidebarItem
        icon={<MdFormatListBulleted size={25} />}
        text="Plan of Treatment"
      />
      <SidebarItem
        icon={<MdFormatListBulleted size={25} />}
        text="Plan of Treatment"
      />
      <SidebarItem
        icon={<MdFormatListBulleted size={25} />}
        text="Plan of Treatment"
      />
      <SidebarItem
        icon={<MdFormatListBulleted size={25} />}
        text="Plan of Treatment"
      />
    </Sidebar>
  );
}
