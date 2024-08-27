import Sidebar from "./components/sidebar/Sidebar";
import SidebarItem from "./components/sidebar/SidebarItem";
import { IoPersonSharp } from "react-icons/io5";
import { MdMedicationLiquid, MdFormatListBulleted } from "react-icons/md";
import { GiMedicalDrip } from "react-icons/gi";
import { MdCoronavirus } from "react-icons/md";
import { PiClockCounterClockwiseBold } from "react-icons/pi";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<IoPersonSharp size={25} />} text="Patients" />
        <SidebarItem icon={<MdMedicationLiquid size={25} />} text="Medications" />
        <SidebarItem icon={<GiMedicalDrip size={25} />} text="Allergies & Intolerances" />
        <SidebarItem icon={<MdCoronavirus size={25} />} text="History of Past Illnesses" />
        <SidebarItem icon={<PiClockCounterClockwiseBold size={25} />} text="Active Problems" />
        <SidebarItem icon={<MdFormatListBulleted size={25} />} text="Plan of Treatment" />
      </Sidebar>
      <main className="flex-1 p-6 ml-16">
        <h1 className="text-2xl">Welcome to the Page</h1>
        <p>Your content goes here.</p>
      </main>
    </div>
  );
}
