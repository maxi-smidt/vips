"use client"

import React, { useContext } from 'react';
import { SidebarContext } from './Sidebar'; // Adjust the path as necessary

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
}

export default function SidebarItem({ icon, text, alert }: SidebarItemProps) {
  const context = useContext(SidebarContext);

  if (!context) {
    // Handle the case where context is undefined
    console.error("SidebarContext is not provided");
    return null;
  }

  console.log("SidebarContext value:", context);

  const { expanded } = context;

  return (
    <li className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group bg-orange-100 text-slate-800 h-12`}>
      <div className="flex-shrink-0 w-6 h-6">{icon}</div>
      <span className={`overflow-hidden transition-all ${expanded ? 'ml-3' : 'w-0'}`}>{text}</span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-red-400 ${expanded ? '' : 'top-2'}`} />
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-orange-100 text-slate-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
