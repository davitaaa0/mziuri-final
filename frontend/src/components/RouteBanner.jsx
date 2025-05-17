import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function RouteBanner() {
  const location = useLocation();
  const currentPath = location.pathname;

  const headingTitles = {
    '/': 'Home',
    '/contact': 'Contact',
    '/about': 'About',
    '/shop': 'Shop',
    '/blog': 'Blog',
    '/register': 'Register Page',
    '/login': 'Login Page',
    '/forgot-password': 'Forgot Password',
    '/reset-password': 'Reset Password'
  };

  const locaTitles = {
    '/': 'Home',
    '/contact': 'Contact Us',
    '/about': 'About Us',
    '/shop': 'Shop Default',
    '/blog': 'Blog Grid View',
    '/register': 'Register',
    '/login': 'Login',
    '/forgot-password': 'Restore Password',
    '/reset-password': 'Reset Password'
  };

  const heading = headingTitles[currentPath] || 'Page';
  const loca = locaTitles[currentPath] || 'Page';

  return (
    <div className="banner-section">
      <h1>{heading}</h1>
      <div className="text-box">
        <Link
          to={'/'}
          className="home-link"
        >
          Home
        </Link>
        <div> . </div>
        {loca}
      </div>
    </div>
  );
}

export default RouteBanner;
