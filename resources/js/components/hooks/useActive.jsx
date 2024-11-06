import React, { useState } from 'react'

export default function useActive() {
	const [active, setActive] = useState(0);
	const [toggle, setToggle] = useState(false);

	const activeHandle = (index) => {
		setActive(index);
	}

	const toggleActive = () => {
		setToggle(!toggle);
		console.log(active);
	}

	return { active, activeHandle, toggleActive, toggle };
}
