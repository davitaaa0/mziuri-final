import React from 'react';

function Rating({ rating }) {
  const starCount = parseInt(rating, 10) || 0;

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[...Array(starCount)].map((_, i) => (
        <i
          key={i}
          className="fi fi-ss-star"
        ></i>
      ))}
    </div>
  );
}

export default Rating;
