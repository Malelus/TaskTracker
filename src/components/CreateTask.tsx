import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { v4 as uuid } from 'uuid';

import { TCreateTaskForm } from '../types/FormTypes';
import { TTaskError, TTaskStructure } from '../types/TaskTypes';

const CreateTask = ({ submitTask, showCreateTask }: TCreateTaskForm) => {
  const initialTaskStructure: TTaskStructure = { id: uuid(), name: '', date: '', status: 0, priority: 1 };
  const initialErrorObject: TTaskError = { duration: 1000, nameError: false, dateError: false };

  const [taskData, setTaskData] = useState(() => initialTaskStructure);
  const formCollapse = useRef<HTMLFormElement>(null);

  const [error, setError] = useState(initialErrorObject);
  const isError = error.nameError || error.dateError;

  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // Moving the cursor into an empty task data field
  useEffect(() => {
    if (error.nameError) return nameRef.current?.focus();
    if (error.dateError) return dateRef.current?.focus();
  }, [error]);

  // Handling of the entered data to create a task
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation and submission of task data
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isTaskNameInvalid = !taskData.name.trim();
    const isTaskDateInvalid = !taskData.date;

    if (isTaskNameInvalid || isTaskDateInvalid) {
      if (isTaskNameInvalid) {
        setError((prev) => ({ ...prev, nameError: true }));
      }

      if (isTaskDateInvalid) {
        setError((prev) => ({ ...prev, dateError: true }));
      }

      setTimeout(() => {
        setError(initialErrorObject);
      }, error.duration);

      return;
    }

    submitTask(taskData);
    setTaskData(initialTaskStructure);
  };

  return (
    <form
      className={`create-task ${showCreateTask ? 'create-task--visible' : ''}`}
      style={showCreateTask ? { height: `${formCollapse.current!.scrollHeight}px` } : { height: '0' }}
      onSubmit={handleSubmit}
      ref={formCollapse}
    >
      <div>
        <label htmlFor='name' className={`create-task__label ${error.nameError ? 'error' : ''}`}>
          Task name
        </label>

        <input
          type='text'
          id='name'
          name='name'
          className='create-task__input'
          autoComplete='off'
          value={taskData.name}
          onChange={handleChange}
          ref={nameRef}
        />
      </div>

      <div>
        <label htmlFor='date' className={`create-task__label ${error.dateError ? 'error' : ''}`}>
          Date
        </label>

        <input
          type='date'
          id='name'
          name='date'
          className='create-task__input'
          value={taskData.date}
          onChange={handleChange}
          onFocus={() => dateRef.current!.showPicker()}
          ref={dateRef}
        />
      </div>

      <div className='create-task__actions'>
        <button className={`create-task__submit ${isError ? 'create-task__submit--error' : ''} btn btn--icon `}>
          Create Task <i className='fa-solid fa-plus' />
        </button>

        <button
          className='create-task__clear btn btn--icon'
          type='button'
          onClick={() => setTaskData(initialTaskStructure)}
        >
          <i className='fa-solid fa-arrow-rotate-left' />
        </button>
      </div>
    </form>
  );
};

export default CreateTask;
