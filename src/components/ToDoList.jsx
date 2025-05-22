import { DndContext } from '@dnd-kit/core';
import TaskColumn from './TaskColumn';
import "./ToDoList.css";
import { useEffect, useState } from 'react';
import AddTask from './AddTask';

const ToDoList = ({ todos }) => {
  const [toDo, setToDo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }

  useEffect(() => {
    let todoArr = [];
    let inProgressArr = []
    let doneArr = [];
    
    todos.forEach((t) => {
      if (t.status === "to-do") todoArr.push(t);
      else if (t.status === "done") doneArr.push(t);
      else inProgressArr.push(t);
    });

    setToDo(todoArr);
    setInProgress(inProgressArr);
    setDone(doneArr);

  }, [todos]);

  return (
    <div className="main-wrapper">
      <header className="header">
        <h1>To-Do List</h1>
      </header>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="body">
          {/* TOP AREA- ADD TASK */}
          <AddTask />
          {/* CENTRAL AREA - TASK COLUMNS */}
          <div className='task-columns-wrapper'>
            <TaskColumn name={"to-do"} tasks={toDo}/>
            <TaskColumn name={"in-progress"} tasks={inProgress} />
            <TaskColumn name={"done"} tasks={done} />
          </div>
          {/* BOTTOM AREA - TRASH */}
          <div className='trash-wrapper'>
            TRASH
          </div>

        </div>
      </DndContext>
    </div>
  )
};

export default ToDoList;
