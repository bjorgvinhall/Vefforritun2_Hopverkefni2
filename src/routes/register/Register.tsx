import React from 'react';

import './Register.scss';

export default function Register() {
  return (
    <div className="register">
      <h1 className="register__title">
        Nýskráning
      </h1>
      <div className="register__form">
      <div className="register__field">
      <label className="register__label">
      Notendanafn:
      </label>
      <input className="register__input" type="text"></input>
      </div>
      <div className="register__field">
      <label className="register__label">
      Lykiorð:
      </label>
      <input className="register__input" type="text"></input>
      </div>
      <div className="register__field">
      <label className="register__label">
      Email:
      </label>
      <input className="register__input" type="text"></input>
      </div> 
        <div className="register__button">
        <button>Nýskrá</button>
        </div>
        <p>Innskráning</p>
      </div>
  
    </div>
  )
}
