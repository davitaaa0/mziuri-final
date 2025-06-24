import React, { useEffect, useState } from 'react';
import { useLoader } from '../context/LoaderContext';
import { useTranslation } from 'react-i18next';
import RouteBanner from '../components/RouteBanner.jsx';
import signature from '../assets/icons/signature.webp';
import car from '../assets/icons/car.png';
import card from '../assets/icons/card.png';
import service from '../assets/icons/service.png';

function About() {
  const { setLoading } = useLoader();
  const {t} = useTranslation()
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
      });
      document.title = 'Pronia - About';
  }, []);

  return (
    <div>
      <RouteBanner />
      <div className="about">
        <div className="about_content">
          <h2 className="about_title">{t('Our')} <span>{t('Story')}</span></h2>
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
              <h3>{t('FreeShipping')}</h3>
              <p>{t('ShippingDesc')}</p>
            </div>
          </div>

          <div className="service_payment service">
            <div className="img-box">
              <img src={card} alt="card" />
            </div>
            <div className="text-box">
              <h3>{t('SafePayment')}</h3>
              <p>{t('PaymentDesc')}</p>
            </div>
          </div>

          <div className="service_best service">
            <div className="img-box">
              <img src={service} alt="service" />
            </div>
            <div className="text-box">
              <h3>{t('BestServices')}</h3>
              <p>{t('ServicesDesc')}</p>
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

