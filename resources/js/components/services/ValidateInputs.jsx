import React from 'react'

export default function ValidateInputs() {

	const validateInputs = (email, password) => {
		let errors = {};

		if (!email) {
			errors.email = 'Email is required'
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				errors.email = 'Please enter a valid email'
			}
		}

		if (!password) {
			errors.password = 'Password is required'
		}

		return Object.keys(errors).length > 0 ? errors : null
	}

	return { validateInputs }
}
