// src/context/TaskContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getTasks, getUser } from '.';

export const TaskContext = createContext({
  tasks: [],
  addTask: () => {},
  fetchTasks: () => {},
  loading: true,
});

export const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const { userId } = getUser();

	// Función para cargar las tareas
	const fetchTasks = async () => {
		console.log('se ejecuta fetch task');
		const token = localStorage.getItem('token');
		if (!token) {
			console.error('No token found');
			return;
		}

		let data;
		if (token && userId) {
			data = await getTasks(token, userId);
			setTasks(data);
			setLoading(false);
			console.log(userId);
		}
		console.log(data);
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	// Función para añadir una nueva tarea
	const addTask = (newTask) => {
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	return (
		<TaskContext.Provider value={{ tasks, addTask, fetchTasks, loading }}>
			{children}
		</TaskContext.Provider>
	);
};
