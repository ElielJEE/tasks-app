import React from "react";
import { Login, Settings, Signup, Tasks } from "./pages";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/hooks";
import { Account, CreateTaskView, HabitCards, ModalCreation, ModalQuestCreation, QuestCards, Site, TaskCards } from "./components/molecules";
import { TaskProvider } from "./components/services/TaskContext";
import { HabitProvider } from "./components/services/HabitContext";
import ModalHabitCreation from "./components/molecules/ModalHabitCreation";
import { QuestProvider } from "./components/services/QuestContext";
import { UserProvider } from "./components/services/UserContext";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<UserProvider>
					<Routes>
						<Route element={<ProtectedRoute />}>
							<Route path='/' element={<Tasks />}>
								<Route index element={<Navigate to="tasks" replace />} />
								<Route path="tasks" element={
									<TaskProvider>
										<TaskCards />
										<ModalCreation />
									</TaskProvider>
								} />
								<Route path="quests" element={
									<QuestProvider>
										<QuestCards />
										<ModalQuestCreation />
									</QuestProvider>
								} />
								<Route path="habits" element={
									<HabitProvider>
										<HabitCards />
										<ModalHabitCreation />
									</HabitProvider>
								} />
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
				</UserProvider>
			</BrowserRouter>
		</>
	);
}
