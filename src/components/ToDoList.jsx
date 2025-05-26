import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import TaskColumn from './TaskColumn';
import AddTask from './TaskCreator';
import TaskTrash from './TaskTrash';
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

  function handleDeleteTask(id) {
    const updated = {};

    for (const [status, arr] of Object.entries(tasks)) {
      updated[status] = arr.filter(task => task.id !== id);
    }

    setTasks(updated);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const draggedId = active.id;

    if (over.id === 'trash') {
      handleDeleteTask(draggedId);
      return;
    }
    
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
      <DndContext onDragEnd={handleDragEnd}>
        <div className="body">
          <div className='content-wrapper'>
            <header className="header">
              <h1>TO DO LIST</h1>
            </header>
            <AddTask handleAddTask={handleAddTask} />
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
            <div className='trash-wrapper'>
              <TaskTrash />
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  )
};

export default ToDoList;
