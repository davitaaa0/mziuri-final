import React, { useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderContext.jsx'
import RouteBanner from '../components/RouteBanner.jsx'

function Register() {
    const [state, setState] = useState()
    const { setLoading } = useLoader()
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {   
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(data => {setState(data); setLoading(false);})
    }, [])

    const validate = () => {
        const newErrors = {}
        if (!form.firstName.trim()) newErrors.firstName = 'First name is required.'
        if (!form.lastName.trim()) newErrors.lastName = 'Last name is required.'
        if (!form.email.trim()) {
            newErrors.email = 'Email is required.'
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email is invalid.'
        }
        if (!form.password) newErrors.password = 'Password is required.'
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.'
        }

        return newErrors
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        setErrors(validationErrors)
        setSubmitted(true)

        if (Object.keys(validationErrors).length === 0) {
            console.log('Form data:', form)
        }
    }

    return (
    <div>
        <RouteBanner />
        <div className='register'>
            <div class="register_form">
                <form action="#" onSubmit={handleSubmit}>
                    <h4 class="register_title">Register</h4>
                    <div className="register_input">
                        <div>
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={handleChange}
                            />
                            {submitted && errors.firstName && <small className="error">{errors.firstName}</small>}
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                            />
                            {submitted && errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
                        </div>
                    </div>
                    <div className="register_button">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>      
    </div>
  )
}

export default Register