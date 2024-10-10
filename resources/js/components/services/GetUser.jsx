import React, { useState, useEffect } from 'react'
import { getAuthUser } from '.';

export default function GetUser() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const userDataHeader = async () => {
			try {
				// Get the token from localStorage
				const token = localStorage.getItem('token');
				if (!token) {
					console.error('No token found');
					return;
				}

				// Send a request with the Authorization header
				const data = await getAuthUser(token);

				if (!data || typeof data !== 'object') {
					console.log('No valid data received');
					return;
				}
				setUser(data);

			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		userDataHeader();
	}, []);

	return { user }
}
