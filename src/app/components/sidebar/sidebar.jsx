"use client";

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center h-16">
          <div className="flex items-center">
            <img
              // insert custom hapi logo here, delete comment after
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
          {/* Load IPS Section - Only visible when expanded */}
          {expanded && (
            <div className="px-4 pb-2">
              <h2 className="text-xl font-bold">Load IPS</h2>
              <div className="my-2">
                <label className="block font-medium">Method:</label>
                <select className="block w-full border rounded px-2 py-1 mt-1">
                  <option value="API">API</option>
                  <option value="Text">Text</option>
                  <option value="File">File</option>
                </select>
              </div>
              <div className="my-2">
                <textarea
                  className="block w-full h-32 border rounded px-2 py-1"
                  placeholder="Enter IPS data here..."
                ></textarea>
              </div>
              <button className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded">
                Load IPS
              </button>
            </div>
          )}

          {/* Headline Section */}
          {expanded && (
            <div className="px-4 pb-2">
              <h2 className="text-xl font-bold">Sections</h2>
            </div>
          )}

          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex items-center h-16 p-3">
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold whitespace-nowrap">Visualizer</h4>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                International Patient Summary
              </span>
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
        h-12
      `}
    >
      <div className="flex-shrink-0 w-6 h-6">{icon}</div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-red-400 ${
            expanded ? "" : "top-2"
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
