import React from 'react'
import { Navbar } from '../atoms'
import userDefaultImg from '../../../../public/images/user-default-img.jpg'
import bgImage from '../../../../public/images/bg.jpg'

export default function Header() {
	return (
		<>
			<Navbar />
			<header className="header">
				<img src={bgImage} alt="" className="header__bg-image" />
				<div className="header__user-container">
					<div className="header__user-container__user-image-container">
						<img src={userDefaultImg} alt="" className="header__user-container__user-image-container__user-image" />
					</div>
					<div className="header__user-container__user-info">
						<h2 className="header__user-container__user-info__display-name">{"Tsukasa234"}</h2>
						<span className="header__user-container__user-info__username">@{"josemontes"}</span>
						<span className="header__user-container__user-info__separator">|</span>
						<span className="header__user-container__user-info__user-level">{"level 1"}</span>
					</div>
					<div className="header__user-container__bars">
						<span className="header__user-container__bars__hp-title">HP</span>
						<div className="header__user-container__bars__hp-bar-container">
							<div className="header__user-container__bars__hp-bar-container__hp-bar" style={{ width: '100%' }}></div>
						</div>
						<span className="header__user-container__bars__exp-title">XP</span>
						<div className="header__user-container__bars__exp-bar-container">
							<div className="header__user-container__bars__exp-bar-container__exp-bar" style={{ width: '100%' }}></div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}