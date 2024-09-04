import config from './Config'

const registerUser = async (userData) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/register`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Registration successful:', data);
		} else {
			const errorData = await response.json();
			console.log('Resgistration failed:', errorData.errors);
		}

	} catch (error) {
		console.error('Error:', error);
	}
}

export default registerUser;