import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { createHabit } from '../services';
import { HabitContext } from '../services/HabitContext';

export default function ModalHabitCreation({ showModal }) {
	const location = useLocation();
	const shouldShowModal = location.state?.showModal ?? showModal;
	const [closeModal, setCloseModal] = useState(true)
	const navigate = useNavigate()
	const [habitData, setHabitData] = useState({
		title: ''
	})
	const [errors, setErrors] = useState({})
	const [successMessage, setSuccessMessage] = useState({})
	const { addHabit } = useContext(HabitContext)

	const handleCloseModal = () => {
		setCloseModal(false)
		navigate('/habits', { state: { showModal: false } })
	}

	if (!shouldShowModal) {
		return null;
	}

	const handleChange = (e) => {
		setHabitData({
			...habitData,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});

		const dataToSend = {
			...habitData
		}

		const token = localStorage.getItem('token')
		if (!token) {
			console.error('No token found.')
			return
		}

		const result = await createHabit(token, dataToSend);

		if (result.success) {
			setSuccessMessage('Tarea creada correctamente!')
			setHabitData({
				title: ''
			})
			console.log(result.data.habits);
			addHabit(result.data.habits);
			setCloseModal(false)
			navigate('/habits', { state: { showModal: false } })
		} else {
			setErrors(result.errors)
		}
	};

	return (
		<>
			<div className='create-modal-container active-modal-creation' onClick={handleCloseModal}></div>
			<form onSubmit={handleSubmit} className="form-habit-container s-container">
				<h2>Crear nuevos habitos</h2>
				<div className="form-habit-container__form-row">
					<input
						className="form-habit-container__form-row__input-habit"
						type="text"
						id="title"
						name='title'
						value={habitData.title}
						onChange={handleChange}
						required
						placeholder='Titulo del habito'
					/>
				</div>
				{errors.title && (
					<span className="field-container__field-error">
						{errors.title}
					</span>
				)}
				<button
					type="button"
					className="form-habit-container__submit-btn"
					onClick={e => handleSubmit(e)}
				>Crear habito</button>
			</form>
		</>
	)
}
