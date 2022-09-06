import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import NoTasks from './components/NoTasks';
import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const pushTask = (task) => {
    setTasks([task, ...tasks]);
  };

  // Remove task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Update task
  const updateTask = (id, data) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...data } : task)));
  };

  // Change status of task

  const changeStatus = (id, mode) => {
    const change = (status) => {
      if (mode === '+') {
        return status < 2 ? status + 1 : status;
      }

      if (mode === '-') {
        return status > 0 ? status - 1 : status;
      }
    };

    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: change(task.status) } : task)));
  };

  // Change priority of task

  const changePriority = (id, mode) => {
    const change = (priority) => {
      if (mode === '+') {
        return priority < 3 ? priority + 1 : priority;
      }

      if (mode === '-') {
        return priority > 0 ? priority - 1 : priority;
      }
    };

    setTasks(tasks.map((task) => (task.id === id ? { ...task, priority: change(task.priority) } : task)));
  };

  const [showCreateTask, setShowCreateTask] = useState(false);

  return (
    <div className='container'>
      <Header showCreateTask={showCreateTask} setShowCreateTask={setShowCreateTask} />
      <CreateTask pushTask={pushTask} showCreateTask={showCreateTask} />
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          removeTask={removeTask}
          updateTask={updateTask}
          changeStatus={changeStatus}
          changePriority={changePriority}
        />
      ) : (
        <NoTasks />
      )}
      <Footer />
    </div>
  );
};

export default App;
