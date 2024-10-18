import React, { useState, useContext } from 'react';
import { TaskContext } from '../services/TaskContext';

export default function TaskCard({ title, description, difficulty, id }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { deleteTask } = useContext(TaskContext); 

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const handleDelete = () => {
    deleteTask(id)
  }

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className={`task-card__checkbox-container  ${difficulty}`}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="task-card__info-container">
        <h3 className="task-card__info-container__task-title">{title}</h3>
        <p className="task-card__info-container__task-description">{description}</p>
      </div>
      <button className="task-card__edit-btn">
        Editar
      </button>
      <button className="task-card__delete-btn" onClick={handleDelete}>
        Borrar
      </button>
    </div>
  );
}