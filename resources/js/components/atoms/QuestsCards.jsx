import React, { useContext, useState } from 'react'
import { useActive } from '../hooks'
import { QuestContext } from '../services/QuestContext';

export default function ({ name, id, description, objectives, status, difficulty, start_date, end_date }) {
	const { active, activeHandle } = useActive();
	const { deleteQuest, updateQuest } = useContext(QuestContext);
	const [questDataUpdate, setQuestDataUpdate] = useState({
		name: name || '',
		description: description || '',
		status: status || 'activo',
		difficulty: difficulty || 'facil',
		start_date: start_date || '',
		end_date: end_date || '',
		objectives: (objectives && objectives.length > 0)
			? objectives.map(obj => ({ description: obj.description || '', completed: obj.completed || 'pendiente', id: obj.id }))
			: [{ description: '', completed: 'pendiente', id: '' }]
	})
	const [isCompleted, setIsCompleted] = useState(false)
	const [isCompletedObj, setIsCompletedObj] = useState(objectives.map((item) => item.completed === 'completado' ? true : false));
	const [xpMessage, setXpMessage] = useState(false);

	const handleDelete = () => {
		deleteQuest(id)
	}

	const addObjective = (e) => {
		console.log('hola');
		e.preventDefault();
		setQuestDataUpdate({
			...questDataUpdate,
			objectives: [...questDataUpdate.objectives, { description: '' }]
		});
	};

	const handleObjectiveKeyPress = (e, index) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (questDataUpdate.objectives[index].description.trim() !== '') {
				addObjective(e);
			}
		}
	};

	const removeObjective = (index) => {
		if (questDataUpdate.objectives.length === 1) {
			setQuestDataUpdate({
				...questDataUpdate,
				objectives: [{ description: '' }]
			})
		} else {
			const newObjectives = questDataUpdate.objectives.filter((_, i) => i !== index);
			setQuestDataUpdate((prevState) => ({
				...prevState,
				objectives: newObjectives,
			}));
		}
	};

	const handleChange = (e) => {
		setQuestDataUpdate({
			...questDataUpdate,
			[e.target.name]: e.target.value
		})
	}

	const handleChangeObjectivesUpdate = (e, index) => {
		e.preventDefault();
		const newObjectives = [...questDataUpdate.objectives];
		newObjectives[index].description = e.target.value;
		setQuestDataUpdate({ ...questDataUpdate, objectives: newObjectives })
	}

	const handleCheckboxChange = () => {
		const updatedStatus = questDataUpdate.status !== 'completado';
		setQuestDataUpdate(prev => ({ ...prev, status: updatedStatus ? 'completo' : 'activo' }));



		handleSubmit(null, updatedStatus);
	};

	const handleCheckboxObjectivesChange = async (idObj, index) => {
		const updatedIsCompletedObj = [...isCompletedObj]
		updatedIsCompletedObj[index] = !updatedIsCompletedObj[index]

		setIsCompletedObj(updatedIsCompletedObj);
		const updatedObjectives = questDataUpdate.objectives.map(objective => (
			objective.id === idObj
				? { ...objective, completed: !isCompletedObj[index] ? 'completado' : 'pendiente' }
				: objective
		))

		try {
			const token = localStorage.getItem('token');
			const dataToUpdate = { ...questDataUpdate, objectives: updatedObjectives, id }
			await updateQuest(dataToUpdate, token);
			setQuestDataUpdate(dataToUpdate)
			console.log("Objetivo actualizado con éxito");
		} catch (error) {
			console.error('Error al actualizar el objetivo:', error);
		}
	};

	const handleSubmit = async (e = null, updateStatus = isCompleted) => {
		if (e) e.preventDefault();

		const token = localStorage.getItem('token')
		if (!token) {
			console.error('No se encontro el token.')
			return
		}

		let dataToUpdate = { id };

		const filterObjectives = questDataUpdate.objectives.filter(
			(objective) => objective.description.trim() !== ''
		);

		dataToUpdate = {
			...questDataUpdate,
			status: updateStatus ? 'completo' : 'activo',
			objectives: filterObjectives,
			id
		}

		try {
			console.log(dataToUpdate);
			await updateQuest(dataToUpdate, token)
			setQuestDataUpdate(dataToUpdate)
			activeHandle(0)
		} catch (error) {
			console.error("error al actualizar la tarea:", error)
		}
	}

	return (
		<>
			<div className={`quest-card ${questDataUpdate.status === 'completo' ? 'completed' : ''}`}>
				<div className={`quest-card__checkbox-container ${difficulty} ${questDataUpdate.status === 'completo' ? 'completed' : ''}`}>
					{
						active === 1 ? (
							''
						) : (
							<input
								type="checkbox"
								className="quest-card__checkbox-container__quest-checkbox"
								name='status'
								checked={questDataUpdate.status === 'completo'}
								onChange={handleCheckboxChange}
							/>
						)
					}
				</div>
				<div className="quest-card__info-container">
					{
						active === 1 ? (
							<>
								<input
									type="text"
									className="quest-card__info-container__quest-card-input"
									name='name'
									value={questDataUpdate.name}
									onChange={handleChange}
								/>
								<textarea
									name="description"
									className="quest-card__info-container__quest-card-input"
									value={questDataUpdate.description}
									onChange={handleChange}
								/>
								<select
									name="difficulty"
									className="quest-card__info-container__quest-card-input"
									value={questDataUpdate.difficulty}
									onChange={handleChange}
								>
									<option value="facil">Facil</option>
									<option value="medio">Medio</option>
									<option value="dificil">Dificil</option>
								</select>
								<div className="quest-card__info-container__date-container">
									<label htmlFor="start_date" className="quest-card__info-container__date-container__title">Fecha de inicio:</label>
									<input
										type="date"
										className="quest-card__info-container__quest-card-input"
										name='start_date'
										value={questDataUpdate.start_date}
										onChange={handleChange}
									/>
								</div>
								<div className="quest-card__info-container__date-container">
									<label htmlFor="end_date" className="quest-card__info-container__date-container__title">Fecha limite:</label>
									<input
										type="date"
										className="quest-card__info-container__quest-card-input"
										name='end_date'
										value={questDataUpdate.end_date}
										onChange={handleChange}
									/>
								</div>
							</>
						) : (
							<>
								<h3 className="quest-card__info-container__quest-name">{name}</h3>
								<p className="quest-card__info-container__quest-description">{description}</p>
								<h4 className="quest-card__info-container__quest-start-date-title">
									fecha de inicio
									<span className="quest-card__info-container__quest-start-date-title__start-date">
										&#10003; {start_date}
									</span>
								</h4>
								<h4
									className="quest-card__info-container__quest-end-date-title">
									fecha de limite
									<span className="quest-card__info-container__quest-end-date-title__end-date">
										&#10007; {end_date}
									</span>
								</h4>
							</>
						)
					}
					{
						active === 1 ? (
							<>
								<h5 className="quest-card__info-container__quest-objectives-title">Objetivos</h5>
								<ul className="quest-card__info-container__quest-objectives-list">
									{
										<>
											{
												questDataUpdate.objectives.map((item, index) => (
													<li className="task-card__info-container__task-objectives-list__task-objective-item" key={index}>
														<input
															value={item.description || ''}
															className='task-card__info-container__task-objectives-list__task-objective-item__task-objective-input'
															type='text'
															onChange={(e) => handleChangeObjectivesUpdate(e, index)}
															onKeyDown={(e) => handleObjectiveKeyPress(e, index)}
														/>
														{
															item.description !== '' && (
																<button
																	type='button'
																	className="task-card__info-container__task-objectives-list__task-objective-item__task-objective-btn"
																	onClick={() => removeObjective(index)}
																>
																	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
																		<path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
																	</svg>
																</button>
															)
														}
													</li>
												))
											}
										</>
									}
								</ul>
							</>
						) : (
							<>
								{
									objectives.length > 0 && (
										<>
											<h5 className="quest-card__info-container__quest-objectives-title">Objectives</h5>
											<ul className="quest-card__info-container__quest-objectives-list">
												{
													objectives.map((item, index) => (
														<li className={`quest-card__info-container__quest-objectives-list__quest-objective-item ${questDataUpdate.status === 'completo' ? 'completed' : ''}`} key={index}>
															<input
																type="checkbox"
																className="quest-card__info-container__quest-objectives-list__quest-objective-item__quest-objective-checkbox"
																checked={item.completed === 'completado'}
																onChange={() => handleCheckboxObjectivesChange(item.id, index)}
															/>
															<span className="quest-card__info-container__quest-objectives-list__quest-objective-item__quest-objetive-title">
																{item.description}
															</span>
														</li>
													))
												}
											</ul>
										</>
									)
								}
							</>
						)
					}
				</div>
				{
					active === 1 ? (
						<>
							<button
								className="quest-card__edit-btn-update btn-save"
								onClick={handleSubmit}
							>
								Guardar
							</button>
							<button
								className="quest-card__edit-btn-update btn-cancel"
								onClick={e => activeHandle(0)}
							>
								Cancelar
							</button>
						</>
					) : (
						<>
							<button
								className="quest-card__edit-btn"
								onClick={e => {
									e.preventDefault()
									activeHandle(1)
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
									<path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
								</svg>
							</button>
							<button
								className="quest-card__delete-btn"
								onClick={handleDelete}
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
								</svg>
							</button>
						</>
					)
				}
			</div>
		</>
	)
}
