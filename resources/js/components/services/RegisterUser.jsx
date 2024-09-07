import config from './Config'

const registerUser = async (userData, navigate) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('token', data.access_token);
			console.log('Registration successful:', data);
			navigate('/')
		} else {
			const errorData = await response.json();
			console.log('Resgistration failed:', errorData.errors);
		}

	} catch (error) {
		console.error('Error:', error);
	}
}

export default registerUser;