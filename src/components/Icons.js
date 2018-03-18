import './Icons.css';
import React from 'react';

export const Arrow = ({ direction }) => (
  <div className={`icon-arrow ${direction || ''}`}>
    <div className="icon-arrow__strokes">
      <div />
      <div />
      <div />
    </div>
  </div>
);
