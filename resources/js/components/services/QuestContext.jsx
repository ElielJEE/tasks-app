import React, { createContext, useEffect, useState } from 'react';
import { getQuests, getUser, deleteQuest as deleteQuestService } from '.';
import { LoadingBar } from '../atoms';

export const QuestContext = createContext({
	quest: [],
	addQuest: () => { },
	fetchQuests: () => { },
	deleteQuest: () => { },
	loading: true,
});

export const QuestProvider = ({ children }) => {
	const [quests, setQuests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingBar, setLoadingBar] = useState(false);
	const { userId } = getUser();

	const fetchQuests = async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			console.error('No token found');
			return;
		}

		let data;
		if (token && userId) {
			data = await getQuests(token, userId);
			setQuests(data.quests);
			console.log(data);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchQuests();
	}, [userId]);

	const addQuest = (newQuest) => {
		setQuests((prevQuests) => Array.isArray(prevQuests) ? [...prevQuests, newQuest] : [newQuest]);
	}

	const deleteQuest = async (questId) => {
		setLoadingBar(true)
		try {
			await deleteQuestService(questId)
			setQuests((preveQuests) => preveQuests.filter((quest) => quest.id !== questId))
		} catch (error) {
			console.error('Error al eliminar la quests:', error)
		} finally {
			setLoadingBar(false)
		}
	}

	return (
		<QuestContext.Provider value={{ quests, fetchQuests, loading, addQuest, deleteQuest }}>
			{loadingBar && <LoadingBar />}
			{children}
		</QuestContext.Provider>
	)
}
