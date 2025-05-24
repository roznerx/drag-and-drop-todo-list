import { useDroppable } from '@dnd-kit/core';
import Task from './Task';
import "./TaskColumn.css";

export default function TaskColumn({ name, tasks }) {
  const {isOver, setNodeRef} = useDroppable({
    id: name,
  });

  return (
    <div 
      ref={setNodeRef} 
      style={{ 
        backgroundColor: 
          name === 'to-do' ? '#E3F2FD' : 
          name === 'in-progress' ? '#FFF8E1' : 
          '#E8F5E9',
        borderColor: isOver && "green"
      }}
      className='task-column '
    >
      <h2>{name.toUpperCase()}</h2>
        <div className="task-list">
          {
            tasks && tasks.map((t) => {
              return (
                <Task 
                  key={t.id} 
                  id={t.id} 
                  text={t.text} 
                />
              )
            })
          }
      </div>
    </div>
  );
}
