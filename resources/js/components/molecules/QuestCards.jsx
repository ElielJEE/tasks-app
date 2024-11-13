import React, { useContext } from 'react'
import { QuestContext } from '../services/QuestContext'
import { array } from 'i/lib/util';
import Masonry from 'react-masonry-css';
import { Cards } from '../atoms';

export default function QuestCards() {
	const { quests, loading } = useContext(QuestContext);
	if (loading) {
		return <p>Cargando misiones...</p>
	}

	const hasQuest = Array.isArray(quests) && quests.length > 0;

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1
	}

	return (
		<>
			<div className="quest-cards-container">
				{
					hasQuest ? (
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className='my-masonry-grid'
							columnClassName='my-masonry-grid_column'
						>
							{
								quests.map((item) => (
									<Cards key={item.id} {...item} />
								))
							}
						</Masonry>
					) : (
						<p className="quest-cards-container__message">
							No se han encontrado misiones.
						</p>
					)
				}
			</div>
		</>
	)
}
