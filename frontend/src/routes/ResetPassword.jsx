import React, { useState, useEffect } from 'react';
import { useLoader } from '../context/LoaderContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { validatePassword, validateConfirmPassword} from '../utils/validations.jsx'
import RouteBanner from '../components/RouteBanner.jsx';
import * as api from '../api/api.jsx';

function ResetPassword() {
  const { setLoading } = useLoader();
  const { token } = useParams()
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [state, setState] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json())
        .then(() => {
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
    setErrorMessages(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await api.resetPasswordUser(state, token);

      if (response.data) {
        alert("✅ Password reset successful! You can now log in.");
        navigate('/login');
      }
    } catch (err) {
      console.error("❌ Reset error:", err);
      alert(err.response?.data?.msg || "An error occurred while resetting password.");
    }
  };

  const validate = () => {
    const errors = {};

    const passwordError = validatePassword(state.password);
    const confirmPasswordError = validateConfirmPassword(state.password, state.confirmPassword);

    if (passwordError) errors.password = passwordError;
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    return errors;
  };

  return (
    <div>
      <RouteBanner />
      <div className="resetPassword">
        <div className="formContainer">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="titlesContainer">
              <h1 className="title">Reset Your Password</h1>
              <h3 className="subtitle">Sign in to continue your journey</h3>
            </div>
            <div>
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
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <div>
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
              >
                {isConfirmPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;