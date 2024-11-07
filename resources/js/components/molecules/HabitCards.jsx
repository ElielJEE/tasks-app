import React, { useContext } from 'react'
import { HabitContext } from '../services/HabitContext'
import { HabitsCards } from '../atoms';
import Masonry from 'react-masonry-css';

export default function HabitCards() {
	const { habits, loading } = useContext(HabitContext);
	if (loading) {
		return <p>Cargando Habitos...</p>
	}

	const hasHabit = Array.isArray(habits) && habits.length > 0;

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1
	}

	console.log(hasHabit);

	return (
		<>
			<div className='habitCards-container'>
				{
					hasHabit ? (
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className='my-masonry-grid'
							columnClassName='my-masonry-grid_column'
						>
							{
								habits.map((item, key) => (
									<HabitsCards key={item.id} {...item} />
								))
							}
						</Masonry>
					) : (
						<p>No se encontraron habitos.</p>
					)
				}
			</div>
		</>
	)
}
