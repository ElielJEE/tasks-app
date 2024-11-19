import config from './Config'

const registerUser = async (userData) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			/* localStorage.setItem('token', data.access_token); */
			return { success: true, data };
		} else {
			const errorData = await response.json();
			return { success: false, errors: errorData.errors || ['Sign up failed'] };
		}

	} catch (error) {
		return {
			success: false,
			errors: { general: ['Network error. Please try again later.'] },
		};
	}
}

export default registerUser;