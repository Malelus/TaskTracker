import { useRef } from 'react';

const Task = ({ task, removeTask, updateTask, changeStatus, changePriority }) => {
  const status = ['TO DO', 'IN PROGRESS', 'DONE'];
  const priority = ['LOW', 'NORMAL', 'HIGH', 'HIGHEST'];

  const edited = useRef(null);

  const handleChange = (id, event) => {
    const { name, value } = event.target;

    console.log(name, value);

    updateTask(id, { [name]: value });
  };

  const checkIfContent = (event) => {
    if (!event.target.value) {
      edited.current.focus();
      return;
    }
  };

  return (
    <div className='task'>
      <input
        type='text'
        name='name'
        className='task__name'
        value={task.name}
        ref={edited}
        onChange={(event) => handleChange(task.id, event)}
        onBlur={(event) => checkIfContent(event)}
      />
      <p className='task__due-date'>
        {task.dueDate}
        <input
          type='date'
          name='dueDate'
          className='task__due-date__picker'
          value={task.dueDate}
          ref={edited}
          onChange={(event) => handleChange(task.id, event)}
          onBlur={(event) => checkIfContent(event)}
        />
      </p>

      <div className='task__change'>
        <div className='task__change-container'>
          <button
            className={`task__change-btn ${task.status === 2 ? 'task__change-btn--dimmed' : ''} btn`}
            onClick={() => changeStatus(task.id, '+')}
          >
            <i className='fa-solid fa-caret-up' />
          </button>
          <span className={`task__change-value task__change-status-${task.status}`}>{status[task.status]}</span>
          <button
            className={`task__change-btn ${task.status === 0 ? 'task__change-btn--dimmed' : ''} btn`}
            onClick={() => changeStatus(task.id, '-')}
          >
            <i className='fa-solid fa-caret-down' />
          </button>
        </div>

        <div className='task__change-container'>
          <button
            className={`task__change-btn ${task.priority === 3 ? 'task__change-btn--dimmed' : ''} btn`}
            onClick={() => changePriority(task.id, '+')}
          >
            <i className='fa-solid fa-caret-up' />
          </button>
          <span className={`task__change-value task__change-priority-${task.priority}`}>{priority[task.priority]}</span>
          <button
            className={`task__change-btn ${task.priority === 0 ? 'task__change-btn--dimmed' : ''} btn`}
            onClick={() => changePriority(task.id, '-')}
          >
            <i className='fa-solid fa-caret-down' />
          </button>
        </div>

        <button className='task__remove-btn btn btn' onClick={() => removeTask(task.id)}>
          <i className='fa-solid fa-trash-can' />
        </button>
      </div>
    </div>
  );
};

export default Task;
