import React from "react";
import { Login, Signup, Tasks } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/hooks";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path='/' element={<Tasks />} />
					</Route>
					
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
