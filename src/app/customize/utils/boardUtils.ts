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
  const sections: SectionCardType[] = [];
  Object.keys(defaultConfig).forEach((defaultSection) => {
    const status =
      customSections.indexOf(defaultSection) >= 0
        ? SectionType.ACTIVE
        : SectionType.INACTIVE;
    const section: ConfigResource = defaultConfig[defaultSection];
    const task = {
      id: defaultSection,
      title: section.sectionDisplay,
      color: section.color,
    };
    initialBoardSections[status].push(task);
    sections.push(task);
  });
  return { sections, initialBoardSections };
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
