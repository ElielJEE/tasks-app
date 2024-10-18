import React, { useEffect, useState } from 'react'
import CreateTaskView from './CreateTaskView';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ModalCreation({ showModal }) {
	const location = useLocation();
	const shouldShowModal = location.state?.showModal ?? showModal;
	const [closeModal, setCloseModal] = useState(true)
	const navigate = useNavigate()

	const handleCloseModal = () => {
		setCloseModal(false)
		navigate('/tasks', { state: { showModal: false } })
	}

	if (!shouldShowModal) {
		return null;
	}

	return (
		<div className="create-task-modal-container active-modal-creation">
			<button className="create-task-modal-container__close-modal" onClick={handleCloseModal}>
				Cerrar
			</button>
			<CreateTaskView setCloseModal />
		</div>
	)
}
