import { SectionCardType } from '@/app/customize/types/SectionCard';

export interface SectionCardProps {
  section: SectionCardType;
}

export default function SectionCard({ section }: SectionCardProps) {
  return (
    <div className="p-4 rounded-xl" style={{ backgroundColor: section.color }}>
      <div className="text-white font-extrabold text-lg">{section.title}</div>
    </div>
  );
}
