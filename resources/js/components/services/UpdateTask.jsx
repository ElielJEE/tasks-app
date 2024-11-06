import config from './Config'

const UpdateTask = async (taskDataUpdate, token, task_id) => {
	try {
		/* const formData = new FormData();

		// Supongamos que userDataUpdate es un objeto con propiedades
		for (const key in userDataUpdate) {
			formData.append(key, userDataUpdate[key]);
		} */
		const response = await fetch(`${config.apiBaseUrl}/tasks/${task_id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${token}`,
				'accept':'application/json',
				'content-type':'application/json'
			},
			body: JSON.stringify(taskDataUpdate),
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

export default UpdateTask;