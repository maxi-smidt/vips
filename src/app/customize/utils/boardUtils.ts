import { Config, ConfigResource } from '@/app/types/Config';
import {
  BoardSections,
  SectionType,
} from '@/app/customize/types/BoardSections';
import { SectionCardType } from '@/app/customize/types/SectionCard';

export const initializeBoard = (
  defaultConfig: Config,
  customConfig: Config,
) => {
  const initialBoardSections: BoardSections = {
    [SectionType.ACTIVE]: [],
    [SectionType.INACTIVE]: [],
  };
  const customSections: string[] = Object.keys(customConfig);
  const defaultSections: string[] = Object.keys(defaultConfig);

  const sections: SectionCardType[] = [];

  customSections.forEach((sectionKey) => {
    addSectionToCategory(
      defaultConfig[sectionKey],
      sectionKey,
      initialBoardSections,
      sections,
      SectionType.ACTIVE,
    );
  });

  defaultSections
    .filter((sectionKey) => customSections.indexOf(sectionKey) === -1)
    .forEach((sectionKey) => {
      addSectionToCategory(
        defaultConfig[sectionKey],
        sectionKey,
        initialBoardSections,
        sections,
        SectionType.INACTIVE,
      );
    });

  return { sections, initialBoardSections };
};

const addSectionToCategory = (
  section: ConfigResource,
  sectionKey: string,
  boardSections: BoardSections,
  sections: SectionCardType[],
  type: SectionType,
) => {
  const task = {
    id: sectionKey,
    title: section.sectionDisplay,
    color: section.color,
  };
  boardSections[type].push(task);
  sections.push(task);
};

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: string,
) => {
  if (id in boardSections) {
    return id;
  }

  return Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id),
  );
};
