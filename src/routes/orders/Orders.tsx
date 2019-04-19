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
        <h1 className="orders__title" >Þínar pantanir</h1>

        <div className="orders__table">
          <table className="table">
            <thead className="table__head">
              <tr>
                <th className="table__head__item">Pöntun</th>
                <th className="table__head__item">Nafn</th>
                <th className="table__head__item">Heimilsfang</th>
                <th className="table__head__item">Búin til</th>
              </tr>
            </thead>
            <tbody className="table__body">
              <tr>
                <td className="table__body__item"></td>
                <td className="table__body__item"></td>
                <td className="table__body__item"></td>
                <td className="table__body__item"></td>
              </tr>
            </tbody>        
          </table>        
        </div>
      </div>
    </Fragment>
  );
}

