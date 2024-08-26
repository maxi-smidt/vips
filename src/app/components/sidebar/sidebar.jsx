"use client";

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center h-16"> {/* Set a fixed height for the entire container */}
          <div className="flex items-center">
            <img
              // insert custom hapi logo here, delete comment a
              src="https://hapifhir.io/hapi-fhir/images/logos/raccoon-forwards.png"
              className={`transition-all ${expanded ? "w-14" : "w-0"} h-14`}
              alt="HAPI FHIR Logo"
            />
            {expanded && (
              <span className="ml-6 text-3xl font-semibold">VIPS</span>
            )}
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-auto"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex items-center h-16 p-3"> {/* Set a fixed height for the footer */}
          <div
            className={`
      flex justify-between items-center
      overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
    `}
          >
            <div className="leading-4">
              <h4 className="font-semibold whitespace-nowrap">Visualizer</h4> {/* Prevents text wrapping */}
              <span className="text-xs text-gray-600 whitespace-nowrap">International Patient Summary</span> {/* Prevents text wrapping */}
            </div>
          </div>
        </div>

      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        bg-orange-100 text-slate-800
        h-12  // Fixed height
      `}
    >
      <div className="flex-shrink-0 w-6 h-6">
        {icon}
      </div>
      <span
        className={`overflow-hidden transition-all ${expanded ? "ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-red-400 ${expanded ? "" : "top-2"
            }`}
        />
      )}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-orange-100 text-slate-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
