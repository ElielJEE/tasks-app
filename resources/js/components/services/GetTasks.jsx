import config from './Config';

const GetTasks = async (token, userId) => {
	console.log('getTask se esta ejecutando');
	try {
		if (!userId) {
      console.error('No user ID found');
      return;
    }
		console.log(userId);
		const response = await fetch(`${config.apiBaseUrl}/tasks/${userId}`, {
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

export default GetTasks;