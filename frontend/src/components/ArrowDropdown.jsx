import React, { useState } from 'react';

const ArrowDropdown = ({ options, isOpen, onToggle }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen();
  };

  return (
    <div className='arrowdropdown_menu'>
      <div
        className='selected'
        onClick={onToggle}
      >
        {selected || options[0]} <i className="fi fi-rr-angle-small-down"></i>
      </div>

      {isOpen && (
        <div className='options'>
          {options.map((option, index) => (
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

export default ArrowDropdown;
