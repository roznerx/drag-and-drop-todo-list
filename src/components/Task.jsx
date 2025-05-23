import { useDraggable } from '@dnd-kit/core';
import "./Task.css";

export default function Task({ id, text }) {
  const { 
    attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <h3 className="task"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {text}
    </h3>
  );
}
