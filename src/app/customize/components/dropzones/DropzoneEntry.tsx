import { ConfigEntry } from '@/app/types/Config';
import React from 'react';
import { Button } from 'primereact/button';
import { useDraggable } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import useCustomConfig from '@/app/customize/hooks/useCustomConfig';

interface DropzoneEntryProps {
  configEntry: ConfigEntry;
  resourceKey: string;
  path: number[];
}

export default function DropzoneEntry({
  configEntry,
  resourceKey,
  path,
}: DropzoneEntryProps) {
  const { deleteComponent } = useCustomConfig();
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: uuidv4(),
    data: {
      entry: configEntry,
      path: path,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="relative bg-gray-200 px-3 py-1 rounded-2xl select-none transition-opacity duration-200"
    >
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

      <p>Display: {configEntry.display}</p>
      <p>Path: {configEntry.path}</p>
      <p>Renderer: {configEntry.renderer}</p>
    </div>
  );
}
