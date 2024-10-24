import React, { useContext } from 'react';
import { Cards } from '../atoms'
import { TaskContext } from '../services/TaskContext';
import Masonry from 'react-masonry-css';

export default function TaskCards() {
	const { tasks, loading } = useContext(TaskContext);
	if (loading) return <p>Cargando tareas...</p>;

	const hasTask = Array.isArray(tasks) && tasks.length > 0;

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1
	}
	return (
		<>
			<div className="task-cards-container">
				{
					hasTask ? (
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className='my-masonry-grid'
							columnClassName='my-masonry-grid_column'
						>
							{
								tasks.map((item, key) => (
									<Cards key={key} {...item} />  // Renderizar las tarjetas de tareas
								))
							}
						</Masonry>
					) : (
						<p className='task-cards-container__message'>No se encontraron tareas.</p>  // Mensaje cuando no hay tareas
					)
				}
			</div>
		</>
	)
}
