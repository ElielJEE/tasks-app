import React, { createContext, useEffect, useState } from 'react';
import { getQuests, getUser } from '.';

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

	return (
		<QuestContext.Provider value={{ quests, fetchQuests, loading, addQuest }}>
			{children}
		</QuestContext.Provider>
	)
}
