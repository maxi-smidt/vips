"use client";

import React, { createContext, useState, ReactNode } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";

interface SidebarContextProps {
  expanded: boolean;
}

interface SidebarProps {
  children: ReactNode;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm space-y-4">
        <SidebarHeader expanded={expanded} setExpanded={setExpanded} />
        <SidebarContext.Provider value={{ expanded }}>
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
          {expanded && (
            <div className="px-4">
              <h2 className="text-xl font-bold">Sections</h2>
            </div>)
          }
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <SidebarFooter expanded={expanded} />
      </nav>
    </aside>
  );
}

export { SidebarContext };
