import { TTaskList, TTaskStructure } from '../types/TaskTypes';

import Task from './Task';

const Tasks = ({ tasks, removeTask, updateTask, changeStatus, changePriority, changePosition }: TTaskList) => {
  return (
    <section className='tasks tasks__container'>
      <h3 className='tasks__title'>Tasks:</h3>

      {tasks.map((task: TTaskStructure) => (
        <Task
          key={task.id}
          task={task}
          tasksList={{ currentIndex: tasks.indexOf(task), length: tasks.length }}
          removeTask={removeTask}
          updateTask={updateTask}
          changeStatus={changeStatus}
          changePriority={changePriority}
          changePosition={changePosition}
        />
      ))}
    </section>
  );
};

export default Tasks;
