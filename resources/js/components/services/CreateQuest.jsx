import config from './Config'

const CreateQuest = async (token, data) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/quests`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const data = await response.json();
			return { success: true, data };
		} else {
			const errorData = await response.json();
			return { success: false, errors: errorData.errors || ['Creation of quest failed'] };
		}
	} catch (error) {
		return {
			success: false,
			errors: { general: ['Network error. Please try again later.'] },
		};
	}
}

export default CreateQuest