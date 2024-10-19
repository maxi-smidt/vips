import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  path: number[];
  resourceKey: string;
}

export default function Droppable({ id, path, resourceKey }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      path: path,
      resourceKey: resourceKey,
    },
  });

  return (
    <div
      className={`${isOver && 'p-10 m-1 border-dashed border-2 rounded-md flex justify-center align-center'} p-2`}
      ref={setNodeRef}
    >
      {isOver && <h4>Drop here</h4>}
    </div>
  );
}
