import React from "react";
import { Login, Settings, Signup, Tasks } from "./pages";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/hooks";
import { Account, Site } from "./components/molecules";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path='/' element={<Tasks />} />
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
