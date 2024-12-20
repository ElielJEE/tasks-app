import { useContext } from "react";
import config from "./Config";
import { UserContext } from "./UserContext";

const loginUser = async (userData) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Cache-Control': 'no-cache'
			},
			body: JSON.stringify(userData)
		});

		if (response.ok) {
			const data = await response.json();
			/* localStorage.setItem('token', data.access_token); */
			return { success: true, data };
		} else {
			const errorData = await response.json();
			return { success: false, errors: errorData.errors || ['Login failed'] };
		}

	} catch (error) {
		console.error('Error:', error)
		return null
	}
}

export default loginUser;