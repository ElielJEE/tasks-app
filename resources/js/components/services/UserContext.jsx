// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAuthUser } from '.';
import { LevelLost, LevelUp, LostHP, XpMessage } from '../atoms';

export const UserContext = createContext({
	user: null,
	updateUser: () => { },
});

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	const [xpGained, setXpGained] = useState(0);
	const [levelUp, setLevelUp] = useState(0);
	const [levelLost, setLevelLost] = useState(0);
	const [lostHP, setLostHP] = useState(0)

	const updateUser = (updatedUser) => {
		const xpRest = updatedUser.xp - userData.xp
		const hpRest = updatedUser.hp - userData.hp
		console.log(hpRest);
		const playSound = (soundPath) => {
			const audio = new Audio(soundPath);
			audio.play();
		};
		if (updatedUser) {
			if (updatedUser.hp < userData.hp) {
				setLostHP(hpRest)
				playSound('/sounds/Lost-Hp.mp3');
				setTimeout(() => setLostHP(0), 3000);
			} else if (xpRest > 0) {
				setXpGained(xpRest);
				playSound('/sounds/Xp-Gain.mp3');
				setTimeout(() => setXpGained(0), 3000);
			} else {
				if (updatedUser.level < userData.level) {
					setLevelLost(updatedUser.level)
					playSound('/sounds/Lost-Level.mp3')
					setTimeout(() => setLevelLost(0), 3000);
				} else {
					setLevelUp(updatedUser.level);
					playSound('/sounds/Level-Up.mp3');
					setTimeout(() => setLevelUp(0), 3000);
				}
			}
		}
		setUserData((prevUser) => ({ ...prevUser, ...updatedUser }));
	};

	const fetchUserData = async () => {
		try {
			setUserData(null)
			const token = localStorage.getItem('token');
			const user = await getAuthUser(token);
			console.log(user);
			setUserData(user);
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const login = (token) => {
		localStorage.setItem('token', token);
		fetchUserData(); // Obtiene datos del nuevo usuario
	};

	const logout = () => {
		localStorage.removeItem('token');
		setUserData(null); // Limpia el estado
	};

	return (
		<UserContext.Provider value={{ userData, updateUser, login, logout }}>
			{xpGained !== 0 && <XpMessage xp={xpGained} />}
			{levelUp !== 0 && <LevelUp level={levelUp} />}
			{levelLost !== 0 && <LevelLost level={levelLost} />}
			{lostHP !== 0 && <LostHP hp={lostHP} />}
			{children}
		</UserContext.Provider>
	);
};
