import { useRef, useState } from 'react';

import { nanoid } from 'nanoid';

const CreateTask = ({ pushTask, showCreateTask }) => {
  const initialTaskData = { id: nanoid(), name: '', date: '', status: 0, priority: 1 };
  const [taskData, setTaskData] = useState(initialTaskData);
  const collapse = useRef(null);

  // Update the data entered into the form
  const handleChange = (event) => {
    const { name, value } = event;

    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showAlert, setShowAlert] = useState({ alertName: false, alertDate: false });
  const alertDuration = 1000;

  // Validation of the entered information about the task
  const handleSubmit = () => {
    if (!taskData.name.trim() || !taskData.date) {
      if (!taskData.name.trim()) {
        setShowAlert((prev) => ({ ...prev, alertName: true }));

        setTimeout(() => {
          setShowAlert((prev) => ({ ...prev, alertName: false }));
        }, alertDuration);
      }

      if (!taskData.date) {
        setShowAlert((prev) => ({ ...prev, alertDate: true }));

        setTimeout(() => {
          setShowAlert((prev) => ({ ...prev, alertDate: false }));
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
        <label htmlFor='date' className={`create-task__label ${showAlert.alertDate ? 'alert' : ''}`}>
          Date
        </label>
        <input
          type='date'
          id='date'
          name='date'
          className='create-task__input'
          value={taskData.date}
          onChange={(event) => handleChange(event.target)}
          required
        />
      </div>

      <button
        className={`create-task__submit ${
          showAlert.alertName || showAlert.alertDate ? 'create-task__submit--alert' : ''
        } btn btn--icon `}
        onClick={handleSubmit}
      >
        Create Task <i className='fa-solid fa-plus' />
      </button>
    </section>
  );
};

export default CreateTask;
