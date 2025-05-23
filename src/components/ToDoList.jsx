import { DndContext } from '@dnd-kit/core';
import TaskColumn from './TaskColumn';
import { useEffect, useState } from 'react';
import AddTask from './TaskCreator';
import "./ToDoList.css";

const ToDoList = ({ todos }) => {
  const [tasks, setTasks] = useState({
    "to-do": [],
    "in-progress": [],
    "done": [],
  });

  function handleAddTask(name) {
    const newTask = {
      id: crypto.randomUUID(),
      text: name,
      status: "to-do",
    };

    setTasks(prev => ({
      ...prev,
      "to-do": [...prev["to-do"], newTask],
    }));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const draggedId = active.id;
    const newStatus = over.id;

    let draggedTask = null;
    const updated = {};

    for (const [status, arr] of Object.entries(tasks)) {
      const newArr = arr.filter(task => {
        if (task.id === draggedId) {
          draggedTask = { ...task, status: newStatus };
          return false;
        }
        return true;
      });
      updated[status] = newArr;
    }

    if (!draggedTask) return;

    updated[newStatus] = [...updated[newStatus], draggedTask];
    setTasks(updated);
  }

  useEffect(() => {
    const arr = {
      "to-do": [],
      "in-progress": [],
      "done": [],
    };

    todos.forEach((t) => {
      arr[t.status]?.push(t);
    });

    setTasks(arr);
  }, [todos]);

  return (
    <div className="main-wrapper">
      <header className="header">
        <h1>To-Do List</h1>
      </header>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="body">
          {/* TOP AREA- ADD TASK */}
          <AddTask handleAddTask={handleAddTask} />
          {/* CENTRAL AREA - TASK COLUMNS */}
          <div className='task-columns-wrapper'>
            {
              Object.entries(tasks).map(
                ([category, status]) => (
                  <TaskColumn
                    key={category}
                    name={category}
                    tasks={status}
                  />
                )
              )
            }
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
