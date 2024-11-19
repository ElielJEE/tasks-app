// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAuthUser } from '.';

export const UserContext = createContext({
	user: null,
	updateUser: () => { },
});

export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	
	const updateUser = (updatedUser) => {
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
			{children}
		</UserContext.Provider>
	);
};
