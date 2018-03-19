import './Inputs.css';
import React from 'react';

export const Text = ({ label, value, onChange, edit, rowSpan=1 }) => (
  <div className={`input-group row-span-${rowSpan} ${edit ? 'edit' : ''}`}>
    <label>{label}</label>
    {edit && <input value={value} onChange={onChange} /> }
    {!edit && <div className="input-group__value">{value}</div>}
  </div>
);

export const TextArea = ({ label, value, onChange, edit, rowSpan=2 }) => (
  <div className={`input-group row-span-${rowSpan} ${edit ? 'edit' : ''}`}>
    <label>{label}</label>
    {edit && <textarea value={value} onChange={onChange} /> }
    {!edit && <div className="input-group__value">{value}</div>}
  </div>
);
