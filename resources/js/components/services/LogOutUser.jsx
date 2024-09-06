import { useNavigate } from 'react-router-dom';
import config from './Config';

const LogOutUser = async (navigate) => {
	try {
		const token = localStorage.getItem('token');
		const response  = await fetch(`${config.apiBaseUrl}/logout`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})

		if (response.ok) {
			console.log('logout successful');
			localStorage.removeItem('token');
			navigate('/login');
		} else {
			console.log('logout failed');
		}

	} catch (error) {
		console.error('Error:', error);
	}
}

export default LogOutUser;
