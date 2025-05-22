import { useDraggable } from '@dnd-kit/core';
import "./AddTask.css";

export default function AddTask() {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div className='add-wrapper'>
      <div 
        className='task-to-add' 
        ref={setNodeRef} 
        style={style} 
        {...listeners} 
        {...attributes}
      >
        <h3>WRITE NAME HERE</h3>
      </div>
      <button 
        className='create-btn'
        onClick={() => console.log('click!')}
      >
        ADD TASK
      </button>
    </div>
  );
};
