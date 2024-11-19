// src/context/TaskContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTasks, getUser, deleteTask as deleteTaskService, updateTask as updateTaskService } from '.';
import { LoadingBar } from '../atoms';
import { UserContext } from './UserContext';

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
	const [loadingBar, setLoadingBar] = useState(false);
	const { userId } = getUser();
	const { updateUser } = useContext(UserContext)
	// Función para cargar las tareas
	const fetchTasks = async () => {
		setLoading(true)
		setLoadingBar(true)
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No token found');

			const data = await getTasks(token, userId);
			setTasks(data.task || []);

		} catch (error) {
			console.error('Error fetching tasks:', error)
		} finally {
			setLoadingBar(false)
			setLoading(false)
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
		setLoadingBar(true)
		try {
			await deleteTaskService(taskId);  // Elimina la tarea desde el backend
			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));  // Actualiza el estado local
		} catch (err) {
			console.error('Error al eliminar la tarea:', err);
		} finally {
			setLoadingBar(false)
		}
	};

	const updateTask = async (updatedTaskData, token) => {
		setLoadingBar(true)
		try {
			const updatedTask = await updateTaskService(updatedTaskData, token, updatedTaskData.id); // Llama al servicio que actualiza en el backend
			console.log("desde la api:", updatedTask);
			if (updatedTask.success) {
				updateUser(updatedTask.data.user)
				const upTask = updatedTask.data.task;
				console.log("desde la api:", updatedTaskData.id);
				// Actualizar la lista de tareas en el estado
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === upTask.id ? { ...task, ...upTask } : task
					)
				);
			} else {
				console.log("error:", updatedTask.errors)
			}
		} catch (error) {
			console.error('Error al actualizar la tarea:', error);
		} finally {
			setLoadingBar(false)
		}
	};

	return (
		<TaskContext.Provider value={{ tasks, addTask, fetchTasks, loading, deleteTask, updateTask }}>
			{loadingBar && <LoadingBar />}
			{children}
		</TaskContext.Provider>
	);
};
