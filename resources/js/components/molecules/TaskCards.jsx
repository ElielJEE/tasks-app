import React, { useState, useEffect } from 'react'
import { Cards } from '../atoms'
import { getTasks } from '../services';

export default function TaskCards() {
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
			{
				task.length > 0 ? (
					task.map((item, key) => (
						<Cards key={key} {...item}/>
					))
				) : (
					<p>no found</p>
				)
			}
		</>
	)
}
