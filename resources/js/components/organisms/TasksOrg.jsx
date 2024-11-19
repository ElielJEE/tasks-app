import React from 'react'
import { CardsDisplayer, Header } from '../molecules'
import { Cards } from '../atoms'
import { UserProvider } from '../services/UserContext'
import { TaskProvider } from '../services/TaskContext'

export default function TasksOrg() {
	return (
		<div className="task-main-container">
			<Header />
			<CardsDisplayer />
		</div>
	)
}
