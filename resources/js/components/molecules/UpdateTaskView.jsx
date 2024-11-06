import React from 'react'

export default function UpdateTaskView() {
	

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

				{taskData.objectives.map((objective, index) => (
					<div className="form-task-container__form-task__form-row" key={index}>
						<input
							className="form-task-container__form-task__form-row__input-task-objective"
							type="text"
							value={objective.description}
							onChange={(e) => handleChangeObjectives(e, index)}
							onKeyUp={(e) => handleObjectiveKeyPress(e, index)}
							placeholder='Titulo de la tarea'
						/>
						{
							objective.description !== '' && taskData.objectives.length > 1 && (
								<button
									type='button'
									className="form-task-container__form-task__form-row__delete-objective"
									onClick={() => removeObjective(index)}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
										<path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
									</svg>
								</button>
							)
						}
					</div>
				))}

				<button
					type="button"
					className="form-task-container__form-task__submit-btn"
					onClick={e => handleSubmit(e)}
				>Crear tarea</button>
			</form>
		</div>
	)
}
