import { ConfigEntry } from '@/app/types/Config';
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'primereact/button';
import useCustomConfig from '@/app/customize/hooks/useCustomConfig';

interface DroppableEntryProps {
  configEntry: ConfigEntry;
  path: number[];
  resourceKey: string;
  isDeletable: boolean;
}

export default function DraggableEntry({
  configEntry,
  path,
  resourceKey,
  isDeletable = false,
}: DroppableEntryProps) {
  const { deleteComponent } = useCustomConfig();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: uuidv4(),
    data: {
      entry: configEntry,
      path: path,
      resourceKey: resourceKey,
    },
  });

  return (
    <div className="relative bg-gray-200 px-3 py-1 rounded-2xl">
      {isDeletable && (
        <div className="absolute top-2 right-2">
          <Button
            icon="pi pi-times"
            rounded
            text
            severity="danger"
            aria-label="Cancel"
            onClick={() => deleteComponent(resourceKey, path)}
          />
        </div>
      )}
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="select-none transition-opacity duration-200"
      >
        <p>Display: {configEntry.display}</p>
        <p>Path: {configEntry.path}</p>
        <p>Renderer: {configEntry.renderer}</p>
      </div>
    </div>
  );
}
