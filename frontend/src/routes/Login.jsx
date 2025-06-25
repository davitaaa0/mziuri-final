import React, { useContext, useEffect, useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validations.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { UserContext, syncCartAfterLogin } from '../context/UserContext';
import { loginUser } from '../api/api';
import { CartContext } from '../context/CartContext';
import RouteBanner from '../components/RouteBanner.jsx';

function Login() {
  const { setLoading } = useLoader();
  const { setUserData } = useContext(UserContext);
  const { setCartItems, setCartInitialized } = useContext(CartContext);
  
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
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
      document.title = 'Pronia - Login';
  }, []);

  const validate = () => {
    const newErrors = {};

    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(form.password);
    if (passwordError) newErrors.password = passwordError;

    return newErrors;
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };


  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await loginUser(form.email, form.password);

      if (res && res.data) {
        setUserData(res.data);

        await syncCartAfterLogin(res.data.token, setCartItems, setCartInitialized);

        if (form.remember) {
          localStorage.setItem('userData', JSON.stringify(res.data));
        }

        navigate('/');
      } else if (res.err) {
        alert(res.err);
      } else {
        alert('Unexpected response from server');
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Your password is incorrect');
    }
  };


  return (
    <div>
      <RouteBanner />
      <div className="login">
        <div className="login_form">
          <form onSubmit={handleLoginFormSubmit}>
            <h4 className="login_title">Login</h4>
            <div className="login_input">
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
            <div className="login_input">
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
            </div>
            <div
              className="login_input"
              style={{ display: 'flex', gap: '40%' }}
            >
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember-me"
                  checked={form.remember}
                  onChange={handleFormChange}
                />
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <div>
                <Link to="/forgot-password">Forgotten Password?</Link>
              </div>
            </div>
            <div className="login_button">
              <input type="submit"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
