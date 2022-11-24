import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';

import { directionOptions } from '../utils/updateProperties';

import { TTask, TTaskError } from '../types/TaskTypes';

import { statusLabels, priorityLabels } from '../data/propertiesLabels.json';

const Task = ({ task, tasksList, removeTask, updateTask, changeStatus, changePriority, changePosition }: TTask) => {
  const initialErrorObject: TTaskError = { duration: 1000, nameError: false };
  const [error, setError] = useState(initialErrorObject);

  // Refs for validation and correct operation of task editing
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const prevDateRef = useRef<string | null>(null);

  useEffect(() => {
    prevDateRef.current = task.date;
  }, [task.date]);

  // Handling of the entered data to update a task
  const handleChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value, type } = event.target;

    if (type === 'date' && value === '') return updateTask(id, { date: `${prevDateRef.current}` });

    updateTask(id, { [name]: value });
  };

  // Validation of task name
  const isNameValid = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.target.value.trim()) {
      nameRef.current!.focus();

      setError((prev) => ({ ...prev, nameError: true }));

      setTimeout(() => {
        setError(initialErrorObject);
      }, error.duration);
    }
  };

  // Boolean objects to style arrows for status, priority and position updates
  const status = {
    isMax: task.status === statusLabels.length - 1,
    isMin: task.status === 0,
  };

  const priority = {
    isMax: task.priority === priorityLabels.length - 1,
    isMin: task.priority === 0,
  };

  const currentTask = {
    isFirst: tasksList.currentIndex === 0,
    isLast: tasksList.currentIndex === tasksList.length - 1,
  };

  return (
    <div className='task'>
      <input
        type='text'
        name='name'
        className='task__name'
        ref={nameRef}
        value={task.name}
        onChange={(event) => handleChange(event, task.id)}
        onBlur={isNameValid}
        autoComplete='off'
      />
      <span className={`task__name-border ${error.nameError ? 'error' : ''}`} />

      <div className='task__date'>
        <input
          type='date'
          name='date'
          className='task__date-input'
          value={task.date}
          onChange={(event) => handleChange(event, task.id)}
          ref={dateRef}
        />
        <button className='task__date-picker fa-regular fa-calendar' onClick={() => dateRef.current!.showPicker()} />
      </div>

      <div className='task__change'>
        <span className='task__change-title'>Status</span>
        <div className='task__change-container task__change-status'>
          <button
            className={`task__change-btn btn ${status.isMax ? 'btn--dimmed' : ''}`}
            onClick={() => changeStatus(task.id, directionOptions.increase)}
          >
            <i className='fa-solid fa-caret-up' />
          </button>
          <span className={`task__change-value task__change-status-${task.status}`}>{statusLabels[task.status]}</span>
          <button
            className={`task__change-btn btn ${status.isMin ? 'btn--dimmed' : ''}`}
            onClick={() => changeStatus(task.id, directionOptions.decrease)}
          >
            <i className='fa-solid fa-caret-down' />
          </button>
        </div>

        <span className='task__change-title'>Priority</span>
        <div className='task__change-container task__change-priority'>
          <button
            className={`task__change-btn btn ${priority.isMax ? 'btn--dimmed' : ''}`}
            onClick={() => changePriority(task.id, directionOptions.increase)}
          >
            <i className='fa-solid fa-caret-up' />
          </button>
          <span className={`task__change-value task__change-priority-${task.priority}`}>
            {priorityLabels[task.priority]}
          </span>
          <button
            className={`task__change-btn btn ${priority.isMin ? 'btn--dimmed' : ''}`}
            onClick={() => changePriority(task.id, directionOptions.decrease)}
          >
            <i className='fa-solid fa-caret-down' />
          </button>
        </div>

        <span className='task__change-title'>Move</span>
        <div className='task__change-container task__change-position'>
          <button
            className={`task__change-btn btn ${currentTask.isFirst ? 'btn--dimmed' : ''}`}
            onClick={() => changePosition(task.id, directionOptions.decrease)}
          >
            <i className='fa-solid fa-caret-up' />
          </button>
          <button
            className={`task__change-btn btn ${currentTask.isLast ? 'btn--dimmed' : ''}`}
            onClick={() => changePosition(task.id, directionOptions.increase)}
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
