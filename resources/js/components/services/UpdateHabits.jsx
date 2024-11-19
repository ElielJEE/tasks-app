import config from './Config'

const UpdateHabit = async (habitDataUpdate, token, habitId) => {
	try {
		const response = await fetch(`${config.apiBaseUrl}/habits/${habitId}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${token}`,
				'accept':'application/json',
				'content-type':'application/json'
			},
			body: JSON.stringify(habitDataUpdate),
		});

		if (response.ok) {
			const data = await response.json();
			return { success: true, data };
		} else {
			const errorData = await response.json();
			return { success: false, errors: errorData.errors || ['update of habit failed'] };
		}
	} catch (error) {
		return {
			success: false,
			errors: { general: ['Network error. Please try again later.'] },
		};
	}
}

export default UpdateHabit;

export const incrementHabit = async (token, habitId) => {
	try {
			const response = await fetch(`${config.apiBaseUrl}/habits/${habitId}/increment`, {
					method: 'POST',
					headers: {
							'Authorization': `Bearer ${token}`,
							'Accept': 'application/json'
					},
			});
			const data = await response.json();
			return response.ok ? { success: true, data } : { success: false, errors: data.error || ['Increment failed'] };
	} catch (error) {
			return { success: false, errors: { general: ['Network error. Please try again later.'] } };
	}
};

export const decrementHabit = async (token, habitId) => {
	try {
			const response = await fetch(`${config.apiBaseUrl}/habits/${habitId}/decrement`, {
					method: 'POST',
					headers: {
							'Authorization': `Bearer ${token}`,
							'Accept': 'application/json'
					},
			});
			const data = await response.json();
			return response.ok ? { success: true, data } : { success: false, errors: data.error || ['Decrement failed'] };
	} catch (error) {
			return { success: false, errors: { general: ['Network error. Please try again later.'] } };
	}
};