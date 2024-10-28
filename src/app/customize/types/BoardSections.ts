import { SectionCardType } from '@/app/customize/types/SectionCard';

export enum SectionType {
  ACTIVE = 'Active Sections',
  INACTIVE = 'Inactive Sections',
}

export type BoardSections = {
  [name: string]: SectionCardType[];
};
