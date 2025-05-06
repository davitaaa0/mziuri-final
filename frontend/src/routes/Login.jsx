import React, { useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderContext'
import { Link } from 'react-router-dom'
import RouteBanner from '../components/RouteBanner.jsx'

function Login() {
    const { setLoading } = useLoader()
    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    })

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {   
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(data => {setLoading(false);})
    }, [])

    const validate = () => {
        const newErrors = {}
        if (!form.email.trim()) {
            newErrors.email = 'Email is required.'
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email is invalid.'
        }
        if (!form.password) {
            newErrors.password = 'Password is required.'
        }
        return newErrors
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        setErrors(validationErrors)
        setSubmitted(true)

        if (Object.keys(validationErrors).length === 0) {
            console.log('Login submitted:', form)
        }
    }

  return (
    <div>
        <RouteBanner />
        <div className='login'>
            <div class="login_form">
            <form onSubmit={handleSubmit} action={'#'}>
                <h4 className="login_title">Login</h4>
                <div className="login_input">
                    <div>
                        <label>Email Address*</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                        {submitted && errors.password && <small className="error">{errors.password}</small>}
                    </div>
                </div>
                <div className="login_input" style={{ display: 'flex', gap: '40%' }}>
                    <div className='checkbox'>
                        <input
                            type="checkbox"
                            name="remember"
                            id='remember-me'
                            checked={form.remember}
                            onChange={handleChange}
                        />
                        <label htmlFor="remember-me">Remember Me</label>
                    </div>
                    <div>
                        <Link to='/'>Forgotten Password?</Link>
                    </div>
                </div>
                <div className="login_button">
                    <button type="submit">Login</button>
                </div>
            </form>
            </div>
        </div>      
    </div>
  )
}

export default Login