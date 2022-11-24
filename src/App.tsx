import { useState } from 'react';

import useDarkMode from './hooks/useDarkMode';
import { useLocalStorage } from './hooks/useLocalStorage';

import { arrayShiftImmutable as moveTask } from './utils/arrayShift';
import updateProperties from './utils/updateProperties';

import { TTaskStructure } from './types/TaskTypes';

import { statusLabels, priorityLabels } from './data/propertiesLabels.json';

import Header from './Header';
import Footer from './Footer';

import CreateTask from './components/CreateTask';
import TasksList from './components/TasksList';
import NoTasks from './components/NoTasks';

const App = () => {
  // Change the app color mode and save it to local storage
  const { isDarkActive, toggleMode } = useDarkMode();

  // Store task data in local storage
  const [tasks, setTasks] = useLocalStorage<TTaskStructure[]>({ key: 'tasks', defaultValue: [] });
  const [showCreateTask, setShowCreateTask] = useState<boolean>(false);

  const toggleCreateTask = () => {
    setShowCreateTask((prev) => !prev);
  };

  // Add new task
  const submitTask = (newTask: TTaskStructure) => {
    setTasks([newTask, ...tasks]);
  };

  // Remove task
  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Update task
  const updateTask = (id: string, newTaskData: Partial<TTaskStructure>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...newTaskData } : task)));
  };

  // Change status of task
  const changeStatus = (id: string, direction: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: updateProperties({ array: statusLabels, currentValue: task.status, direction }) }
          : task
      )
    );
  };

  // Change priority of task
  const changePriority = (id: string, direction: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, priority: updateProperties({ array: priorityLabels, currentValue: task.priority, direction }) }
          : task
      )
    );
  };

  // Change position of task
  const changePosition = (id: string, direction: string) => {
    const indexOfTask = tasks.indexOf(tasks.find((task) => task.id === id)!);
    const newIndexOfTask = updateProperties({ array: tasks, currentValue: indexOfTask, direction });

    setTasks(moveTask({ array: tasks, fromIndex: indexOfTask, toIndex: newIndexOfTask }));
  };

  return (
    <div className='container'>
      <Header
        isDarkActive={isDarkActive}
        toggleMode={toggleMode}
        showCreateTask={showCreateTask}
        toggleCreateTask={toggleCreateTask}
      />

      <CreateTask submitTask={submitTask} showCreateTask={showCreateTask} />

      {tasks.length > 0 ? (
        <TasksList
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
