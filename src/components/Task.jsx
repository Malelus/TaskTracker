import { useRef, useState } from 'react';

const Task = ({ task, tasks, updateTask, changeStatus, changePriority, changePosition, removeTask }) => {
  const status = ['TO DO', 'IN PROGRESS', 'DONE'];
  const priority = ['LOW', 'NORMAL', 'HIGH', 'HIGHEST'];

  const handleChange = (id, event) => {
    const { name, value } = event.target;

    updateTask(id, { [name]: value });
  };

  const [showAlert, setShowAlert] = useState({ alertName: false, alertDueDate: false });
  const edited = useRef(null);

  const alertDuration = 1000;

  const checkIfName = (event) => {
    if (!event.target.value.trim()) {
      edited.current.focus();

      setShowAlert((prev) => ({ ...prev, alertName: true }));

      setTimeout(() => {
        setShowAlert((prev) => ({ ...prev, alertName: false }));
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
      <span className={`task__name-border ${showAlert.alertName ? 'alert' : ''}`} />
      <p className={`task__due-date ${showAlert.alertDueDate ? 'alert' : ''}`}>
        {task.dueDate || 'Due date must be set!'}
        <input
          type='date'
          name='dueDate'
          className='task__due-date__picker'
          value={task.dueDate}
          onChange={(event) => handleChange(task.id, event)}
          required={true}
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
