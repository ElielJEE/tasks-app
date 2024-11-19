import config from './Config'

const UpdateQuest = async (questDataUpdate, token, task_id) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/quests/${task_id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${token}`,
				'accept':'application/json',
				'content-type':'application/json'
			},
			body: JSON.stringify(questDataUpdate),
		});

		if (response.ok) {
			const data = await response.json();
			return { success: true, data };
		} else {
			const errorData = await response.json();
			return { success: false, errors: errorData.errors || ['update of task failed'] };
		}
	} catch (error) {
		return {
			success: false,
			errors: { general: ['Network error. Please try again later.'] },
		};
	}
}

export default UpdateQuest;