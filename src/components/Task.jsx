import { useDraggable } from '@dnd-kit/core';
import "./Task.css";
import expandIcon from '../assets/expand-icon.png';

export default function Task({ id, text }) {
  const { 
    attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div className="task"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <p>{text.toUpperCase().trim()}</p>
      <img src={expandIcon} alt="drag handle" />
    </div>
  );
}
