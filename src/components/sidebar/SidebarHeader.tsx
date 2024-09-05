import { ChevronLast, ChevronFirst } from 'lucide-react';
import React from 'react';

interface SidebarHeaderProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarHeader({
  expanded,
  setExpanded,
}: SidebarHeaderProps) {
  return (
    <div className="p-4 pb-2 flex items-center h-16">
      <div className="flex items-center">
        <img
          src="https://hapifhir.io/hapi-fhir/images/logos/raccoon-forwards.png"
          className={`transition-all ${expanded ? 'w-14' : 'w-0'} h-14`}
          alt="HAPI FHIR Logo"
        />
        {expanded && <span className="ml-6 text-3xl font-semibold">VIPS</span>}
      </div>
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-auto"
      >
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
    </div>
  );
}
