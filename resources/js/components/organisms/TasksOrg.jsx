import React from 'react'
import { CardsDisplayer, Header } from '../molecules'
import { Cards } from '../atoms'

export default function TasksOrg() {
	return (
		<div className="task-main-container">
			<Header />
			<CardsDisplayer />
		</div>
	)
}
