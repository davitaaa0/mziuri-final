import React from 'react';
import { Link,  matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RouteBanner() {
  const location = useLocation();
  const currentPath = location.pathname;
  const {t} = useTranslation()

  const headingTitles = {
    '/': t('Home'),
    '/contact': t('Contact'),
    '/about': t('About'),
    '/shop': t('Shop'),
    '/blog': t('Blog'),
    '/register': t('Register'),
    '/login': t('Login'),
    '/forgot-password': t('ForgotPassword'),
    '/reset-password': t('ResetPassword'),
    '/myaccount': t('MyAccountPage'),
    '/cart': t('CartPage'),
    '*': t('Error') + ' 404',
  };

  const locaTitles = {
    '/': t('Home'),
    '/contact': t('ContactUs'),
    '/about': t('AboutUs'),
    '/shop': t('ShopDefault'),
    '/blog': t('BlogGrid'),
    '/register': t('Register'),
    '/login': t('Login'),
    '/forgot-password': t('ForgotPassword'),
    '/reset-password': t('ResetPassword'),
    '/myaccount': t('MyAccount'),
    '/cart': t('Cart'),
    '*': '404'
  };

  const is404 = !Object.keys(headingTitles)
  .filter((path) => path !== '*')
  .some((path) => matchPath({ path, end: true }, currentPath));


  const heading = is404 ? t('Error') + ' 404' : headingTitles[currentPath] || t('Page');
  const loca = is404 ? '404' : locaTitles[currentPath] || t('Page');

  return (
    <div className="banner-section">
      <h1>{heading}</h1>
      <div className="text-box">
        <Link
          to={'/'}
          className="home-link"
        >
          {t('Home')}
        </Link>
        <div> . </div>
        {loca}
      </div>
    </div>
  );
}

export default RouteBanner;
