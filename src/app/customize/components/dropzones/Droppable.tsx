import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  path: number[];
}

export default function Droppable({ id }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className={`${isOver && 'p-10 m-1 border-dashed border-2 rounded-md flex justify-center align-center'} p-1`}
      ref={setNodeRef}
    >
      {isOver && <h4>Drop here</h4>}
    </div>
  );
}
