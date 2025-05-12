import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { UserContext } from '../context/UserContext';
import { loginUser } from '../api/api';
import RouteBanner from '../components/RouteBanner.jsx';

function Login() {
  const { setLoading } = useLoader();
  const { setUserData } = useContext(UserContext);
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
      .then((data) => {
        setLoading(false);
      });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
      if (res.data) {
        setUserData(res.data);
        navigate('/');
      } else if (res.data.err) {
        alert(res.data.err);
      }
    } catch (err) {
      alert(err.message || 'Your password is incorrect');
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
                <Link to="/">Forgotten Password?</Link>
              </div>
            </div>
            <div className="login_button">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
