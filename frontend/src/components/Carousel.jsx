import React, { useState, useEffect } from 'react';

const images = [
  'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-1-524x617.png',
  'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-2-524x617.png',
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [fade, setFade] = useState(true);

  const length = images.length;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 30;
    const y = ((e.clientY - top) / height - 0.5) * 30;
    setTransform({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

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

  const goToNext = () => setCurrent((current + 1) % length);
  const goToPrev = () => setCurrent((current - 1 + length) % length);

  return (
    <div className="carousel">
      <button
        onClick={goToPrev}
        className="slide"
      >
        ‹
      </button>
      <div className="inner-carousel">
        <div className={`text-box ${fade ? 'fade-in' : 'fade-out'}`}>
          <h3>65% OFF</h3>
          <h1>NEW PLANT</h1>
          <h4>Pronia, With 100% Natural, Organic & Plant Shop.</h4>
          <button>Discover Now</button>
        </div>
        <div
          className="img-box"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={images[current]}
            alt="carousel"
            style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }}
            className={`carousel-img ${fade ? 'fade-in' : 'fade-out'}`}
          />
        </div>
      </div>
      <button
        onClick={goToNext}
        className="slide"
      >
        ›
      </button>
    </div>
  );
}

export default Carousel;
