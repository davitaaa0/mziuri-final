import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { UserContext } from '../context/UserContext';
import { logoutUser } from '../api/api'
import dark from '../assets/logos/dark.png'
import ArrowDropdown from '../components/ArrowDropdown';
import Dropdown from '../components/Dropdown';
import SearchModal from '../components/SearchModal'

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { userData, setUserData } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { setCurrency } = useCurrency();
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleChangeCurrency = (curr) => {
    setCurrency(curr);
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  
  const currency = [
    <button onClick={() => handleChangeCurrency('usd')}>USD</button>, 
    <button onClick={() => handleChangeCurrency('gel')}>GEL</button>, 
    <button onClick={() => handleChangeCurrency('gbp')}>GBP</button>
  ]
  const languages = [
    <button onClick={() => handleChangeLanguage('en')}>English</button>, 
    <button onClick={() => handleChangeLanguage('fr')}>Français</button>, 
    <button onClick={() => handleChangeLanguage('it')}>Italiano</button>, 
    <button onClick={() => handleChangeLanguage('es')}>Español</button>
  ]

  const handleLogout = async () => {
  try {
    await logoutUser();
    clearCart();
    localStorage.removeItem('cart'); 
    setUserData(null);
    navigate('/');
  } catch (err) {
    console.error('Logout error:', err.response || err.message);
    alert(`Logout failed: ${err.response?.data?.message || err.message}`);
  }
};


  const profile = [
    <i className="fi fi-rr-user" key="icon" />,
    <Link to="/myaccount" key="account">{t('MyAccount')}</Link>,
    !userData && <Link to="/register" key="register">{t('Register')}</Link>,
    !userData && <Link to="/login" key="login">{t('Login')}</Link>,
    userData && (
    <Link key="logout" to="/" onClick={handleLogout}>
      {t('Logout')}
    </Link>
    )
  ].filter(Boolean);

  const handleToggle = (index) => {
    setOpenDropdown(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <header className='main-header'>
      <div className="header-top">
        <p>{t('HeaderHello')}</p>
        <div className="arrowdropdown">
          <ArrowDropdown 
            options={currency}
            isOpen={openDropdown === 0}
            onToggle={() => handleToggle(0)}
            storageKey="currencyDropdownIndex"
          />
          <ArrowDropdown 
            options={languages}
            isOpen={openDropdown === 1}
            onToggle={() => handleToggle(1)}
            storageKey="languageDropdownIndex"
          />
        </div>
      </div>
      <div className='header-middle'>
        <div className="number">
          <i className="fi fi-rr-phone-call"></i>
          <Link to={'/'}>+00 123 456 789</Link>
        </div>
        <div className="img-box">
          <Link to={'/'}>
            <img
              src={dark}
              alt="Header Logo"
            />
          </Link>
        </div>
        <div className="icons">
          <SearchModal />
          <div className="desktop-only">
            <Dropdown 
              options={profile}
              isOpen={openDropdown === 2}
              onToggle={() => handleToggle(2)}
            />
            <i className="fi fi-rr-heart"></i>
          </div>
          <Link to={'/cart'}><i className="fi fi-rr-shopping-cart"></i></Link>
          <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(prev => !prev)}>
            <i className="fi fi-rr-menu-burger"></i>
          </button>
        </div>
      </div>
      <div className="header-bottom">
        <Link to="/">{t('Home')}</Link>
        <Link to="/shop">{t('Shop')}</Link>
        <Link to="/blog">{t('Blog')}</Link>
        <Link to="/about">{t('AboutUs')}</Link>
        <Link to="/404">{t('Pages')}</Link>
        <Link to="/contact">{t('ContactUs')}</Link>
      </div>
      {isMobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="mobile-menu">
            <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fi fi-rr-cross"></i>
            </button>
            <div className="number">
              <i className="fi fi-rr-phone-call"></i>
              <Link to={'/'}>+00 123 456 789</Link>
            </div>
            <div className="dropdowns">
              <ArrowDropdown 
                options={languages}
                isOpen={openDropdown === 3}
                onToggle={() => handleToggle(3)}
                storageKey="languageDropdownIndex"
              />
              <ArrowDropdown 
                options={currency}
                isOpen={openDropdown === 4}
                onToggle={() => handleToggle(4)}
                storageKey="currencyDropdownIndex"
              />
              <Dropdown
                options={profile}
                isOpen={openDropdown === 5}
                onToggle={() => handleToggle(5)}
              />
              <i className="fi fi-rr-heart"></i>
            </div>
            <div className="routes">
              <Link to="/">{t('Home')}</Link>
              <Link to="/shop">{t('Shop')}</Link>
              <Link to="/blog">{t('Blog')}</Link>
              <Link to="/about">{t('AboutUs')}</Link>
              <Link to="/404">{t('Pages')}</Link>
              <Link to="/contact">{t('ContactUs')}</Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
