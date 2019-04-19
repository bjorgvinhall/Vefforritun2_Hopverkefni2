import PropTypes from 'prop-types';
import React from 'react';

import './Input.scss';


export default function Input(props:any) {
  const { label, type, onChange } = props; 
  return (
    <div className = "register">
      <legend className = "register__label">{label}</legend>
      <input type={type} onChange={onChange}/>
    </div>
  );
}