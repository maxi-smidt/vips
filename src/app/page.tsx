import Sidebar, { SidebarItem } from "./components/sidebar/sidebar";
import { IoPersonSharp } from "react-icons/io5";
import { MdMedicationLiquid } from "react-icons/md";
import { GiMedicalDrip } from "react-icons/gi";
import { MdCoronavirus } from "react-icons/md";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { MdFormatListBulleted } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem 
          icon={<IoPersonSharp size={25} />}
          text="Patients"
          alert={false}
        />
        <SidebarItem 
          icon={<MdMedicationLiquid size={25} />}
          text="Medications"
          alert={false}
        />
        <SidebarItem 
          icon={<GiMedicalDrip size={25} />}
          text="Allergies & Intolerances"
          alert={false}
        />
        <SidebarItem 
          icon={<MdCoronavirus size={25} />}
          text="History of Past Illnesses"
          alert={false}
        />
        <SidebarItem 
          icon={<PiClockCounterClockwiseBold size={25} />}
          text="Active Problems"
          alert={false}
        />
        <SidebarItem 
          icon={<MdFormatListBulleted size={25} />}
          text="Plan of Treatment"
          alert={false}
        />
      </Sidebar>
      <main className="flex-1 p-6 ml-64">
        <h1 className="text-2xl">Welcome to the Page</h1>
        <p>Your content goes here.</p>
      </main>
    </div>
  );
}