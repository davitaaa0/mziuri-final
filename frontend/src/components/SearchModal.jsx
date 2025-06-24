import React, { useState, useEffect } from "react";

function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}><i className="fi fi-rr-search"></i></button>
      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button
              aria-label="Close modal"
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <p>Start typing to search...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchModal;
