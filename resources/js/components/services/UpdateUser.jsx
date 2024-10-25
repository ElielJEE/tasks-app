import config from './Config'

const UpdateUser = async (userDataUpdate, token) => {
	try {
		const formData = new FormData();

		// Supongamos que userDataUpdate es un objeto con propiedades
		for (const key in userDataUpdate) {
			formData.append(key, userDataUpdate[key]);
		}
		const response = await fetch(`${config.apiBaseUrl}/update`, {
			method: 'POST',
			body: userDataUpdate,
			headers: {
				'Authorization': `Bearer ${token}`,
			},
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