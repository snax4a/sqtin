import React from 'react';
import './styles/loader.scss';

export default function Loader({ centered, ...restProps }) {
  return (
    <div className={`loader-container ${centered ? 'flex' : ''}`}>
      <svg className="loader" viewBox="0 0 50 50" {...restProps}>
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </div>
  );
}
