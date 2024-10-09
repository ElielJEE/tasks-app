import React, { useState, useEffect } from 'react'
import { useActive } from '../hooks'
import { Loading } from '../atoms';
import { getUser } from '../services';

export default function Account() {
	const { active, activeHandle } = useActive();
	const { user } = getUser();
	const [selectedFile, setSelectedFile] = useState(null);

	const handleSelectionFile = (e) => {
		e.preventDefault();
		setSelectedFile(e.target.files[0]);
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
												<input type="text" className="account-settings__account-form__table-form__tb__tr__td-input__account-input" name='username' defaultValue={user.name} disabled={active === 1 ? false : true} />
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
													onClick={e => {
														activeHandle(1)
														e.preventDefault();
													}}
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
												<input type="email" className="account-settings__account-form__table-form__tb__tr__td-input__account-input" name='email' defaultValue={user.email} disabled={active === 2 ? false : true} />
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
												<button className={active === 2 ? ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn")}>
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
												<input type="text" className="account-settings__account-form__table-form__tb__tr__td-input__account-input" name='displayname' defaultValue={!user.displayname ? (user.name) : (user.displayname)} disabled={active === 3 ? false : true} />
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
												<button className={active === 3 ? ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn")}
													type='button'
													onClick={e => {
														activeHandle(1)
														e.preventDefault();
													}}
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
												<input type="password" className="account-settings__account-form__table-form__tb__tr__td-input__account-input" name='password' disabled={active === 4 ? false : true} />
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
												<button className={active === 4 ? ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn") : ("account-settings__account-form__table-form__tb__tr__td-btn__save-btn")}
													type='button'
													onClick={e => {
														activeHandle(1)
														e.preventDefault();
													}}
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
												<input type="file" className="account-settings__account-form__table-form__tb__tr__td-input__account-input-file" name='image' accept='image/*' onChange={handleSelectionFile} />
											</td>
											{selectedFile && (
												<td className="account-settings__account-form__table-form__tb__tr__td-btn">
													<button className="account-settings__account-form__table-form__tb__tr__td-btn__save-btn active-act-btn">
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
