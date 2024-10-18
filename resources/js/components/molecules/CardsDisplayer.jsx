import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function CardsDisplayer() {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate()

	const handleShowModal = () => {
		setShowModal(true)
		console.log('object');
		navigate('/tasks', { state: { showModal: true } })
	}

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
					<button className="tabs-container__tabs-list__tab-item-btn__tab-btn" onClick={handleShowModal}>
						<span className="tabs-container__tabs-list__tab-item-btn__tab-btn__tab-btn-span">
							Agregar tarea
						</span>
					</button>
				</li>
			</ul>
			<Outlet />
		</div>
	)
}
