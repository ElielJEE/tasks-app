import config from "./Config";

const loginUser = async (userData, navigate) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json();
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