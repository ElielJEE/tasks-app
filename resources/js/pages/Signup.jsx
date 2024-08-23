import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
	return (
		<>
			<div className="login">
        <div className="login__centered-container">
          <div className="login__centered-container__title-container">
            <h1 className="login__centered-container__title-container__title">Legend's<span>Path</span></h1>
          </div>
          <div className="login__centered-container__login-form-container ">
            <form action="" method="post" className="login__centered-container__login-form-container__login-form">
              <input type="email" name="name" id="login-email" className="login__centered-container__login-form-container__login-form__login-input" placeholder="username" autoComplete="off"/>
              <input type="email" name="email" id="login-email" className="login__centered-container__login-form-container__login-form__login-input" placeholder="e-mail" autoComplete="off"/>
              <input type="password" name="password" id="login-password" className="login__centered-container__login-form-container__login-form__login-input" placeholder="password" autoComplete="off"/>
              <button className="login__centered-container__login-form-container__login-form__login-btn">
                  <span className="login__centered-container__login-form-container__login-form__login-btn__span">
                    Sign Up
                  </span>
              </button>
							<Link to={'/login'} className='login__centered-container__login-form-container__login-form__login-link'>Already have an account? <strong>Log in.</strong></Link>
            </form>
          </div>
        </div>
      </div>
		</>
	)
}
