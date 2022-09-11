import Task from './Task';

const Tasks = ({ tasks, removeTask, updateTask, changeStatus, changePriority, changePosition }) => {
  return (
    <section className='tasks tasks__container'>
      <h3 className='tasks__title'>Tasks:</h3>

      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          tasks={tasks}
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
