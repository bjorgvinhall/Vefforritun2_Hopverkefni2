import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';

import './Orders.scss';

export default function Order() {

  return (
    <Fragment>
      <Helmet title="Pantanir" />
      <div className="orders">
        <h1 className="orders__title" >Pöntun #{}</h1>
        <div className="order__info">
          <div className="order__info__item">
            <p>Nafn</p>
            <p>{}</p>
          </div>
          <div className="order__info__item">
            <p>Heimilisfang</p>
            <p>{}</p>
          </div>
          <div className="order__info__item">
            <p>Búin til</p>
            <p>{}</p>
          </div>
        </div>
        <div className="orders__table">
          <table className="table">
            <thead className="table__head">
              <tr>
                <th className="table__head__item">Vara</th>
                <th className="table__head__item">Verð</th>
                <th className="table__head__item">Fjöldi</th>
                <th className="table__head__item">Samtals</th>
              </tr>
            </thead>
            <tbody className="table__body">
              <tr>
                <td className="table__body__item">{}</td>
                <td className="table__body__item">{}</td>
                <td className="table__body__item">{}</td>
                <td className="table__body__item">{}</td>
              </tr>
            </tbody>        
          </table>        
        </div>

        <Link to="/orders" className="order__link">Aftur í pantanir</Link>
      </div>
    </Fragment>
  );
}
