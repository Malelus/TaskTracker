import { useRef, useState } from 'react';

import { nanoid } from 'nanoid';

const CreateTask = ({ pushTask, showCreateTask }) => {
  const initialTaskData = { id: nanoid(), name: '', dueDate: '', status: 0, priority: 1 };
  const [taskData, setTaskData] = useState(initialTaskData);

  const collapse = useRef();

  const handleChange = (event) => {
    const { name, value } = event;

    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    if (!taskData.name) {
      alert('Please fill in the name field!');
      return;
    }

    if (!taskData.dueDate) {
      alert('Please fill in the date field!');
      return;
    }

    pushTask(taskData);
    setTaskData(initialTaskData);
  };

  return (
    <section
      className={`create-task ${showCreateTask ? 'create-task--visible' : ''}`}
      style={showCreateTask ? { height: `${collapse.current.scrollHeight}px` } : { height: '0' }}
      ref={collapse}
    >
      <label htmlFor='name' className='create-task__label'>
        Task name
      </label>
      <input
        type='text'
        id='name'
        name='name'
        className='create-task__input'
        value={taskData.name}
        onChange={(e) => handleChange(e.target)}
        required
      />
      <label htmlFor='dueDate' className='create-task__label'>
        Due Date
      </label>
      <input
        type='date'
        id='dueDate'
        name='dueDate'
        className='create-task__input'
        value={taskData.dueDate}
        onChange={(e) => handleChange(e.target)}
        required
      />

      <button className='create-task__submit btn btn--icon' onClick={onSubmit}>
        Create Task <i className='fa-solid fa-plus' />
      </button>
    </section>
  );
};

export default CreateTask;
