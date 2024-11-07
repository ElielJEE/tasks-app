import config from './Config';

const GetHabits = async (token, userId) => {
	try {
		if (!userId) {
      console.error('No user ID found');
      return;
    }
		const response = await fetch(`${config.apiBaseUrl}/habits/${userId}`, {
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

export default GetHabits;