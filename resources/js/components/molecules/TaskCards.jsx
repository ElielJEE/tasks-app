import React, { useState, useEffect } from 'react'
import { Cards } from '../atoms'
import { getTasks } from '../services';
import CreateTask from './CreateTaskView';
import CreateTaskView from './CreateTaskView';
import { useActive } from '../hooks';

export default function TaskCards() {
	const { active, activeHandle } = useActive();
	const [task, setTask] = useState([]);

	useEffect(() => {
		const tasksDataHeader = async () => {
			try {
				// Get the token from localStorage
				const token = localStorage.getItem('token');
				if (!token) {
					console.error('No token found');
					return;
				}

				// Send a request with the Authorization header
				const data = await getTasks(token);

				if (!data || typeof data !== 'object') {
					console.log('No valid data received');
					return;
				}
				setTask(data);

			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		tasksDataHeader();
	}, []);

	return (
		<>
			<div className="task-cards-container">
				{
					task.length > 0 ? (
						task.map((item, key) => (
							<Cards key={key} {...item} />
						))
					) : (
						<p>no se encontraron tareas.</p>
					)
				}
				<button className="task-cards-container__create-task-btn" onClick={e => activeHandle(1)}>
					<span className="task-cards-container__create-task-btn__span-task">
						Agregar tarea
					</span>
				</button>
			</div>
			<div className={active === 1 ? ("create-task-modal-container active-modal-creation") : ("create-task-modal-container")}>
				<button className="create-task-modal-container__close-modal" onClick={e => activeHandle(0)}>
					Cerrar
				</button>
				<CreateTaskView />
			</div>
		</>
	)
}
