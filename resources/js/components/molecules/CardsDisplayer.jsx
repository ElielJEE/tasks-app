import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useActive } from '../hooks';

export default function CardsDisplayer() {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const { active, activeHandle } = useActive();
	const location = useLocation();
	const path = location.pathname;

	const handleShowModal = () => {
		setShowModal(true)
		console.log('object');
		navigate(path, { state: { showModal: true } })
	}

	const index = {
		'/tasks': 0,
		'/quests': 1,
		'/habits': 2,
	}

	useEffect(() => {
		if (index[path] !== undefined) {
			activeHandle(index[path])
		}
	}, [path])

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
				<li className={`tabs-container__tabs-list__tab-item-btn ${active === 0 ? 'active-tab' : ''}`}>
					<button className="tabs-container__tabs-list__tab-item-btn__tab-btn" onClick={handleShowModal}>
						<span className="tabs-container__tabs-list__tab-item-btn__tab-btn__tab-btn-span">
							Agregar tarea
						</span>
					</button>
				</li>
				<li className={`tabs-container__tabs-list__tab-item-btn ${active === 1 ? 'active-tab' : ''}`}>
					<button className="tabs-container__tabs-list__tab-item-btn__tab-btn">
						<span className="tabs-container__tabs-list__tab-item-btn__tab-btn__tab-btn-span">
							Agregar mision
						</span>
					</button>
				</li>
				<li className={`tabs-container__tabs-list__tab-item-btn ${active === 2 ? 'active-tab' : ''}`}>
					<button className="tabs-container__tabs-list__tab-item-btn__tab-btn" onClick={handleShowModal}>
						<span className="tabs-container__tabs-list__tab-item-btn__tab-btn__tab-btn-span">
							Agregar habito
						</span>
					</button>
				</li>
			</ul>
			<Outlet />
		</div>
	)
}
