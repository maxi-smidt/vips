import { ConfigEntry } from '@/app/types/Config';
import DraggableEntry from '@/app/customize/components/draggables/DraggableEntry';
import React from 'react';

interface DraggableEntriesProps {
  separatedEntries: { [resource: string]: ConfigEntry[] };
}

export default function DraggableEntries({
  separatedEntries,
}: DraggableEntriesProps) {
  return (
    <>
      {Object.keys(separatedEntries).map((key) => (
        <div key={key}>
          <h5>{key}</h5>
          <div className="flex flex-col gap-2">
            {separatedEntries[key].map((entry) => (
              <DraggableEntry
                key={`${key}-${entry.display}-${entry.path}`}
                configEntry={entry}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
