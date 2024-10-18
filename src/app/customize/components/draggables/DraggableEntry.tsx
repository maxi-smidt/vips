import { ConfigEntry } from '@/app/types/Config';
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DroppableEntryProps {
  configEntry: ConfigEntry;
}

export default function DraggableEntry({ configEntry }: DroppableEntryProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${configEntry.display}-${configEntry.path}-${configEntry.renderer}`,
    data: {
      entry: configEntry,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-gray-200 px-3 py-1 rounded-2xl select-none}`}
    >
      <p>Display: {configEntry.display}</p>
      <p>Path: {configEntry.path}</p>
      <p>Renderer: {configEntry.renderer}</p>
    </div>
  );
}
