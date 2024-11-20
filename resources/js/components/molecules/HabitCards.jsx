import React, { useContext } from 'react'
import { HabitContext } from '../services/HabitContext'
import { BouncingElement, HabitsCards } from '../atoms';
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

	console.log(habits.count);

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
								habits.map((item) => (
									<HabitsCards key={item.id} {...item} />
								))
							}
						</Masonry>
					) : (
						<BouncingElement txtOne={"Crea los habitos que"} txtTwo={"deseas mejorar en tu vida."}/>
					)
				}
			</div>
		</>
	)
}
