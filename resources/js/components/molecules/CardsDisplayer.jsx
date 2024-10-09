import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function CardsDisplayer() {
	return (
		<div className="tabs-container">
			<ul className="tabs-container__tabs-list">
				<li className="tabs-container__tabs-list__tab-item">
					<Link to={'tasks'} className="tabs-container__tabs-list__tab-item__tab-link">
						Tareas diarias
					</Link>
				</li>
				<li className="tabs-container__tabs-list__tab-item">
					<Link to={'quests'} className="tabs-container__tabs-list__tab-item__tab-link">
						Misiones
					</Link>
				</li>
				<li className="tabs-container__tabs-list__tab-item">
					<Link to={'habits'} className="tabs-container__tabs-list__tab-item__tab-link">
						Habitos
					</Link>
				</li>
			</ul>
			<Outlet />
		</div>
	)
}
