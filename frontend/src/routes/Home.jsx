import React, { useState, useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Carousel from '../components/Carousel.jsx';
import ProductList from '../components/ProductList.jsx';
import car from '../assets/icons/car.png';
import card from '../assets/icons/card.png';
import service from '../assets/icons/service.png';
import profile1 from '../assets/images/profile1.webp';
import profile2 from '../assets/images/profile2.webp';
import profile3 from '../assets/images/profile3.webp';
import greenplant1 from '../assets/logos/greenplant1.png';
import greenplant2 from '../assets/logos/greenplant2.png';
import greenplant3 from '../assets/logos/greenplant3.png';
import greenplant4 from '../assets/logos/greenplant4.png';
import greenplant5 from '../assets/logos/greenplant5.png';
import * as api from '../api/api.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [products, setProducts] = useState();
  const { setLoading } = useLoader();
  const { t } = useTranslation();
  const clients = {
    arrows: false,
    dots: true,
    speed: 100,
    slidesToShow: 3,
    swipeToSlide: true,
    responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }
  ]
  };
  
  const greenplant = {
    arrows: false,
    dots: false,
    speed: 100,
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: false,  
    variableWidth: false,
    responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3
      }
    }
  ]
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await api.getProducts();
      console.log(data);
      if (data?.data) {
        setProducts(data.data.slice(0, 8));
      } else if (data.err) {
        alert(data.err);
      }
      setLoading(false);
    };

    document.title = 'Pronia - Plant Store';
    fetchProductsData();

    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);

    return () => clearTimeout(timeout);
  }, []);


  return (
    <div>
      <Carousel />
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
      <div className="products-section">
        <div className="home-title">
          <h1>our products</h1>
        </div>
        <div className="products_filters">
          <div className="filter active">Featured</div>
          <div className="filter">Bestseller</div>
          <div className="filter">Latest</div>
        </div>
        <div className="product-container">
          <ProductList
            products={products}
            setProducts={setProducts}
          />
        </div>
      </div>
      <div className="collections">
        <div className="collection">
          <div className="cactus">
            <div className="text-box">
              <p>{t('CactusCollection')}</p>
              <h1>{t('PotteryPots')} <br/> {t('Plant')}</h1>
              <Link>{t('ShopNow')}</Link>
            </div>
          </div>
          <div className="new">
            <div className="text-box">
              <p>{t('NewCollection')}</p>
              <h1>{t('PlantPort')}</h1>
              <Link>{t('ShopNow')}</Link>
            </div>
          </div>
        </div>
        <div className="collection">
          <div className="new">
            <div className="text-box">
              <p>{t('NewCollection')}</p>
              <h1>{t('PlantPort')}</h1>
              <Link>{t('ShopNow')}</Link>
            </div>
          </div>
          <div className="cactus">
            <div className="text-box">
              <p>{t('CactusCollection')}</p>
              <h1>{t('HangingPots')} <br/> {t('Plant')}</h1>
              <Link>{t('ShopNow')}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="clients">
        <div className="home-title">
          <h1>what say client</h1>
        </div>
        <div className="clients-desc">
          <p>Contrary to popular belief, Lorem Ipsum is not simply random text. <br/> It has roots in a piece of classical Latin literature</p>
        </div>
        <Slider {...clients}>
          <div className='card'>
            <div className="img-box">
              <img src={profile1} alt="profile" />
            </div>
            <div className="text-box">
              <p className='name'>PHOENIX BAKER</p>
              <p className='client'>{t('Client')}</p>
              <p>Lorem ipsum dolor sit amet, conse adipisic elit, sed do eiusmod tempo incididunt ut labore et dolore. magna</p>
            </div>
          </div>
          <div className='card'>
            <div className="img-box">
              <img src={profile2} alt="profile" />
            </div>
            <div className="text-box">
              <p className='name'>PHOENIX BAKER</p>
              <p className='client'>{t('Client')}</p>
              <p>Lorem ipsum dolor sit amet, conse adipisic elit, sed do eiusmod tempo incididunt ut labore et dolore. magna</p>
            </div>
          </div>
          <div className='card'>
            <div className="img-box">
              <img src={profile3} alt="profile" />
            </div>
            <div className="text-box">
              <p className='name'>PHOENIX BAKER</p>
              <p className='client'>{t('Client')}</p>
              <p>Lorem ipsum dolor sit amet, conse adipisic elit, sed do eiusmod tempo incididunt ut labore et dolore. magna</p>
            </div>
          </div>
        </Slider>
      </div>
      <div className="greenplants">
        <Slider {...greenplant} className='greenplant-slider'>
          <div className="img-box">
            <img src={greenplant1} alt="" />
          </div>
          <div className="img-box">
            <img src={greenplant2} alt="" />
          </div>
          <div className="img-box">
            <img src={greenplant3} alt="" />
          </div>
          <div className="img-box">
            <img src={greenplant4} alt="" />
          </div>
          <div className="img-box">
            <img src={greenplant5} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Home;
