import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ label = "Select an option", value = "", onChange, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontSize: '15px',
        fontWeight: 600,
      }}
    >
      <button
        onClick={toggleDropdown}
        style={{
          backgroundColor: 'transparent',
          border: 0,
          color: 'white',
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        {selected ? selected.label : label}
      </button>
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            minWidth: '160px',
            borderRadius: '5px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 1,
            listStyle: 'none',
            padding: 0,
            margin: '5px 0 0',
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              style={{
                padding: '10px 15px',
                color: 'black',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ABD373'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
