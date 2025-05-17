import React, { useState, useEffect } from 'react';
import { useLoader } from '../context/LoaderContext.jsx';
import { useParams } from 'react-router-dom';
import * as api from '../api/api.jsx';

function ResetPassword() {
  const { setLoading } = useLoader();
  const [state, setState] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const { token } = useParams()

  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json())
        .then((data) => {
          setState(data);
          setLoading(false);
        });
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const response = await api.resetPasswordUser(state, token);

      if (response.data) {
      }
    } catch (err) {
      throw err;
    }
  };

  const validate = () => {
    const errors = {};

    const passwordError = validatePassword(state.password);
    const confirmPasswordError = validateConfirmPassword(state.confirmPassword);

    if (passwordError) errors.password = passwordError;
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    return errors;
  };

  return (
    <div className="resetPassword">
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="titlesContainer">
            <h1 className="title">Reset Your Password</h1>
            <h3 className="subtitle">Sign in to continue your journey</h3>
          </div>
          <div
            label="Password"
            name="password"
            error={errorMessages.password}
          >
            <>
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="input"
                    name="password"
                    id="password"
                    placeholder="enter your password"
                    value={state.password}
                    onChange={(e) => handleChange(e)}
                />
                <button
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    type="button"
                />
            </>
          </div>
          <div
            label="Confirm Password"
            name="confirmPassword"
            error={errorMessages.confirmPassword}
          >
            <>
                <input
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    className="input"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="confirm your password"
                    value={state.confirmPassword}
                    onChange={(e) => handleChange(e)}
                />
                <button
                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    type="button"
                />
            </>
            </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;