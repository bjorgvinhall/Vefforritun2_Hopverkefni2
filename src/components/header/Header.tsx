import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

export default function Home() {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">
          <Link className="header__titleLink" to="/">Vefforritunarbúðin</Link>
        </h1>
        <NavLink className="header__link" activeClassName="header__link--selected" exact to="/register">Nýskrá</NavLink>
        <NavLink className="header__link" activeClassName="header__link--selected" exact to="/login">Innskrá</NavLink>
        <NavLink className="header__link" activeClassName="header__link--selected" exact to="/cart">Karfa</NavLink>
        <NavLink className="header__link" activeClassName="header__link--selected" exact to="/products">Nýjar vörur</NavLink>
        <NavLink className="header__link" activeClassName="header__link--selected" exact to="/categories">Flokkar</NavLink>
      </div>
    </header>
  );
}
