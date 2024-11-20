import React, { useEffect, useState } from 'react'
import { getStats } from '../services'
import { BouncingElement } from '../atoms';

export default function Stats() {
	const [dataStats, setDataStats] = useState();

	useEffect(() => {
		const statsDataFetch = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					console.error('No token found.')
					return
				}

				const data = await getStats(token)

				if (!data || typeof data !== 'object') {
					console.error('No valid data received')
					return
				} else {
					setDataStats(data)
				}
			} catch (error) {
				console.error('Error:', error)
			}
		}
		statsDataFetch();
	}, []);

	console.log(dataStats);

	return (
		<>
			{
				dataStats ? (
					<div className="stats-settings s-container">
						<h2 className="stats-settings__title-page">Estadisticas del jugador</h2>
						<ul className="stats-settings__list-stats">
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Nivel actual
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.current_level}
								</span>
							</li>
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Total de experiencia
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.total_experience}
								</span>
							</li>
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Tareas creadas
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.tasks_created}
								</span>
							</li>
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Tareas completadas
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.tasks_completed}
								</span>
							</li>
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Tareas falladas
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.tasks_failed}
								</span>
							</li>
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Misiones creadas
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.quests_created}
								</span>
							</li>
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Misiones completadas
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.quests_completed}
								</span>
							</li>
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Misiones falladas
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.quests_failed}
								</span>
							</li>
							<li className="stats-settings__list-stats__list-item">
								<h3 className="stats-settings__list-stats__list-item__title">
									Habitos creados
								</h3>
								<span className="stats-settings__list-stats__list-item__info">
									{dataStats.statistics.habits_created}
								</span>
							</li>
						</ul>
					</div>
				) : (
					<BouncingElement txtOne={"Interactua con el sitio"} txtTwo={"para ver tus estadisticas"}/>
				)
			}
		</>
	)
}
