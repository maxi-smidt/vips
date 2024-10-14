'use client';

import React, { useState } from 'react';
import { ConfigEntry, ConfigSection, isConfigEntry } from '@/app/types/Config';
import useConfig from '@/app/hooks/useConfig';
import DraggableEntry from '@/app/customize/components/DraggableEntry';
import { DndContext, DragOverlay, DragStartEvent } from '@dnd-kit/core';

export default function Home() {
  const { defaultConfig, reload } = useConfig();
  const separatedEntries: { [resource: string]: ConfigEntry[] } = {};
  const [activeEntry, setActiveEntry] = useState<ConfigEntry | null>(null);

  const separateEntries = () => {
    const separateSection = (section: ConfigSection, key: string) => {
      section.renderers.forEach((value) => {
        if (isConfigEntry(value)) {
          if (!separatedEntries[key]) {
            separatedEntries[key] = [];
          }
          if (separatedEntries[key].indexOf(value) === -1) {
            separatedEntries[key].push(value);
          }
        } else {
          separateSection(value, key);
        }
      });
    };
    Object.keys(defaultConfig).forEach((key) => {
      const resource = defaultConfig[key];
      resource.sections.forEach((section) => separateSection(section, key));
    });
  };

  separateEntries();

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <div className="w-2/3 overflow-y-scroll z-0"></div>
        <div className="w-1/3 overflow-y-scroll z-0">
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
        </div>
      </div>
      <DragOverlay>
        {activeEntry ? (
          <DraggableEntry key={'dragged'} configEntry={activeEntry} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveEntry(event.active.data.current!.entry);
  }

  function handleDragEnd() {
    setActiveEntry(null);
  }
}
