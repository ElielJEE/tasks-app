import React, { useEffect, useState } from 'react'
import CreateTaskView from './CreateTaskView';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ModalCreation({ showModal, comp }) {
	const location = useLocation();
	const shouldShowModal = location.state?.showModal ?? showModal;
	const [closeModal, setCloseModal] = useState(true)
	const navigate = useNavigate()

	const handleCloseModal = () => {
		setCloseModal(false)
		navigate('/tasks', { state: { showModal: false } })
	}

	/* if (!shouldShowModal) {
		return null;
	} */

	return (
		<>
			{
				shouldShowModal || comp ? (
					<>
						<div className="create-modal-container active-modal-creation" onClick={handleCloseModal}>
							<button className="create-modal-container__close-modal" onClick={handleCloseModal}>
								Cerrar
							</button>
						</div>
						{comp ? comp : <CreateTaskView setCloseModal />}
					</>
				) : ('')
			}
		</>
	)
}
