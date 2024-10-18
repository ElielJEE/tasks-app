import React, { useState } from 'react';

export default function TaskCard({ title, description, difficulty }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

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
    </div>
  );
}