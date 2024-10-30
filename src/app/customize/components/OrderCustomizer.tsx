'use client';

import { useEffect, useState } from 'react';
import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import SectionColumn from '@/app/customize/components/SectionColumn';
import {
  findBoardSectionContainer,
  initializeBoard,
} from '@/app/customize/utils/boardUtils';
import useConfig from '@/app/hooks/useConfig';
import {
  BoardSections,
  SectionType,
} from '@/app/customize/types/BoardSections';
import SectionCard from '@/app/customize/components/SectionCard';
import { SectionCardType } from '@/app/customize/types/SectionCard';
import { Button } from 'primereact/button';
import { Config } from '@/app/types/Config';

export default function OrderCustomizer() {
  const {
    config,
    defaultConfig,
    loadCustomConfig,
    loadDefaultConfig,
    saveCustomConfig,
    clearCustomConfig,
  } = useConfig();
  const { sections, initialBoardSections } = initializeBoard(
    defaultConfig,
    config,
  );
  const [boardSections, setBoardSections] =
    useState<BoardSections>(initialBoardSections);

  const initBoard = () => {
    const { initialBoardSections } = initializeBoard(defaultConfig, config);
    setBoardSections(initialBoardSections);
  };

  useEffect(() => {
    initBoard();
  }, [config, defaultConfig]);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string,
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string,
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id,
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id,
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length,
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string,
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string,
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id,
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id,
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex,
        ),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const section = activeTaskId ? getTaskById(sections, activeTaskId) : null;

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 w-full">
        <Button
          className="w-full"
          outlined
          label="Save Custom Configuration"
          severity="success"
          onClick={() => {
            saveCustomConfig(
              createCustomConfigFromBoard(boardSections, defaultConfig),
            );
            loadCustomConfig();
          }}
        />
        <Button
          className="w-full"
          outlined
          label="Load Custom Configuration"
          severity="info"
          onClick={() => loadCustomConfig()}
        />
        <Button
          className="w-full"
          outlined
          label="Load Default Configuration"
          severity="secondary"
          onClick={() => {
            loadDefaultConfig();
            initBoard();
          }}
        />
        <Button
          className="w-full"
          outlined
          label="Delete Custom Configuration "
          severity="danger"
          onClick={clearCustomConfig}
        />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-2">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <div key={boardSectionKey} className="flex-1">
              <SectionColumn
                id={boardSectionKey}
                title={boardSectionKey}
                sections={boardSections[boardSectionKey]}
              />
            </div>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {section ? <SectionCard section={section} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );

  function getTaskById(tasks: SectionCardType[], id: string) {
    return tasks.find((task) => task.id === id);
  }

  function createCustomConfigFromBoard(
    boardSections: BoardSections,
    defaultConfig: Config,
  ) {
    const newConfig: Config = {};

    boardSections[SectionType.ACTIVE].forEach((sectionCard) => {
      newConfig[sectionCard.id] = defaultConfig[sectionCard.id];
    });

    return newConfig;
  }
}
