import React, { useState, useEffect } from 'react'

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
        <a 
          onClick={scrollToTop}
          className={`scroll-to-top ${showButton ? 'show' : ''}`}
        >
          <i className="fi fi-rr-arrow-small-up"></i>
        </a>
    </div>
  )
}

export default ScrollToTop