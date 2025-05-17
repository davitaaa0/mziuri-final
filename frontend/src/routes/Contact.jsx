import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { Link } from 'react-router-dom';
import RouteBanner from '../components/RouteBanner.jsx';

function Contact() {
  const { setLoading } = useLoader();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then(() => {
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
              <div className="form_field">
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
        <div className="contact_map">
          <iframe className="contact_map_size" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1613802584124!5m2!1sen!2sbd" allowfullscreen="" loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
