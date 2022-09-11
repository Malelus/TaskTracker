import { useRef, useState } from 'react';

const Task = ({ task, tasks, updateTask, changeStatus, changePriority, changePosition, removeTask }) => {
  const status = ['TO DO', 'IN PROGRESS', 'DONE'];
  const priority = ['LOW', 'NORMAL', 'HIGH', 'HIGHEST'];

  const handleChange = (id, event) => {
    const { name, value } = event.target;

    updateTask(id, { [name]: value });
  };

  const [showNameAlert, setShowNameAlert] = useState(false);
  const edited = useRef(null);

  const alertDuration = 1000;

  const checkIfName = (event) => {
    if (!event.target.value.trim()) {
      edited.current.focus();

      setShowNameAlert(true);

      setTimeout(() => {
        setShowNameAlert(false);
      }, alertDuration);
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
        onBlur={(event) => checkIfName(event)}
        required
      />
      <span className={`task__name-border ${showNameAlert ? 'alert' : ''}`} />
      <p className='task__date'>
        {task.date || 'Date must be set!'}
        <input
          type='date'
          name='date'
          className='task__date__picker'
          value={task.date}
          onChange={(event) => handleChange(task.id, event)}
          required
        />
      </p>

      <div className='task__change'>
        <span className='task__change-title'>Status</span>
        <div className='task__change-container task__change-status'>
          <button
            className={`task__change-btn btn ${task.status === 2 ? 'btn--dimmed' : ''}`}
            onClick={() => changeStatus(task.id, '+')}
          >
            <i className='fa-solid fa-caret-up' />
          </button>
          <span className={`task__change-value task__change-status-${task.status}`}>{status[task.status]}</span>
          <button
            className={`task__change-btn btn ${task.status === 0 ? 'btn--dimmed' : ''}`}
            onClick={() => changeStatus(task.id, '-')}
          >
            <i className='fa-solid fa-caret-down' />
          </button>
        </div>

        <span className='task__change-title'>Priority</span>
        <div className='task__change-container task__change-priority'>
          <button
            className={`task__change-btn btn ${task.priority === 3 ? 'btn--dimmed' : ''}`}
            onClick={() => changePriority(task.id, '+')}
          >
            <i className='fa-solid fa-caret-up' />
          </button>
          <span className={`task__change-value task__change-priority-${task.priority}`}>{priority[task.priority]}</span>
          <button
            className={`task__change-btn btn ${task.priority === 0 ? 'btn--dimmed' : ''}`}
            onClick={() => changePriority(task.id, '-')}
          >
            <i className='fa-solid fa-caret-down' />
          </button>
        </div>

        <span className='task__change-title'>Move</span>
        <div className='task__change-container task__change-position'>
          <button
            className={`task__change-btn btn ${tasks.indexOf(task) === 0 ? 'btn--dimmed' : ''}`}
            onClick={() => changePosition(task.id, '+')}
          >
            <i className='fa-solid fa-caret-up' />
          </button>
          <button
            className={`task__change-btn btn ${tasks.indexOf(task) === tasks.length - 1 ? 'btn--dimmed' : ''}`}
            onClick={() => changePosition(task.id, '-')}
          >
            <i className='fa-solid fa-caret-down' />
          </button>
        </div>

        <button className='task__remove-btn btn' onClick={() => removeTask(task.id)}>
          <i className='fa-solid fa-trash-can' />
        </button>
      </div>
    </div>
  );
};

export default Task;
