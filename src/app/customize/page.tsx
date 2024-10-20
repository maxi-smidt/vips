'use client';

import React, { useState } from 'react';
import { ConfigEntry, ConfigSection, isConfigEntry } from '@/app/types/Config';
import useConfig from '@/app/hooks/useConfig';
import DraggableEntry from '@/app/customize/components/draggables/DraggableEntry';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import DraggableEntries from '@/app/customize/components/draggables/DraggableEntries';
import Dropzone from '@/app/customize/components/dropzones/Dropzone';
import useCustomConfig from '@/app/customize/hooks/useCustomConfig';
import { DndComponent } from '@/app/customize/types/DndComponent';

export default function Home() {
  const { defaultConfig, reload } = useConfig();
  const separatedEntries: { [resource: string]: ConfigEntry[] } = {};
  const [activeEntry, setActiveEntry] = useState<DndComponent | null>(null);
  const { moveComponent } = useCustomConfig();

  const separateEntries = () => {
    const separateSection = (section: ConfigSection, key: string) => {
      section.components.forEach((value) => {
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
      separateSection(resource.section, key);
    });
  };

  separateEntries();

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <div className="w-2/3 overflow-y-scroll p-4">
          <Dropzone activeComponent={activeEntry} />
        </div>
        <div className="w-1/3 overflow-y-scroll p-4">
          <DraggableEntries separatedEntries={separatedEntries} />
        </div>
      </div>
      <DragOverlay>
        {activeEntry ? (
          <DraggableEntry
            key={'dragged'}
            configEntry={activeEntry.entry}
            path={[]}
            resourceKey={'blah'}
            isDeletable={false}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActiveEntry(
      active.data.current as {
        entry: ConfigEntry;
        path: number[];
        resourceKey: string;
      },
    );
  }

  function handleDragEnd({ over }: DragEndEvent) {
    if (over && activeEntry) {
      moveComponent(
        activeEntry.resourceKey,
        over.data.current!.resourceKey,
        activeEntry.path,
        over.data.current!.path,
      );
    }

    setActiveEntry(null);
  }
}
