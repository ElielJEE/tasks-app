import React, { useState, useContext } from 'react';
import { createTask } from '../services';
import { TaskContext } from '../services/TaskContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CreateTaskView({ func }) {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    difficulty: 'facil',
    estimatedTime: '',
    status: 'pendiente',
  })

  const location = useLocation();
  const shouldShowModal = location.state?.showModal ?? showModal;
  const [closeModal, setCloseModal] = useState(true)
  const navigate = useNavigate()

  if (!shouldShowModal) {
    return null;
  }

  const { addTask } = useContext(TaskContext);

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
        difficulty: 'facil',
        estimatedTime: '',
        status: 'pendiente',
      })

      addTask(result.data.task);
      setCloseModal(false)
      navigate('/tasks', { state: { showModal: false } })
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
          <input
            className="form-task-container__form-task__form-row__input-task"
            type="text"
            id="title"
            name='title'
            value={taskData.title}
            onChange={handleChange}
            required
            placeholder='Titulo de la tarea'
          />
        </div>

        <div className="form-task-container__form-task__form-row">
          <textarea
            className="form-task-container__form-task__form-row__textarea-task"
            id="description"
            name='description'
            value={taskData.description}
            onChange={handleChange}
            placeholder='Descripcion'
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
            <option value="facil">facil</option>
            <option value="medio">medio</option>
            <option value="dificil">dificil</option>
          </select>
        </div>

        <button
          type="submit"
          className="form-task-container__form-task__submit-btn"
        >Crear tarea</button>
      </form>
    </div>
  )
}
