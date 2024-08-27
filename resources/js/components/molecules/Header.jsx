import React from 'react'
import { Navbar } from '../atoms'
import userDefaultImg from '../../../../public/images/user-default-img.jpg'

export default function Header() {
	return (
		<>
			<Navbar />
			<header className="header">
				<div className="header__user-container">
					<div className="header__user-container__user-image-container">
						<img src={userDefaultImg} alt="" className="header__user-container__user-image-container__user-image" />
					</div>
					<div className="header__user-container__bars">
						<div className="header__user-container__bars__hp-bar-container">
							<div className="header__user-container__bars__hp-bar-container__hp-bar"></div>
						</div>
						<div className="header__user-container__bars__exp-bar-container">
							<div className="header__user-container__bars__exp-bar-container__exp-bar"></div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
