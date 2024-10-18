import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logOutUser } from '../services';

export default function Navbar() {
	const navigate = useNavigate();
	const handleLogout = () => {
		logOutUser(navigate)
	}

	return (
		<>
			<nav className="navbar">
				<div className="navbar__container">
					<div className="navbar__container__list-container">
						<ul className="navbar__container__list-container__nav-list">
							<li className="navbar__container__list-container__nav-list__list-item">
								<Link className='navbar__container__list-container__nav-list__list-item__item' to={'#'}>Tasks</Link>
							</li>
							<li className="navbar__container__list-container__nav-list__list-item">
								<Link className='navbar__container__list-container__nav-list__list-item__item' to={'#'}>Quests</Link>
							</li>
							<li className="navbar__container__list-container__nav-list__list-item">
								<Link className='navbar__container__list-container__nav-list__list-item__item' to={'/settings'}>Settings</Link>
							</li>
						</ul>
					</div>
					<div className="navbar__container__list-container-two">
						<ul className="navbar__container__list-container-two__nav-list-two">
							<li className="navbar__container__list-container-two__nav-list-two__list-item-two" onClick={handleLogout}>
								<span className="navbar__container__list-container-two__list-item-two__span">
									Cerrar sesion
								</span>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
