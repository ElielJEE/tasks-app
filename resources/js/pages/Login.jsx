import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, ValidateInputs } from "../components/services";

export default function Login() {
  const navigate = useNavigate();
  const { validateInputs, emailError, passwordError, setEmailError, setPasswordError } = ValidateInputs();

  const [userData, setUserData] = useState({
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
    e.preventDefault()
    setErrors({})

    const validationErrors = validateInputs(userData.email, userData.password)

    if (validationErrors) {
      setErrors(validationErrors)
      return;
    }

    const result = await loginUser(userData);

    if (result.success) {
      navigate('/')
    } else {
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
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="field-container">
                <input
                  type="password"
                  name="password"
                  id="login-password"
                  className="login__centered-container__login-form-container__login-form__login-input"
                  placeholder="password"
                  autoComplete="off"
                  value={userData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="field-container__field-error">
                    {errors.password}
                  </span>
                )}
              </div>
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
