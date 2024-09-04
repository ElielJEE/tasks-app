import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../components/services';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    await registerUser(userData, navigate);
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
              <input
                type="text"
                name="name"
                id="login-username" className="login__centered-container__login-form-container__login-form__login-input" placeholder="username"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                id="login-email"
                className="login__centered-container__login-form-container__login-form__login-input"
                placeholder="e-mail"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                id="login-password"
                className="login__centered-container__login-form-container__login-form__login-input" placeholder="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
