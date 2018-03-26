import React from 'react';
import './ContactCardField.css';

const ContactCardField = ({ label, edit, value, onChange}) => (
  <div className="contact-card__field">
    <label className="contact-card__field__label">
      {label}
    </label>
    {!edit && <label className="contact-card__field__value">
      {value}
    </label>}
    {edit && <input value={value||''} onChange={onChange} />}
  </div>
);

export default ContactCardField;
