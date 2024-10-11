import React, { useState, useContext } from 'react';
import { createTask } from '../services';
import { TaskContext } from '../services/TaskContext';

export default function CreateTaskView() {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    estimatedTime: '',
    status: 'pending',
  })

  /* const { addTask } = useContext(TaskContext); */

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found.')
      return
    }

    const result = await createTask(token, taskData);

    if (result.success) {
      setSuccessMessage('Tarea creada correctamente!')
      setTaskData({
        title: '',
        description: '',
        difficulty: 'easy',
        estimatedTime: '',
        status: 'pending',
      })

      /* addTask(result.newTask); */
    } else {
      setErrors(result.errors)
    }

  };

  return (
    <div className="form-task-container s-container">
      <h2>Crear nuevas tareas</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="form-task-container__form-task">
        <div className="form-task-container__form-task__form-row">
          <label htmlFor="title" className="form-task-container__form-task__form-row__label-task">Titulo:</label>
          <input
            className="form-task-container__form-task__form-row__input-task"
            type="text"
            id="title"
            name='title'
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-task-container__form-task__form-row">
          <label htmlFor="description" className="form-task-container__form-task__form-row__label-task">Descripcion:</label>
          <textarea
            className="form-task-container__form-task__form-row__textarea-task"
            id="description"
            name='description'
            value={taskData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-task-container__form-task__form-row">
          <label htmlFor="difficulty" className="form-task-container__form-task__form-row__label-task">Dificultad:</label>
          <select
            className="form-task-container__form-task__form-row__select-task"
            id="difficulty"
            name='difficulty'
            value={taskData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-task-container__form-task__form-row">
          <label htmlFor="estimatedTime" className="form-task-container__form-task__form-row__label-task">Tiempo (hours):</label>
          <input
            className="form-task-container__form-task__form-row__input-task"
            type="number"
            id="estimatedTime"
            name="estimatedTime"
            value={taskData.estimatedTime}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="form-task-container__form-task__submit-btn">Crear tarea</button>
      </form>
    </div>
  )
}
