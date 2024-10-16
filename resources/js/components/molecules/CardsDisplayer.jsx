import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useActive } from '../hooks';
import CreateTaskView from './CreateTaskView';

export default function CardsDisplayer() {
	const { active, activeHandle } = useActive();

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
				<li className="tabs-container__tabs-list__tab-item-btn">
					<button className="tabs-container__tabs-list__tab-item-btn__tab-btn" onClick={e => activeHandle(1)}>
						<span className="tabs-container__tabs-list__tab-item-btn__tab-btn__tab-btn-span">
							Agregar tarea
						</span>
					</button>
				</li>
			</ul>
			<Outlet />
			<div className={active === 1 ? ("create-task-modal-container active-modal-creation") : ("create-task-modal-container")}>
				<button className="create-task-modal-container__close-modal" onClick={e => activeHandle(0)}>
					Cerrar
				</button>
				<CreateTaskView />
			</div>
		</div>
	)
}
