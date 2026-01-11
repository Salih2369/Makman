import React from 'react';

export const SkeletonBox = ({ className = '', style = {} }) => {
  return <div className={`sk sk-box ${className}`} style={style} />;
};

export const SkeletonText = ({ lines = 2 }) => {
  return (
    <div className="sk sk-text">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="sk-line" style={{ width: `${90 - i * 12}%` }} />
      ))}
    </div>
  );
};
