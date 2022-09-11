import { useState, useEffect } from 'react';

import { arrayMoveImmutable as moveTask } from 'array-move';

import Header from './components/Header';
import Footer from './components/Footer';

import NoTasks from './components/NoTasks';
import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(() => JSON.parse(localStorage.getItem('darkTheme')) || false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkTheme);

    localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
  }, [darkTheme]);

  const toggleTheme = () => {
    darkTheme ? setDarkTheme(false) : setDarkTheme(true);
  };

  // Get tasks from local storage or make an empty array
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  // Update local storage on any change in tasks
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Push new task
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

      return status;
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

      return priority;
    };

    setTasks(tasks.map((task) => (task.id === id ? { ...task, priority: change(task.priority) } : task)));
  };

  // Change position of task
  const changePosition = (id, direction) => {
    const indexOfTask = tasks.indexOf(tasks.find((task) => task.id === id));

    const newPosition = () => {
      if (direction === '+') {
        return indexOfTask > 0 ? indexOfTask - 1 : indexOfTask;
      }

      if (direction === '-') {
        return indexOfTask < tasks.length - 1 ? indexOfTask + 1 : indexOfTask;
      }

      return indexOfTask;
    };

    setTasks(moveTask(tasks, indexOfTask, newPosition()));
  };

  const [showCreateTask, setShowCreateTask] = useState(false);

  return (
    <div className='container'>
      <Header
        darkTheme={darkTheme}
        toggleTheme={toggleTheme}
        showCreateTask={showCreateTask}
        setShowCreateTask={setShowCreateTask}
      />
      <CreateTask pushTask={pushTask} showCreateTask={showCreateTask} />
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          removeTask={removeTask}
          updateTask={updateTask}
          changeStatus={changeStatus}
          changePriority={changePriority}
          changePosition={changePosition}
        />
      ) : (
        <NoTasks />
      )}
      <Footer />
    </div>
  );
};

export default App;
