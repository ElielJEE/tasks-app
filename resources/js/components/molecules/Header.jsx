import React, { useContext, useEffect, useState } from 'react'
import { Loading, Navbar } from '../atoms'
import userDefaultImg from '../../../../public/images/user-default-img.jpg'
import bgImage from '../../../../public/images/bg.jpg'
import { getUser } from '../services';
import { UserContext } from '../services/UserContext';

export default function Header() {
	const { userData } = useContext(UserContext);
	console.log(userData);
	return (
		<>
			{!userData
				? (<Loading />)
				: (
					<>
						<Navbar />
						<header className="header">
							<img src={bgImage} alt="" className="header__bg-image" />
							<div className="header__user-container">
								<div className="header__user-container__user-image-container">
									<img src={userData.avatar ? (userData.avatar) : (userDefaultImg)} alt="" className="header__user-container__user-image-container__user-image" />
								</div>
								<div className="header__user-container__user-info">
									<h2 className="header__user-container__user-info__display-name">{userData.displayname ? (userData.displayname) : (userData.name)}</h2>
									<span className="header__user-container__user-info__username">@{userData.name}</span>
									<span className="header__user-container__user-info__separator">|</span>
									<span className="header__user-container__user-info__user-level">level {userData.level}</span>
								</div>
								<div className="header__user-container__bars">
									<span className="header__user-container__bars__hp-title">HP</span>
									<div className="header__user-container__bars__hp-bar-container">
										<div className="header__user-container__bars__hp-bar-container__hp-bar" style={{ width: `${userData.hp}%` }}></div>
									</div>
									<span className="header__user-container__bars__exp-title">XP</span>
									<div className="header__user-container__bars__exp-bar-container">
										<div className="header__user-container__bars__exp-bar-container__exp-bar" style={{ width: `${userData.xppercent}%` }}></div>
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
