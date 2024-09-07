import config from "./Config";

const loginUser = async (userData, navigate) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData)
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('token', data.access_token);
			console.log('Login successful:', data);
			navigate('/');
			return data;
		} else {
			const errorData = await response.json();
			console.log('Login failed:', errorData.errors);
			return errorData;
		}

	} catch (error) {
		console.error('Error:', error)
		return null
	}
}

export default loginUser;