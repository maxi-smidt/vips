import React from 'react';
import { useData } from '@/app/components/provider/DataProvider';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
}

export default function SidebarItem({ icon, text }: SidebarItemProps) {
  const { expanded } = useData();

  return (
    <li
      className={`bg-slate-200 flex items-center px-3 font-medium rounded-lg group h-12 ${expanded ? 'justify-start' : 'justify-center'}`}
    >
      <div className="flex justify-center">{icon}</div>

      {expanded && (
        <span className="overflow-hidden transition-all ml-3">{text}</span>
      )}

      {!expanded && (
        <div className="absolute left-full rounded-lg ml-2 p-2 bg-slate-300 text-sm invisible group-hover:visible group-hover:delay-300 whitespace-nowrap">
          {text}
        </div>
      )}
    </li>
  );
}
