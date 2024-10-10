import React, { useState } from 'react';

export default function TaskCard({ title, description, difficulty }) {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleCheckboxChange = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
            <h3 className="task-card__task-title">{title}</h3>
            <p className="task-card__task-description">{description}</p>
            <div className="task-card__task-details">
                <span className={`task-card__task-details__task-difficulty ${difficulty}`}>
                    Dificultad: {difficulty}
                </span>
                <label>
                    <input 
                        type="checkbox" 
                        checked={isCompleted} 
                        onChange={handleCheckboxChange} 
                    />
                    Completada
                </label>
            </div>
        </div>
    );
}