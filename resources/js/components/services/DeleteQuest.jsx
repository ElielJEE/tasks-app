import config from './Config';

const DeleteQuest = async (quest_id) => {
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(`${config.apiBaseUrl}/quests/${quest_id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})

		if (response.ok) {
			console.log('delete successful');
			const data = await response.json();
			return { success: true, data }
		} else {
			console.log('delete failed');
		}

	} catch (error) {
		console.error('Error:', error);
	}
}

export default DeleteQuest;
