import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  expanded: boolean;
}

export default function SidebarItem({
  icon,
  text,
  expanded,
}: SidebarItemProps) {
  return (
    <li
      className={`relative flex items-center px-3 font-medium rounded-md cursor-pointer transition-colors group bg-orange-100 text-slate-800 h-12`}
    >
      <div className="flex-shrink-0 w-6 h-6">{icon}</div>
      <span
        className={`overflow-hidden transition-all ${expanded ? 'ml-3' : 'w-0'}`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`rounded-md p-2 bg-orange-100 text-sm invisible group-hover:visible`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
