import React, { useContext, useState } from 'react'
import { HabitContext } from '../services/HabitContext'
import { useActive } from '../hooks';

export default function HabitsCards({ title, count, id }) {
	const { handleIncrement, handleDecrement, deleteHabit, updateHabit } = useContext(HabitContext)
	const { active, activeHandle } = useActive();
	const [habitDataUpdate, setHabitDataUpdate] = useState({
		title: title || '',
		count: count || 0
	})
	const [disable, setDisable] = useState(false);

	const handleIncrementEvent = () => {
		handleDisable();
		handleIncrement(id);
	}

	const handleDecrementEvent = () => {
		handleDisable();
		handleDecrement(id);
	}

	const handleDisable = () => {
		setDisable(true)
		setTimeout(() => {
			setDisable(false)
		}, 3000);
	}


	const colorCount = [
		{ min: 50, max: Infinity, class: 'best-color' },
		{ min: 30, max: 49, class: 'better-color' },
		{ min: 0, max: 29, class: 'normal-color' },
		{ min: -29, max: -10, class: 'worse-color' },
		{ min: -Infinity, max: -30, class: 'worst-color' }
	];

	const getColorClass = (count) => {
		const range = colorCount.find(({ min, max }) => count >= min && count <= max);
		return range ? range.class : 'default-color'; // Clase por defecto si no se encuentra un rango
	};

	console.log(colorCount[count]);

	const handleDelete = () => {
		deleteHabit(id)
	}

	const handleChange = (e) => {
		setHabitDataUpdate({
			...habitDataUpdate,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const token = localStorage.getItem('token')
		if (!token) {
			console.error('no token found.')
		}

		const dataToUpdate = {
			...habitDataUpdate,
			count: count,
			id
		}

		try {
			console.log(dataToUpdate);
			await updateHabit(dataToUpdate, token)
			setHabitDataUpdate(dataToUpdate)
			activeHandle(0)
		} catch (error) {
			console.error('error al actualizar el habito: ', error)
		}
	}

	return (
		<>
			<div className="habitCard-container">
				{
					active === 1 ? (
						''
					) : (
						<div className={`habitCard-container__plus-counter ${getColorClass(count)} ${disable ? 'disabled' : ''}`} onClick={disable ? undefined : (() => handleIncrementEvent())}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
								<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
							</svg>
						</div>
					)
				}
				<div className="habitCard-container__info-content">
					<div className="habitCard-container__info-content__title-habit">
						{
							active === 1 ? (
								<input
									type="text"
									className="habitCard-container__info-content__title-habit-input"
									placeholder='Titulo habito'
									value={habitDataUpdate.title}
									onChange={handleChange}
									name='title'
								/>
							) : (
								<h3 className="habitCard-container__info-content__title-habit__name">
									{title}
								</h3>
							)
						}
					</div>
					<div className="habitCard-container__info-content__count-container">
						{
							active === 1 ? (
								''
							) : (
								<>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3l0 41.7 0 41.7L52.5 440.6zM256 352l0-96 0-128 0-32c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29l0-64z" />
									</svg>
									<span className="habitCard-container__info-content__count-container__counter">
										{count}
									</span>
								</>

							)
						}
					</div>
				</div>
				{
					active === 1 ? (
						''
					) : (
						<div className={`habitCard-container__minus-counter ${getColorClass(count)}`} onClick={disable ? undefined : (() => handleDecrementEvent())}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
								<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
							</svg>
						</div>
					)
				}
				<>
					{
						active === 1 ? (
							<>
								<button className='task-card__edit-btn-update btn-save' onClick={handleSubmit}>
									guardar
								</button>
								<button onClick={e => activeHandle(0)} className='task-card__edit-btn-update btn-cancel'>
									cancelar
								</button>
							</>
						) : (
							<>
								<button
									className="habitCard-container__edit-btn-habit"
									onClick={e => {
										e.preventDefault();
										activeHandle(1)
									}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
									</svg>
								</button>
								<button
									className="habitCard-container__delete-btn-habit"
									onClick={handleDelete}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
										<path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
									</svg>
								</button>
							</>

						)
					}
				</>
			</div>
		</>
	)
}
