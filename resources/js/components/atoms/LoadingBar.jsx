import React from 'react'

export default function LoadingBar() {
	return (
		<div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '4px',
			backgroundColor: '#4caf50',
			animation: 'loading-animation 2s infinite'
		}}>
			<style>
				{`
							@keyframes loading-animation {
									0% { transform: scaleX(0); }
									100% { transform: scaleX(1); }
							}
					`}
			</style>
		</div>
	)
}
