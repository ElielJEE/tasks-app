import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createQuest } from '../services';
import { QuestContext } from '../services/QuestContext';

export default function ModalQuestCreation({ showModal }) {
	const { addQuest } = useContext(QuestContext);
	const location = useLocation();
	const shouldShowModal = location.state?.showModal ?? showModal;
	const [closeModal, setCloseModal] = useState(true)
	const navigate = useNavigate()
	const [questData, setQuestData] = useState({
		name: '',
		description: '',
		difficulty: 'facil',
		start_date: '',
		end_date: '',
		status: 'activo',
		objectives: [{ description: '' }]
	})
	const [errors, setErrors] = useState({})

	const handleCloseModal = () => {
		setCloseModal(false)
		navigate('/quests', { state: { showModal: false } })
	}

	if (!shouldShowModal) {
		return null;
	}


	const handleChange = (e) => {
		setQuestData({
			...questData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({})

		const filterObjectives = questData.objectives.filter(
			(objective) => objective.description.trim() !== ''
		)

		const dataToSend = {
			...questData,
			objectives: filterObjectives
		}

		const token = localStorage.getItem('token')
		if (!token) {
			console.error('No token found.')
			return
		}

		const result = await createQuest(token, dataToSend);

		if (result.success) {
			setQuestData({
				name: '',
				description: '',
				difficulty: 'facil',
				start_date: '',
				end_date: '',
				status: 'activo',
				objectives: [{ description: '' }]
			})

			addQuest(result.data.quests)
			setCloseModal(false)
			navigate('/quests', { state: { showModal: false } })
		} else {
			setErrors(result.errors)
			console.log(result.errors);
		}
	}

	const removeObjective = (index) => {
		const newObjectives = questData.objectives.filter((_, i) => i !== index);
		setQuestData({ ...questData, objectives: newObjectives })
	}

	const handleChangeObjectives = (e, index) => {
		const newObjectives = [...questData.objectives];
		newObjectives[index].description = e.target.value;
		setQuestData({ ...questData, objectives: newObjectives })
	}

	const addObjective = () => {
		setQuestData({
			...questData,
			objectives: [...questData.objectives, { description: '' }]
		})
	}

	const handleObjectiveKeyPress = (e, index) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (questData.objectives[index].description.trim() !== '') {
				addObjective();
			}
		}
	}

	return (
		<>
			<div className='create-modal-container active-modal-creation' onClick={handleCloseModal}></div>
			<form onSubmit={handleSubmit} className="form-quest-container s-container">
				<h2>Crear nueva mision</h2>
				<div className="form-quest-container__form-row">
					<input
						type="text"
						className="form-quest-container__form-row__input-quest"
						id='name'
						name='name'
						required
						placeholder='Titulo de la mision'
						value={questData.name}
						onChange={handleChange}
					/>
				</div>
				{errors.name && (
					<span className="field-container__field-error">
						{errors.name}
					</span>
				)}
				<div className="form-quest-container__form-row">
					<textarea
						className="form-quest-container__form-row__textarea-quest"
						id='description'
						name='description'
						required
						placeholder='Descripcion'
						value={questData.description}
						onChange={handleChange}
					/>
				</div>
				<div className="form-quest-container__form-row">
					<label className="form-quest-container__form-row__label-quest" htmlFor="difficulty">Dificuldad:</label>
					<select
						className="form-quest-container__form-row__select-quest"
						id='difficulty'
						name='difficulty'
						required
						value={questData.difficulty}
						onChange={handleChange}
					>
						<option value="facil">Facil</option>
						<option value="medio">Medio</option>
						<option value="dificil">Dificil</option>
					</select>
				</div>
				<div className="form-quest-container__form-row">
					<label className="form-quest-container__form-row__label-quest" htmlFor="start_date">Fecha de inicio:</label>
					<input
						className='form-quest-container__form-row__input-date'
						type="date"
						name="start_date"
						id="start_date"
						value={questData.start_date}
						onChange={handleChange}
					/>
				</div>
				{errors.start_date && (
					<span className="field-container__field-error">
						{errors.start_date}
					</span>
				)}
				<div className="form-quest-container__form-row">
					<label className="form-quest-container__form-row__label-quest" htmlFor="end_date">Fecha limite:</label>
					<input
						className='form-quest-container__form-row__input-date'
						type="date"
						name="end_date"
						id="end_date"
						value={questData.end_date}
						onChange={handleChange}
					/>
				</div>
				{errors.end_date && (
					<span className="field-container__field-error">
						{errors.end_date}
					</span>
				)}
				{
					questData.objectives.map((item, index) => (
						<div key={index} className="form-quest-container__form-row">
							<input
								type="text"
								className="form-quest-container__form-row__input-quest-objective"
								value={item.description}
								placeholder='Titulo del objetivo'
								onChange={(e) => handleChangeObjectives(e, index)}
								onKeyUp={(e) => handleObjectiveKeyPress(e, index)}
							/>
							{
								item.description !== '' && questData.objectives.length > 1 && (
									<button
										type='button'
										className="form-quest-container__form-row__delete-objective"
										onClick={() => removeObjective(index)}
									>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
											<path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
										</svg>
									</button>
								)
							}
						</div>
					))
				}
				<button
					type='button'
					className="form-quest-container__submit-btn"
					onClick={e => handleSubmit(e)}
				>
					Crear mision
				</button>
			</form>
		</>
	)
}
