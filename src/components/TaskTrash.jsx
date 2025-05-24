import { useDroppable } from '@dnd-kit/core';
import trashIcon from '../assets/trash-icon.png';
import "./TaskTrash.css";

export default function TaskTrash() {
  const { isOver, setNodeRef } = useDroppable({
  id: 'trash',
});

  return (
    <div 
      ref={setNodeRef} 
      style={{ borderColor: isOver && "green" }}
      className='trash'
    >
      <img src={trashIcon} alt="drag handle" />
    </div>
  )
}
