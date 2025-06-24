import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, isOpen, onToggle }) => {
  const [selected, setSelected] = useState(options[0] || null);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    if (onToggle) onToggle();
  };

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

  const filteredOptions = options.filter((opt) => opt !== selected);

  return (
    <div className='dropdown_menu' ref={dropdownRef}>
      <div className='selected' onClick={onToggle}>
        {options[0]}
      </div>

      {isOpen && (
        <div className='options'>
          {filteredOptions.toSpliced(0, 1).map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
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

export default Dropdown;
