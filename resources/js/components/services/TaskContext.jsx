// src/context/TaskContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getTasks, getUser, deleteTask as deleteTaskService, updateTask as updateTaskService } from '.';

export const TaskContext = createContext({
	tasks: [],
	addTask: () => { },
	fetchTasks: () => { },
	deleteTask: () => { },
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
			setTasks(data.task);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, [userId]);

	// Función para añadir una nueva tarea
	const addTask = (newTask) => {
		setTasks((prevTasks) => Array.isArray(prevTasks) ? [...prevTasks, newTask] : [newTask]);
	};

	const deleteTask = async (taskId) => {
		try {
			await deleteTaskService(taskId);  // Elimina la tarea desde el backend
			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));  // Actualiza el estado local
		} catch (err) {
			console.error('Error al eliminar la tarea:', err);
		}
	};

	const updateTask = async (updatedTaskData, token) => {
		try {
			const updatedTask = await updateTaskService(updatedTaskData, token, updatedTaskData.id); // Llama al servicio que actualiza en el backend
			const upTask = updatedTask.data.task;
			console.log("desde la api:", updatedTask);
			console.log("desde la api:", updatedTaskData.id);
			// Actualizar la lista de tareas en el estado
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === upTask.id ? { ...task, ...upTask } : task
				)
			);
			console.log("desde el contexto:", tasks[1].id);
		} catch (error) {
			console.error('Error al actualizar la tarea:', error);
		}
	};

	return (
		<TaskContext.Provider value={{ tasks, addTask, fetchTasks, loading, deleteTask, updateTask }}>
			{children}
		</TaskContext.Provider>
	);
};
