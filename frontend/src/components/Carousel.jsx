import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const images = [
  'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-1-524x617.png',
  'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-2-524x617.png',
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [fade, setFade] = useState(true);
  const {t} = useTranslation()

  const length = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % length);
        setFade(true);
      }, 500);
    }, 15000);

    return () => clearInterval(timer);
  }, [length]);

  const goToNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
      setFade(true);
    }, 50); 
  };

  const goToPrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + length) % length);
      setFade(true);
    }, 50);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 30;
    const y = ((e.clientY - top) / height - 0.5) * 30;
    setTransform({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  return (
    <div className="carousel">
      <button onClick={goToPrev} className="slide">‹</button>

      <div className="inner-carousel">
        <div className={`text-box ${fade ? 'fade-in' : 'fade-out'}`} key={current}>
          <h3>65% {t('Off')}</h3>
          <h1>{t('NewPlant')}</h1>
          <h4>{t('ProniaSlider')}</h4>
          <button>{t('DiscoverNow')}</button>
        </div>


        <div
          className="img-box"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="parallax-layer"
            style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }}
          >
            <img
              src={images[current]}
              alt="carousel"
              className={fade ? 'fade-in' : 'fade-out'}
            />
          </div>
        </div>
      </div>

      <button onClick={goToNext} className="slide">›</button>
  </div>
  );
}

export default Carousel;