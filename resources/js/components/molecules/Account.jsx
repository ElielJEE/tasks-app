import React from 'react'
import { useActive } from '../hooks'

export default function Account() {
	const { active, activeHandle } = useActive();

	return (
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
								<input type="text" className="account-settings__account-form__table-form__tb__tr__td-input__account-input" name='username' defaultValue={"Elielsito"} disabled={active === 1 ? false : true} />
							</td>
							<td className="account-settings__account-form__table-form__tb__tr__td-btn">
								<button className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn"
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
							</td>
						</tr>
						<tr className="account-settings__account-form__table-form__tb__tr">
							<td className="account-settings__account-form__table-form__tb__tr__td-label">
								<label htmlFor="email" className="account-settings__account-form__table-form__tb__tr__td-label__account-label" >
									Email
								</label>
							</td>
							<td className="account-settings__account-form__table-form__tb__tr__td-input">
								<input type="email" className="account-settings__account-form__table-form__tb__tr__td-input__account-input" name='email' defaultValue={"elielsito@guapo.com"} />
							</td>
							<td className="account-settings__account-form__table-form__tb__tr__td-edit">
								<button className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn">
									<span className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn__edit-span">
										Editar
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
								<input type="text" className="account-settings__account-form__table-form__tb__tr__td-input__account-input" name='displayname' defaultValue={"elielsitoGuapo"} />
							</td>
							<td className="account-settings__account-form__table-form__tb__tr__td-edit">
								<button className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn">
									<span className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn__edit-span">
										Editar
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
								<input type="password" className="account-settings__account-form__table-form__tb__tr__td-input__account-input" name='password' defaultValue={"no podes saber"} />
							</td>
							<td className="account-settings__account-form__table-form__tb__tr__td-edit">
								<button className="account-settings__account-form__table-form__tb__tr__td-btn__edit-btn">
									<span className="account-settings__account-form__table-form__tb__tr__td-btn__edit-span">
										Editar
									</span>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	)
}
