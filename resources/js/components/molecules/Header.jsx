import React, { useEffect, useState } from 'react'
import { Loading, Navbar } from '../atoms'
import userDefaultImg from '../../../../public/images/user-default-img.jpg'
import bgImage from '../../../../public/images/bg.jpg'
import { getUser } from '../services';

export default function Header() {
	const { user } = getUser();

	return (
		<>
			{!user
				? (<Loading />)
				: (
					<>
						<Navbar />
						<header className="header">
							<img src={bgImage} alt="" className="header__bg-image" />
							<div className="header__user-container">
								<div className="header__user-container__user-image-container">
									<img src={user.avatar ? (user.avatar) : (userDefaultImg)} alt="" className="header__user-container__user-image-container__user-image" />
								</div>
								<div className="header__user-container__user-info">
									<h2 className="header__user-container__user-info__display-name">{user.displayname ? (user.displayname) : (user.name)}</h2>
									<span className="header__user-container__user-info__username">@{user.name}</span>
									<span className="header__user-container__user-info__separator">|</span>
									<span className="header__user-container__user-info__user-level">level {user.level}</span>
								</div>
								<div className="header__user-container__bars">
									<span className="header__user-container__bars__hp-title">HP</span>
									<div className="header__user-container__bars__hp-bar-container">
										<div className="header__user-container__bars__hp-bar-container__hp-bar" style={{ width: `${user.hp}%` }}></div>
									</div>
									<span className="header__user-container__bars__exp-title">XP</span>
									<div className="header__user-container__bars__exp-bar-container">
										<div className="header__user-container__bars__exp-bar-container__exp-bar" style={{ width: `${user.xp}%` }}></div>
									</div>
								</div>
							</div>
						</header>
					</>
				)
			}
		</>
	)
}
