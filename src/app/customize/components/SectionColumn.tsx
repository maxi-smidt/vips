import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import SortableSectionCard from '@/app/customize/components/SortableSectionCard';
import { SectionCardType } from '@/app/customize/types/SectionCard';
import SectionCard from '@/app/customize/components/SectionCard';

export interface SectionColumnProps {
  id: string;
  title: string;
  sections: SectionCardType[];
}

export default function SectionColumn({
  id,
  title,
  sections,
}: SectionColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div>
      <h2>{title}</h2>
      <SortableContext
        id={id}
        items={sections}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2" ref={setNodeRef}>
          {sections.map((section) => (
            <div key={section.id}>
              <SortableSectionCard id={section.id}>
                <SectionCard section={section} />
              </SortableSectionCard>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
