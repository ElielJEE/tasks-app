import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, ValidateInputs } from '../components/services';

export default function Signup() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    const result = await registerUser(userData);

    if (result.success) {
      navigate('/')
    } else {
      console.log(result.errors);
      setErrors(result.errors)
    }
  }

  return (
    <>
      <div className="login">
        <div className="login__centered-container">
          <div className="login__centered-container__title-container">
            <h1 className="login__centered-container__title-container__title">Carpe<span>Diem</span></h1>
          </div>
          <div className="login__centered-container__login-form-container ">
            <form onSubmit={handleSubmit} className="login__centered-container__login-form-container__login-form">
              <div className="field-container">
                <input
                  type="text"
                  name="name"
                  id="login-username" className="login__centered-container__login-form-container__login-form__login-input" placeholder="username"
                  autoComplete="off"
                  value={userData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="field-container__field-error">
                    {errors.name[0]}
                  </span>
                )}
              </div>
              <div className="field-container">
                <input
                  type="email"
                  name="email"
                  id="login-email"
                  className="login__centered-container__login-form-container__login-form__login-input"
                  placeholder="e-mail"
                  autoComplete="off"
                  value={userData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="field-container__field-error">
                    {errors.email[0]}
                  </span>
                )}
              </div>
              <div className="field-container">
                <input
                  type="password"
                  name="password"
                  id="login-password"
                  className="login__centered-container__login-form-container__login-form__login-input" placeholder="password"
                  autoComplete="off"
                  value={userData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="field-container__field-error">
                    {errors.password[0]}
                  </span>
                )}
              </div>
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
