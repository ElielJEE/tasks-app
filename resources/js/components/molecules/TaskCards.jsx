import React, { useContext, useState, useEffect } from 'react';
import { getTasks, getUser } from '../services';
import { Cards } from '../atoms'
import { TaskContext } from '../services/TaskContext';

export default function TaskCards() {
	const { tasks, loading } = useContext(TaskContext);
	if (loading) return <p>Cargando tareas...</p>;

	const hasTask = Array.isArray(tasks) && tasks.length > 0;

	return (
		<>
			<div className="task-cards-container">
				{
					hasTask ? (
						tasks.map((item, key) => (
							<Cards key={key} {...item} />  // Renderizar las tarjetas de tareas
						))
					) : (
						<p className='task-cards-container__message'>No se encontraron tareas.</p>  // Mensaje cuando no hay tareas
					)
				}
			</div>
		</>
	)
}
