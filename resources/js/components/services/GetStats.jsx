import config from './Config';

const GetStats = async (token) => {
	try {
			const response = await fetch(`${config.apiBaseUrl}/user/stats`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data);
			return data;
		}

	} catch (error) {
		console.error('Error fetching task data:', error)
		console.log(error);
		return null;
	}
}

export default GetStats;