import React, { useState } from 'react'

export default function useActive() {
	const [active, setActive] = useState(0);

	const activeHandle = (index) => {
		setActive(index);
		console.log(index);
	}
	
	return {active, activeHandle};
}
