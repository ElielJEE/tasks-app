import React from "react";
import { Login, Settings, Signup, Tasks } from "./pages";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/hooks";
import { Account, HabitCards, QuestCards, Site, TaskCards } from "./components/molecules";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path='/' element={<Tasks />}>
							<Route index element={<Navigate to="tasks" replace />} />
							<Route path="tasks" element={<TaskCards />} />
							<Route path="quests" element={<QuestCards />} />
							<Route path="habits" element={<HabitCards />} />
						</Route>

						<Route path="settings/*" element={<Settings />}>
							<Route index element={<Navigate to="account" replace />}
							/>
							<Route path="account" element={<Account />} />
							<Route path="site" element={<Site />} />
						</Route>
					</Route>

					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
