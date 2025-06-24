import React from 'react';
import dark from '../assets/logos/dark.png'
import americanExpress from '../assets/icons/american-express.png'
import mastercard from '../assets/icons/mastercard.png'
import paypal from '../assets/icons/paypal.png'
import visa from '../assets/icons/visa.png'
import discover from '../assets/icons/discover.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="navigation">
        <div className="social">
          <div className="img-box">
            <img src={dark} alt="pronia" />
          </div>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet, consec
              adipisl elit, sed do eiusmod tempor 
              incidio ut labore et dolore magna.
            </p>
            <div className="social-links">
              <Link className='facebook' to='https://www.facebook.com/davit.davitinidze'>
                <i className="fi fi-brands-facebook"></i>
              </Link>
              <Link className='twitter' to='https://x.com/KingJames'>
                <i className="fi fi-brands-twitter"></i>
              </Link>
              <Link className='pinterest' to='https://www.pinterest.com/pin/311311393012421528/'>
                <i className="fi fi-brands-pinterest"></i>
              </Link>
              <Link className='dribble' to='https://dribbble.com/shots/15447416-Messi-El-Cl-sico'>
                <i className="fi fi-rr-basketball"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="links-row">
          <div className="links">
            <h3 className='links-title'>{t('UsefulLinks')}</h3>
            <ul className='links-list'>
              <li><Link to={'/about'}>{t('AboutPronia')}</Link></li>
              <li><Link to={'/shop'}>{t('HowToShop')}</Link></li>
              <li><Link>{t('FAQ')}</Link></li>
              <li><Link to={'/contact'}>{t('ContactUs')}</Link></li>
              <li><Link to={'/login'}>{t('Log In')}</Link></li>
            </ul>
          </div>
          <div className="account">
            <h3 className='account-title'>{t('MyAccount')}</h3>
            <ul className='account-list'>
              <li><Link to={'/register'}>{t('Sign In')}</Link></li>
              <li><Link>{t('ViewCart')}</Link></li>
              <li><Link>{t('MyWishlist')}</Link></li>
              <li><Link>{t('TrackMyOrder')}</Link></li>
              <li><Link>{t('Help')}</Link></li>
            </ul>
          </div>
          <div className="service">
            <h3 className='service-title'>{t('OurService')}</h3>
            <ul className='service-list'>
              <li><Link>{t('PaymentMethods')}</Link></li>
              <li><Link>{t('MoneyGuarantee')}!</Link></li>
              <li><Link>{t('Returns')}</Link></li>
              <li><Link>{t('Shipping')}</Link></li>
              <li><Link>{t('PrivacyPolicy')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="number">
          <div className="text-box">
            <h3>{t('GotQuestion?CallUs')}</h3>
            <h2><Link>123 456 789</Link></h2>
            <p>{t('YourAddressGoesHere')}</p>
          </div>
          <div className="cards">
            <Link to={'#'}><img src={americanExpress} alt='americanExpress'/></Link>
            <Link to={'#'}><img src={paypal} alt='paypal'/></Link>
            <Link to={'#'}><img src={mastercard} alt='mastercard'/></Link>
            <Link to={'#'}><img src={discover} alt='discover'/></Link>
            <Link to={'#'}><img src={visa} alt='visa'/></Link>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>© {t('CopyRight')} <span>❤</span> {t('by')} HasThemes</p>
      </div>
    </div>
  );
};

export default Footer;
