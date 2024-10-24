import config from './Config'

const UpdateUser = async (userDataUpdate, token) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/update`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(userDataUpdate),
		});

		if (response.ok) {
			const data = await response.json();
			return { success: true, data };
		} else {
			const errorData = await response.json();
			return { success: false, errors: errorData.errors || ['Creation of task failed'] };
		}
	} catch (error) {
		return {
			success: false,
			errors: { general: ['Network error. Please try again later.'] },
		};
	}
}

export default UpdateUser;