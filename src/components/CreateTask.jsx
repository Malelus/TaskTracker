import { useRef, useState } from 'react';

import { nanoid } from 'nanoid';

const CreateTask = ({ pushTask, showCreateTask }) => {
  const initialTaskData = { id: nanoid(), name: '', dueDate: '', status: 0, priority: 1 };
  const [taskData, setTaskData] = useState(initialTaskData);
  const collapse = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event;

    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showAlert, setShowAlert] = useState({ alertName: false, alertDueDate: false });
  const alertDuration = 1000;

  const handleSubmit = () => {
    if (!taskData.name.trim() || !taskData.dueDate) {
      if (!taskData.name.trim()) {
        setShowAlert((prev) => ({ ...prev, alertName: true }));

        setTimeout(() => {
          setShowAlert((prev) => ({ ...prev, alertName: false }));
        }, alertDuration);
      }

      if (!taskData.dueDate) {
        setShowAlert((prev) => ({ ...prev, alertDueDate: true }));

        setTimeout(() => {
          setShowAlert((prev) => ({ ...prev, alertDueDate: false }));
        }, alertDuration);
      }

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
      <div>
        <label htmlFor='name' className={`create-task__label ${showAlert.alertName ? 'alert' : ''}`}>
          Task name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='create-task__input'
          value={taskData.name}
          onChange={(event) => handleChange(event.target)}
          required
        />
      </div>
      <div>
        <label htmlFor='dueDate' className={`create-task__label ${showAlert.alertDueDate ? 'alert' : ''}`}>
          Due Date
        </label>
        <input
          type='date'
          id='dueDate'
          name='dueDate'
          className='create-task__input'
          value={taskData.dueDate}
          onChange={(event) => handleChange(event.target)}
          required
        />
      </div>

      <button
        className={`create-task__submit ${
          showAlert.alertName || showAlert.alertDueDate ? 'create-task__submit--alert' : ''
        } btn btn--icon `}
        onClick={handleSubmit}
      >
        Create Task <i className='fa-solid fa-plus' />
      </button>
    </section>
  );
};

export default CreateTask;
