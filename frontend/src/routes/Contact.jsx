import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { Link } from 'react-router-dom';
import RouteBanner from '../components/RouteBanner.jsx';

function Contact() {
  const { setLoading } = useLoader();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <RouteBanner />
      <div className="contact">
        <div className="contact_wrap">
          <div className="contact_info">
            <h2 className="contact_title">Contact Info:</h2>
            <p className="contact_desc">
              Fill the form and our team will get back <br /> to you within 24 hours.
            </p>
            <ul className="contact_list">
              <li>
                <i className="fi fi-rr-phone-call"></i> <Link to={'/'}>123 456 789</Link>
              </li>
              <li>
                <i className="fi fi-rr-envelope"></i>info@example.com
              </li>
              <li>
                <i className="fi fi-rr-marker"></i> <span>13, Your Address, Here</span>
              </li>
            </ul>
          </div>
          <form
            id="contact-form"
            className="contact_form"
          >
            <div className="group_input">
              <div className="form_field">
                <input
                  type="text"
                  name="con_firstName"
                  placeholder="First Name*"
                  className="input_field"
                />
              </div>
              <div class="form_field">
                <input
                  type="text"
                  name="con_lastName"
                  placeholder="Last Name*"
                  className="input_field"
                />
              </div>
            </div>
            <div className="group_input">
              <div className="form_field">
                <input
                  type="text"
                  name="con_phone"
                  placeholder="Phone*"
                  className="input_field"
                />
              </div>
              <div className="form_field">
                <input
                  type="text"
                  name="con_email"
                  placeholder="Email*"
                  className="input_field"
                />
              </div>
            </div>
            <div className="form_field">
              <textarea
                name="con_message"
                placeholder="Message"
                className="textarea_field"
              ></textarea>
            </div>
            <div className="contact_button-wrap">
              <button
                type="submit"
                className="btn"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
