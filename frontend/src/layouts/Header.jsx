import React from 'react';
import { Link } from "react-router-dom";


const Header = () => {
  const images = [
    "https://htmldemo.net/pronia/pronia/assets/images/logo/dark.png",
  ];

  return (
    <header className="main-header">
      <div className='header-top'>
        <p>HELLO EVERYONE! 25% Off All Products</p>
        <div className='dropdown'>
          <select name="currency" id="currency">
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="ISO">ISO</option>
          </select>
          <select name="language" id="language">
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
      </div>
      <div className='header-middle'>
        <div className='number'>
          <i className="fi fi-rr-phone-call"></i>
          <a href='#'>+00 123 456 789</a>
        </div>
        <div className='img-box'>
          <Link to={'/'}><img src={images[0]} alt="Header Logo"/></Link>
        </div>
        <div className='icons'>
          <i className="fi fi-rr-search"></i>
          <Link to='register'><i className="fi fi-rr-user"></i></Link>
          <Link to='login'><i className="fi fi-rr-heart"></i></Link>
          <i className="fi fi-rr-shopping-cart"></i>
        </div>
      </div>
      <hr></hr>
      <div className='header-bottom'>
        <Link to='/'>HOME</Link>
        <Link to='/shop'>SHOP</Link>
        <Link to='/blog'>BLOG</Link>
        <Link to='/about'>ABOUT US</Link>
        <Link to='/404'>PAGES</Link>
        <Link to='/contact'>CONTACT US</Link>
      </div>
    </header>
  )
}

export default Header