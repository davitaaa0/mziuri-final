import React, { useRef, useState, useEffect } from 'react';
import DropHeader from './DropHeader';

function Main({ children }) {
  const headerRef = useRef();
  const [isDropVisible, setIsDropVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDropVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  return (
    <>
      <div ref={headerRef} /> 

      <DropHeader isVisible={isDropVisible} />

      <main>{children}</main>
    </>
  );
}

export default Main;