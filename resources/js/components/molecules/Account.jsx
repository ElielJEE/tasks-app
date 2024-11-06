import React, { useState, useEffect } from 'react'
import { useActive } from '../hooks'
import { Loading } from '../atoms';
import { getUser, updateUser } from '../services';
import { useNavigate } from 'react-router-dom';

export default function Account() {
	const { active, activeHandle } = useActive();
	const { user } = getUser();
	const [selectedFile, setSelectedFile] = useState(null);
	const navigate = useNavigate();

	const handleSelectionFile = (e) => {
		e.preventDefault();
		setSelectedFile(e.target.files[0]);
	}

	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		avatar: '',
		displayname: ''
	})
	const [errors, setErrors] = useState({})

	const handleChange = (e) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value
		})
	}

	/* useEffect(() => {
		if (user) {
			setUserData({
				name: user.name,
				email: user.email,
				displayname: user.displayname,
				avatar: user.avatar,
				password: ''
			})
		}
	}, [user]) */

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({})

		const token = localStorage.getItem('token')
		if (!token) {
			console.error('No token found.')
			return
		}

		const formData = new FormData();
		formData.append('name', userData.name);
		formData.append('email', userData.email);
		formData.append('password', userData.password);
		formData.append('displayname', userData.displayname);

		if (selectedFile) {
			formData.append('avatar', selectedFile);
		}

		formData.append('_method', 'PUT');

		const result = await updateUser(formData, token);

		if (result.success) {
			navigate(0)
			console.log('bien');
		} else {
			console.log(result.errors);
			setErrors(result.errors)
		}
	}

	return (
		<>
			{
				!user
					? (
						<Loading />
					)
					: (
						<div className="account-settings s-container">
							{
								user.avatar && (
									<>
										<div className='account-settings__image-preview'>
											<img src={user.avatar} alt="" className='account-settings__image-preview__img-prev' />
										</div>
										<span className="account-settings__image-preview__span-img">
											¿Te gusta tu nueva imagen?
										</span>
									</>
								)
							}
							<form className="account-settings__account-form">
								<table className="account-settings__account-form__table-form">
									<tbody className="account-settings__account-form__table-form__tb">
										<tr className="account-settings__account-form__table-form__tb__tr">
											<td className="account-settings__account-form__table-form__tb__tr__td-label">
												<label htmlFor="username" className="account-settings__account-form__table-form__tb__tr__td-label__account-label">
													Username
												</label>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-input">
												<input
													type="text"
													className="account-settings__account-form__table-form__tb__tr__td-input__account-input"
													name='name'
													disabled={active === 1 ? false : true}
													value={userData.name}
													onChange={handleChange}
													placeholder={user.name}
													autoComplete='username'
												/>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-btn">
												<button className={active === 1 ? ("account-settings__account-form__table-form__tb__tr__td-btn__edit-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__edit-btn active-edit-btn")}
													type='button'
													onClick={e => {
														activeHandle(1)
														e.preventDefault();
													}}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn__edit-span">
														Editar
													</span>
												</button>
												<button className={active === 1 ? ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn")}
													type='button'
													onClick={handleSubmit}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__save-btn__save-span">
														Guardar
													</span>
												</button>
												<button className={active === 1 ? ("account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn")}
													type='button'
													onClick={e => {
														activeHandle(0)
														e.preventDefault();
													}}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn__cancel-span">
														Cancelar
													</span>
												</button>
											</td>
										</tr>
										<tr className="account-settings__account-form__table-form__tb__tr">
											<td className="account-settings__account-form__table-form__tb__tr__td-label">
												<label htmlFor="email" className="account-settings__account-form__table-form__tb__tr__td-label__account-label" >
													Email
												</label>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-input">
												<input
													type="email"
													className="account-settings__account-form__table-form__tb__tr__td-input__account-input"
													name='email'
													placeholder={user.email}
													disabled={active === 2 ? false : true}
													value={userData.email}
													onChange={handleChange}
												/>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-btn">
												<button className={active === 2 ? ("account-settings__account-form__table-form__tb__tr__td-btn__edit-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__edit-btn active-edit-btn")}
													type='button'
													onClick={e => {
														activeHandle(2)
														e.preventDefault();
													}}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn__edit-span">
														Editar
													</span>
												</button>
												<button
													className={active === 2 ? ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn")}
													onClick={handleSubmit}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__save-btn__save-span">
														Guardar
													</span>
												</button>
												<button className={active === 2 ? ("account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn")}
													type='button'
													onClick={e => {
														activeHandle(0)
														e.preventDefault();
													}}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn__cancel-span">
														Cancelar
													</span>
												</button>
											</td>
										</tr>
										<tr className="account-settings__account-form__table-form__tb__tr">
											<td className="account-settings__account-form__table-form__tb__tr__td-label">
												<label htmlFor="displayname" className="account-settings__account-form__table-form__tb__tr__td-label__account-label" >
													Display name
												</label>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-input">
												<input
													type="text"
													className="account-settings__account-form__table-form__tb__tr__td-input__account-input"
													name='displayname'
													placeholder={!user.displayname ? (user.name) : (user.displayname)}
													disabled={active === 3 ? false : true}
													value={userData.displayname}
													onChange={handleChange}
													autoComplete='displayname'
												/>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-btn">
												<button className={active === 3 ? ("account-settings__account-form__table-form__tb__tr__td-btn__edit-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__edit-btn active-edit-btn")}
													type='button'
													onClick={e => {
														activeHandle(3)
														e.preventDefault();
													}}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn__edit-span">
														Editar
													</span>
												</button>
												<button
													className={active === 3 ? ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn")}
													type='button'
													onClick={handleSubmit}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__save-btn__save-span">
														Guardar
													</span>
												</button>
												<button className={active === 3 ? ("account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn")}
													type='button'
													onClick={e => {
														activeHandle(0)
														e.preventDefault();
													}}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn__cancel-span">
														Cancelar
													</span>
												</button>
											</td>
										</tr>
										<tr className="account-settings__account-form__table-form__tb__tr">
											<td className="account-settings__account-form__table-form__tb__tr__td-label">
												<label htmlFor="password" className="account-settings__account-form__table-form__tb__tr__td-label__account-label" >
													Password
												</label>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-input">
												<input
													type="password"
													className="account-settings__account-form__table-form__tb__tr__td-input__account-input"
													name='password'
													disabled={active === 4 ? false : true}
													value={userData.password}
													onChange={handleChange}
													placeholder='***********'
													autoComplete='current-password'
												/>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-btn">
												<button className={active === 4 ? ("account-settings__account-form__table-form__tb__tr__td-btn__edit-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__edit-btn active-edit-btn")}
													type='button'
													onClick={e => {
														activeHandle(4)
														e.preventDefault();
													}}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn__edit-span">
														Editar
													</span>
												</button>
												<button
													className={active === 4 ? ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn")}
													type='button'
													onClick={handleSubmit}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__save-btn__save-span">
														Guardar
													</span>
												</button>
												<button className={active === 4 ? ("account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn")}
													type='button'
													onClick={e => {
														activeHandle(0)
														e.preventDefault();
													}}
												>
													<span className="account-settings__account-form__table-form__tb__tr__td-btn__cancel-btn__cancel-span">
														Cancelar
													</span>
												</button>
											</td>
										</tr>
										<tr className="account-settings__account-form__table-form__tb__tr">
											<td className="account-settings__account-form__table-form__tb__tr__td-label">
												<label htmlFor="password" className="account-settings__account-form__table-form__tb__tr__td-label__account-label" >
													Avatar
												</label>
											</td>
											<td className="account-settings__account-form__table-form__tb__tr__td-input">
												<input
													type="file"
													className="account-settings__account-form__table-form__tb__tr__td-input__account-input-file"
													name='image'
													accept='image/*'
													onChange={handleSelectionFile}
												/>
											</td>
											{selectedFile && (
												<td className="account-settings__account-form__table-form__tb__tr__td-btn">
													<button
														className="account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn"
														onClick={handleSubmit}
													>
														<span className="account-settings__account-form__table-form__tb__tr__td-btn__save-btn__save-span">
															Guardar
														</span>
													</button>
												</td>
											)}
										</tr>
									</tbody>
								</table>
								<button className="account-settings__account-form__delete-btn" type='button'>
									<span className="account-settings__account-form__delete-btn__delete-span">
										Eliminar cuenta
									</span>
								</button>
							</form>
						</div>
					)}
		</>
	)
}
