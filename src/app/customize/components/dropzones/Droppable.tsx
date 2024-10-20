import { useDroppable } from '@dnd-kit/core';
import { DndComponent } from '@/app/customize/types/DndComponent';
import useCustomConfig from '@/app/customize/hooks/useCustomConfig';

interface DroppableProps {
  id: string;
  path: number[];
  resourceKey: string;
  activeComponent: DndComponent;
}

export default function Droppable({
  id,
  path,
  resourceKey,
  activeComponent,
}: DroppableProps) {
  const { isNeighbour } = useCustomConfig();
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      path: path,
      resourceKey: resourceKey,
    },
  });

  return (
    <div className="p-2" ref={setNodeRef}>
      {isOver && !isNeighbour(path, activeComponent.path) && (
        <div className="p-10 m-1 border-dashed border-2 rounded-md flex justify-center align-center">
          {isOver && <h4>Drop here</h4>}
        </div>
      )}
    </div>
  );
}
