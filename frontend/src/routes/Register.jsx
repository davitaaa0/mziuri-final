import React, { useContext, useEffect, useState } from 'react';
import { useLoader } from '../context/LoaderContext.jsx';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import RouteBanner from '../components/RouteBanner.jsx';
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validations.jsx'; 

function Register() {
  const { setUserData } = useContext(UserContext);
  const { setLoading } = useLoader();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
      });
  }, []);

  const validate = () => {
  const newErrors = {};

  const firstNameError = validateFirstName(form.firstName);
  if (firstNameError) newErrors.firstName = firstNameError;

  const lastNameError = validateLastName(form.lastName);
  if (lastNameError) newErrors.lastName = lastNameError;

  const emailError = validateEmail(form.email);
  if (emailError) newErrors.email = emailError;

  const passwordError = validatePassword(form.password);
  if (passwordError) newErrors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(form.password, form.confirmPassword);
  if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

  return newErrors;
};

  const handleFormChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: '',
  }));
};


  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await registerUser(form.firstName, form.lastName, form.email, form.password);

      if (response.data) {
        setUserData(response.data);
        navigate('/');
      }
    } catch (err) {
      setErrors({ general: 'Failed to register. Please try again.' });
    }
  };

  return (
    <div>
      <RouteBanner />
      <div className="register">
        <div className="register_form">
          <form
            action="#"
            onSubmit={handleRegisterFormSubmit}
          >
            <h4 className="register_title">Register</h4>
            <div className="register_input">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleFormChange}
                />
                {submitted && errors.firstName && (
                  <small className="error">{errors.firstName}</small>
                )}
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleFormChange}
                />
                {submitted && errors.lastName && <small className="error">{errors.lastName}</small>}
              </div>
            </div>
            <div className="register_input">
              <div>
                <label>Email Address*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleFormChange}
                />
                {submitted && errors.email && <small className="error">{errors.email}</small>}
              </div>
            </div>
            <div className="register_input">
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleFormChange}
                />
                {submitted && errors.password && <small className="error">{errors.password}</small>}
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleFormChange}
                />
                {submitted && errors.confirmPassword && (
                  <small className="error">{errors.confirmPassword}</small>
                )}
              </div>
            </div>
            {errors.general && <small Name="error">{errors.general}</small>}
            <div className="register_button">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
