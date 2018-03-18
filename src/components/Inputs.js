import React from 'react';
import './Inputs.css';


export const Text = ({ label, onChange, value }) => (
  <div className="input-group">
    <h3>{label}</h3>
    <input type="text" value={value} onChange={onChange} />
  </div>
);

export const TextArea = ({ label, onChange, value }) => (
  <div className="input-group">
    <h3>{label}</h3>
    <textarea rows="6" value={value} onChange={onChange} />
  </div>
);
