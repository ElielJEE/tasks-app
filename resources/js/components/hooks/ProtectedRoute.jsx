import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { refreshAuth } from '../services';
import { Loading } from '../atoms';

const ProtectedRoute = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const refreshToken = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				setIsAuthenticated(false);
				setLoading(false);
				return;
			}

			try {
				const data = await refreshAuth(token);
				console.log(data);

				if (!data) {
					setIsAuthenticated(false);
				} else {
					localStorage.setItem('token', data.access_token);
					setIsAuthenticated(true);
				}
			} catch (error) {
				console.error('Error refreshing token:', error);
				setIsAuthenticated(false);
			}
			setLoading(false);
		};

		refreshToken();
	}, []);
	if (loading) {
		return <Loading />;
	}

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedRoute;
