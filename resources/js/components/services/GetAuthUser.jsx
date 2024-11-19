import React from 'react';
import config from './Config';

const GetAuthUser = async (token) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/user`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			},
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		}

	} catch (error) {
		console.error('Error fetching user data:', error)
		return null;
	}
}

export default GetAuthUser;
