import React from 'react'
import { Sidebar } from '../atoms'
import { Outlet } from 'react-router-dom'

export default function SettingsOrg() {
	return (
		<>
			<Sidebar />
			<Outlet />
		</>
	)
}
