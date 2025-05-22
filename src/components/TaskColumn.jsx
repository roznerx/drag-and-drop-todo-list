import { useDroppable } from '@dnd-kit/core';
import "./TaskColumn.css";

export default function TaskColumn({ name, tasks }) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });

  const style = {
    backgroundColor: isOver ? 'green' : 'red',
  };
    
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className='task-column'
    >
      <h2>{name.toUpperCase()}</h2>
      {
        tasks && tasks.map((t) => {
          return (
            <div key={t.id} className='task'>
              <h3>{t.text}</h3>
            </div>
          )
        })
      }
    </div>
  );
}
