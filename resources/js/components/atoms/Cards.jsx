import React, { useState, useContext } from 'react';
import { TaskContext } from '../services/TaskContext';

export default function TaskCard({ title, description, difficulty, id, objectives }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedObj, setIsCompletedObj] = useState(false);
  const { deleteTask } = useContext(TaskContext);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const handleCheckboxObjectivesChange = (index) => {
    const updatedObjective = [...isCompleted]
    updatedObjective[index] = !updatedObjective[index]
    setIsCompletedObj(updatedObjective);
  };

  const handleDelete = () => {
    deleteTask(id)
  }

  console.log(objectives);

  return (
    <>
      <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
        <div className={`task-card__checkbox-container  ${difficulty}`}>
          <input className='task-card__checkbox-container__task-checkbox'
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="task-card__info-container">
          <h3 className="task-card__info-container__task-title">{title}</h3>
          <p className="task-card__info-container__task-description">{description}</p>
          {
            objectives.length > 0 && (
              <>
                <h5 className="task-card__info-container__task-objectives-title">Objetivos</h5>
                <ul className="task-card__info-container__task-objectives-list">
                  {objectives.map((item, key, index) => (
                    <li className="task-card__info-container__task-objectives-list__task-objective-item" key={key}>
                      <input type="checkbox"
                        checked={isCompletedObj[index]} className='task-card__info-container__task-objectives-list__task-objective-item__task-objective-checkbox'
                        onChange={() => handleCheckboxObjectivesChange(index)}
                      />
                      <span className="task-card__info-container__task-objectives-list__task-objective-item__task-objective-title">
                        {item.description}
                      </span>
                    </li>

                  ))}
                </ul>
              </>
            )
          }
        </div>
        <button className="task-card__edit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
          </svg>
        </button>
        <button className="task-card__delete-btn" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
          </svg>
        </button>
      </div>
    </>
  );
}