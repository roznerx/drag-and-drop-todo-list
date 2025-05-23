import { useState } from 'react';
import "./TaskCreator.css";

export default function TaskCreator({ handleAddTask  }) {
  const [name, setName] = useState("");

  return (
    <div className='add-wrapper'>
      <input 
        type="text" 
        value={name} 
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
