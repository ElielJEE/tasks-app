import React, { useContext } from 'react'
import { HabitContext } from '../services/HabitContext'

export default function HabitsCards({ title, count, id }) {
	const { handleIncrement, handleDecrement } = useContext(HabitContext)

	
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
	
	return (
		<div className="habitCard-container">
			<div className={`habitCard-container__plus-counter ${getColorClass(count)}`} onClick={() => handleIncrement(id)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
				</svg>
			</div>
			<div className="habitCard-container__info-content">
				<div className="habitCard-container__info-content__title-habit">
					<h3 className="habitCard-container__info-content__title-habit__name">
						{title}
					</h3>
				</div>
				<div className="habitCard-container__info-content__count-container">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3l0 41.7 0 41.7L52.5 440.6zM256 352l0-96 0-128 0-32c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29l0-64z" />
					</svg>
					<span className="habitCard-container__info-content__count-container__counter">
						{count}
					</span>
				</div>
			</div>
			<div className={`habitCard-container__minus-counter ${getColorClass(count)}`} onClick={() => handleDecrement(id)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
				</svg>
			</div>
		</div>
	)
}
