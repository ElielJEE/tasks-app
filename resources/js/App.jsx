import React from "react";
import { Login, Signup, Tasks } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Tasks />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
