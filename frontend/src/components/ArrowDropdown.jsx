import React, { useState, useEffect, useRef } from 'react';

const ArrowDropdown = ({ options, isOpen, onToggle, storageKey }) => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const savedIndex = localStorage.getItem(storageKey);
    return savedIndex !== null ? Number(savedIndex) : 0;
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(storageKey, selectedIndex);
  }, [selectedIndex, storageKey]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        isOpen
      ) {
        onToggle(); 
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    if (onToggle) onToggle(); 
  };

  return (
    <div className='arrowdropdown_menu' ref={dropdownRef}>
      <div className='selected' onClick={onToggle}>
        {options[selectedIndex]} <i className="fi fi-rr-angle-small-down"></i>
      </div>

      {isOpen && (
        <div className='options'>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className='option'
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArrowDropdown;
