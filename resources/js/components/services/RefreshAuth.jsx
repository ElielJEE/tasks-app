import config from './Config';

const RefreshAuth = async (accessToken) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/refresh`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.error('Error refreshing token:', error);
		return null;
	}
}

export default RefreshAuth;
