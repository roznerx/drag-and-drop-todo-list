import { useState } from 'react';
import "./TaskCreator.css";

export default function TaskCreator({ handleAddTask }) {
  const [name, setName] = useState("");

  return (
    <div className='add-wrapper'>
      <input 
        className='task-to-add'
        type="text" 
        value={name.toUpperCase()} 
        onChange={(e) => setName(e.target.value)} />
      <button
        className='create-btn'
        onClick={() => {
          if (name) {
            handleAddTask (name);
            setName("");
          }
        }}
      >
        ADD TASK
      </button>
    </div>
  );
}
