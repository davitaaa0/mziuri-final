import React, { useEffect, useState } from 'react';
import { useLoader } from '../context/LoaderContext';
import { validateEmail } from '../utils/validations.jsx';
import RouteBanner from '../components/RouteBanner.jsx';
import * as api from '../api/api.jsx';

function ForgotPassword() {
  const { setLoading } = useLoader();
  const [errorMessages, setErrorMessages] = useState({});
  const [state, setState] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
      });
      document.title = 'Pronia - Forgot Password';
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
      const response = await api.forgotPasswordUser(state);

      if (response.data) {
        alert('email has sent')
      }
    } catch (err) {
      throw err;
    }
  };

  const validate = () => {
    const errors = {};

    const emailError = validateEmail(state.email);

    if (emailError) errors.email = emailError;

    return errors;
  };

  return (
    <div>
      <RouteBanner />
      <div className="forgotPassword">
        <div className="formContainer">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="titlesContainer">
              <h1 className="title">Do not worry!</h1>
              <h3 className="subtitle">enter your email to get reset password link</h3>
            </div>
            <div
              label="Email"
              name="email"
              error={errorMessages.email}
            >
              <input
                type="text"
                className="input"
                name="email"
                id="email"
                value={state.email}
                placeholder="you@example.com"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Send Mail</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

