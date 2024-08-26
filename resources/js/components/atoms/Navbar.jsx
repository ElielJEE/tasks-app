import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<>
			<nav className="navbar">
				<div className="navbar__container">
					<div className="navbar__container__logo-container">
						<h1 className="navbar__container__logo-container__logo">Carpe<span>Diem</span></h1>
					</div>
					<div className="navbar__container__list-container">
						<ul className="navbar__container__list-container__nav-list">
							<li className="navbar__container__list-container__nav-list__list-item">
								<Link className='navbar__container__list-container__nav-list__list-item__item' to={'#'}>Tasks</Link>
							</li>
							<li className="navbar__container__list-container__nav-list__list-item">
								<Link className='navbar__container__list-container__nav-list__list-item__item' to={'#'}>Challenges</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
