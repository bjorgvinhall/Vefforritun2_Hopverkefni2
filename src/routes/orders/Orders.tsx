import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';

import './Orders.scss';

import { getOrders } from '../../api/index';
import { IOrders } from '../../api/types';

export default function Orders(props: any) {
  const username = localStorage.getItem('username');

  const { onClick } = props;

  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [orders, setOrders] = useState([] as IOrders[]);

  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const items = await getOrders();
      if (items !== null) {
        setOrders(items.items);
      } 
      if (items.items.length === 0) {
        setEmpty(true);
      }
      setLoading(false)
    };
    foo();
  }, []);

  function klikk(e: any, id: number){
    if(onClick) onClick(id);
  }

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
        {loading && (
          <h2>Sæki vörur...</h2>
        )}
        <h1 className="orders__title">Þínar pantanir</h1>

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
              {username && orders.map((order) => (
                <tr>
                  <td className="table__body__item"><Link to={`/orders/${order.id}`} onClick={(e: any) => klikk(e, order.id)} className="table__body__link">Pöntun #{order.id}</Link></td>
                  <td className="table__body__item">{order.name}</td>
                  <td className="table__body__item">{order.address}</td>
                  <td className="table__body__item">{order.created}</td>
                </tr>
              ))}
            </tbody>        
          </table>        
        </div>
      </div>
    </Fragment>
  );
}

