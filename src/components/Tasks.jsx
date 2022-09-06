import Task from './Task';

const Tasks = ({ tasks, removeTask, updateTask, changeStatus, changePriority }) => {
  return (
    <section className='tasks tasks__container'>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          removeTask={removeTask}
          updateTask={updateTask}
          changeStatus={changeStatus}
          changePriority={changePriority}
        />
      ))}
    </section>
  );
};

export default Tasks;
