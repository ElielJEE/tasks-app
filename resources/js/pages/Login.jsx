import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../components/services";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    }

    await loginUser(userData, navigate);
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
                className="login__centered-container__login-form-container__login-form__login-input"
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login__centered-container__login-form-container__login-form__login-btn">
                <span className="login__centered-container__login-form-container__login-form__login-btn__span">
                  Log in
                </span>
              </button>
              <Link to={'/register'} className='login__centered-container__login-form-container__login-form__login-link'>Don't have an account? <strong>Sign up.</strong></Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
