import React, { createContext, useEffect, useState } from "react";
import { getHabits, getUser } from ".";
import { decrementHabit, incrementHabit } from "./UpdateHabits";

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
		if (!token) {
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

	const addHabit = (newHabit) => {
		setHabits((prevHabits) => Array.isArray(prevHabits) ? [...prevHabits, newHabit] : [newHabit]);
	};

	const handleIncrement = async (habitId) => {
		console.log(habitId);
		const token = localStorage.getItem('token');
		const result = await incrementHabit(token, habitId);
		if (result.success) {
			setHabits((prevHabits) =>
				prevHabits.map((habit) =>
					habit.id === habitId ? { ...habit, count: habit.count + 1 } : habit
				)
			);
		} else {
			console.error('Error incrementing habit:', result.errors);
		}
	};

	const handleDecrement = async (habitId) => {
		const token = localStorage.getItem('token');
		const result = await decrementHabit(token, habitId);
		if (result.success) {
			setHabits((prevHabits) =>
				prevHabits.map((habit) =>
					habit.id === habitId ? { ...habit, count: habit.count - 1 } : habit
				)
			);
		} else {
			console.error('Error decrementing habit:', result.errors);
		}
	};

	return (
		<HabitContext.Provider value={{ habits, fetchHabits, loading, addHabit, handleDecrement, handleIncrement }} >
			{children}
		</HabitContext.Provider>
	);
}
