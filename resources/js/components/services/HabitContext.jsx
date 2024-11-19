import React, { createContext, useContext, useEffect, useState } from "react";
import { getHabits, getUser, deleteHabit as deleteHabitService } from ".";
import { decrementHabit, incrementHabit } from "./UpdateHabits";
import { updateHabit as updateHabitService } from ".";
import { LoadingBar } from "../atoms";
import { UserContext } from "./UserContext";

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
	const [loadingBar, setLoadingBar] = useState(false);
	const { userId } = getUser();
	const { updateUser } = useContext(UserContext)

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
		setLoadingBar(true)
		try {
			const token = localStorage.getItem('token');
			const result = await incrementHabit(token, habitId);

			if (result.success) {
				updateUser(result.data.user)
				setHabits((prevHabits) =>
					prevHabits.map((habit) =>
						habit.id === habitId ? { ...habit, count: habit.count + 1 } : habit
					)
				);
			} else {
				console.error('Error incrementing habit:', result.errors);
			}
		} catch (error) {
			console.error('Error: ', error)
		} finally {
			setLoadingBar(false)
		}
	};

	const handleDecrement = async (habitId) => {
		setLoadingBar(true)
		try {
			const token = localStorage.getItem('token');
			const result = await decrementHabit(token, habitId);
			if (result.success) {
				updateUser(result.data.user)
				setHabits((prevHabits) =>
					prevHabits.map((habit) =>
						habit.id === habitId ? { ...habit, count: habit.count - 1 } : habit
					)
				);
			} else {
				console.error('Error decrementing habit:', result.errors);
			}

		} catch (error) {
			console.error("error: ", error)
		} finally {
			setLoadingBar(false)
		}
	};

	const deleteHabit = async (habitId) => {
		setLoadingBar(true)
		try {
			await deleteHabitService(habitId)
			setHabits((preveHabits) => preveHabits.filter((habit) => habit.id !== habitId))
		} catch (error) {
			console.error('error:', error)
		} finally {
			setLoadingBar(false)
		}
	}

	const updateHabit = async (updatedHabitData, token) => {
		setLoadingBar(true)
		try {
			const updatedHabit = await updateHabitService(updatedHabitData, token, updatedHabitData.id)

			if (updatedHabit.success) {
				const upHabit = updatedHabit.data.habits;

				setHabits((prevHabits) =>
					prevHabits.map((habit) =>
						habit.id === upHabit.id ? { ...habit, ...upHabit } : habit
					)
				)
			} else {
				console.error("error:", updatedHabit.errors)
			}

		} catch (error) {
			console.error("error:", error)
		} finally {
			setLoadingBar(false)
		}
	}

	return (
		<HabitContext.Provider value={{ habits, fetchHabits, loading, addHabit, handleDecrement, handleIncrement, deleteHabit, updateHabit }} >
			{loadingBar && <LoadingBar />}
			{children}
		</HabitContext.Provider>
	);
}
