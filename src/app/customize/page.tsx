'use client';

import React, { useState } from 'react';
import {
  Config,
  ConfigEntry,
  ConfigSection,
  isConfigEntry,
} from '@/app/types/Config';
import useConfig from '@/app/hooks/useConfig';
import DraggableEntry from '@/app/customize/components/draggables/DraggableEntry';
import { DndContext, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { RendererType } from '@/app/types/RendererType';
import DraggableEntries from '@/app/customize/components/draggables/DraggableEntries';
import Dropzone from '@/app/customize/components/dropzones/Dropzone';
import CustomConfigProvider from '@/app/customize/provider/CustomConfigProvider';

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
      separateSection(resource.section, key);
    });
  };

  separateEntries();

  return (
    <CustomConfigProvider>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex h-screen">
          <div className="w-2/3 overflow-y-scroll p-4">
            <Dropzone />
          </div>
          <div className="w-1/3 overflow-y-scroll p-4">
            <DraggableEntries separatedEntries={separatedEntries} />
          </div>
        </div>
        <DragOverlay>
          {activeEntry ? (
            <DraggableEntry key={'dragged'} configEntry={activeEntry} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </CustomConfigProvider>
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveEntry(event.active.data.current!.entry);
  }

  function handleDragEnd() {
    setActiveEntry(null);
  }
}
