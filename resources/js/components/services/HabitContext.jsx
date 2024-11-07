import React, { createContext, useEffect, useState } from "react";
import { getHabits, getUser } from ".";

export const HabitContext = createContext({
	habits: [],
	addHabit: () => { },
	fetchHabits: () => { },
	deleteHabit: () => { },
	loading: true,
});

export const HabitProvider = ({ children }) => {
	const [habits, setHabits] = useState([]);
	const [loading, setLoading] = useState(true);
	const { userId } = getUser();

	const fetchHabits = async () => {
		const token = localStorage.getItem('token');
		if(!token) {
			console.error('No token found');
			return;
		}

		let data;
		if (token && userId) {
			data = await getHabits(token, userId);
			console.log(data);
			setHabits(data.habit);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchHabits();
	}, [userId]);

	return (
		<HabitContext.Provider value={{habits, fetchHabits, loading}} >
			{children}
		</HabitContext.Provider>
	);
}
