import React, { useEffect, useState } from 'react';
import { useLoader } from '../context/LoaderContext';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import RouteBanner from '../components/RouteBanner.jsx';
import signature from '../assets/icons/signature.webp';
import car from '../assets/icons/car.png';
import card from '../assets/icons/card.png';
import service from '../assets/icons/service.png';

function About() {
  const [state, setState] = useState();
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
      <div className="about">
        <div className="about_content">
          <h2 className="about_title">Our <span>Story</span></h2>
          <p className="about_desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim <br /> veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate <br /> velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim <br /> id est
            laborum. Sed ut perspiciatis.
          </p>
          <div className="about-signature">
            <img src={signature} alt="Signature" />
          </div>
        </div>

        <div className="services">
          <div className="service_shipping service">
            <div className="img-box">
              <img src={car} alt="car" />
            </div>
            <div className="text-box">
              <h3>Free Shipping</h3>
              <p>Capped at $319 per order</p>
            </div>
          </div>

          <div className="service_payment service">
            <div className="img-box">
              <img src={card} alt="card" />
            </div>
            <div className="text-box">
              <h3>Safe Payment</h3>
              <p>With our payment gateway</p>
            </div>
          </div>

          <div className="service_best service">
            <div className="img-box">
              <img src={service} alt="service" />
            </div>
            <div className="text-box">
              <h3>Best Services</h3>
              <p>Friendly & Supper Services</p>
            </div>
          </div>
        </div>

        <div className="banner">
          <div className="banner_container">
            <div className="banner_item">
              <div className="popup_btn">
                <a className="popup_video wave-btn" href="https://player.vimeo.com/video/172601404?autoplay=1" target="_blank" rel="noopener noreferrer">
                  <span></span>
                  <span></span>
                  <span></span>
                  <div className="icon">
                    <i className="fi fi-rr-play"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

