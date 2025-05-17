import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dark from '../assets/logos/dark.png'
import ArrowDropdown from '../components/ArrowDropdown';
import Dropdown from '../components/Dropdown';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const currency = ['USD', 'GBP', 'ISO']
  const languages = ['English', 'French', 'Italian', 'Spanish']
  const profile = [
    <i className="fi fi-rr-user"></i>, 
    <Link to="/">My Account</Link>,
    <Link to="register">Register</Link>,
    <Link to="login">Login</Link>
  ]

  const handleToggle = (index) => {
    setOpenDropdown(prev => (prev === index ? null : index));
  };

  return (
    <header className="main-header">
      <div className="header-top">
        <p>HELLO EVERYONE! 25% Off All Products</p>
        <div className="arrowdropdown">
          <ArrowDropdown 
            options={currency}
            isOpen={openDropdown === 0}
            onToggle={() => handleToggle(0)}
          />
          <ArrowDropdown 
            options={languages}
            isOpen={openDropdown === 1}
            onToggle={() => handleToggle(1)}
          />
        </div>
      </div>
      <div className="header-middle">
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
          <i className="fi fi-rr-search"></i>
          <Dropdown 
            options={profile}
            isOpen={openDropdown === 2}
            onToggle={() => handleToggle(2)}
          >
          </Dropdown>
          <i className="fi fi-rr-heart"></i>
          <i className="fi fi-rr-shopping-cart"></i>
        </div>
      </div>
      <div className="header-bottom">
        <Link to="/">HOME</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/blog">BLOG</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/404">PAGES</Link>
        <Link to="/contact">CONTACT US</Link>
      </div>
    </header>
  );
};

export default Header;
