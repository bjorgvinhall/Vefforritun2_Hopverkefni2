import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';

import './Orders.scss';

export default function Orders() {
  const username = localStorage.getItem('username');

  if (!username) {
    return (
      <Fragment>
        <Helmet title="Pantanir" />
        <div className="cart">
          <h1>Vinsamlegast skráðu þig inn til þess að skoða pantanir.</h1>
          <Link to="/login" className="register__linkToLogin">Innskráning</Link>
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Helmet title="Pantanir" />
      <div className="orders">
        <p>orders</p>
      </div>
    </Fragment>
  );
}
