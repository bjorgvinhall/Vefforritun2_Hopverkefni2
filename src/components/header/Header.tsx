import React, { useState, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

export default function Home() {
  const username = localStorage.getItem('username');
  console.log(username);

  function onClickLogout(){
    localStorage.clear();
  }

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__contentTitle">
          <h1 className="header__title">
            <Link className="header__titleLink" to="/">Vefforritunarbúðin</Link>
          </h1>
        </div>
        <div className="header__contentLink">
          <div className="header__contentLinkUpper">
            {username && (
              <Fragment>
                <NavLink className="header__link" exact to="/" as="/logout" onClick={onClickLogout}>{username} (útskrá)</NavLink>
                <NavLink className="header__link" activeClassName="header__link--selected" exact to="/orders">Pantanir</NavLink>
              </Fragment>
            )}
            {!username && (
              <Fragment>
                <NavLink className="header__link" activeClassName="header__link--selected" exact to="/register">Nýskrá</NavLink>
                <NavLink className="header__link" activeClassName="header__link--selected" exact to="/login">Innskrá</NavLink>
              </Fragment>
            )}
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/cart">Karfa</NavLink>
          </div>
          <div className="header__contentLinkLower">
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/">Nýjar vörur</NavLink>
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/categories">Flokkar</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
