import React, { useContext, useState, useEffect } from 'react';
import { getTasks, getUser } from '../services';
import { Cards } from '../atoms'
import { TaskContext } from '../services/TaskContext';

export default function TaskCards() {
	/* const { userId } = getUser();
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
				let data;
				if (token && userId) {
					data = await getTasks(token, userId);
					console.log(userId);
					console.log(data);
				}
				
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
	}, [userId]);
	console.log(task.tasks); */
	const { tasks, loading } = useContext(TaskContext);
	if (loading) return <p>Cargando tareas...</p>;
	console.log(tasks);


	return (
		<>
			<div className="task-cards-container">
				{/* {
					task.tasks && (
						task.tasks.length > 0 ? (
							task.tasks.map((item, key) => (
								<Cards key={key} {...item} />
							))
						) : (
							<p>no se encontraron tareas.</p>
						)
					)
				} */}
				{
					tasks ? (
						tasks.map((item, key) => (
							<Cards key={key} {...item} />  // Renderizar las tarjetas de tareas
						))
					) : (
						<p>No se encontraron tareas.</p>  // Mensaje cuando no hay tareas
					)
				}
			</div>
		</>
	)
}
