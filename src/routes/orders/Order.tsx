import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet';

import './Orders.scss';

import { getOrderInfo } from '../../api/index';
import { IOrder } from '../../api/types';

export default function Order(props: any) {
  const username = localStorage.getItem('username');
  const { id } = props.match.params;
  const { onClick } = props;

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [order, setOrder] = useState([] as IOrder[]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [created, setCreated] = useState('');

  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const items = await getOrderInfo(id);
      console.log(items);
      
      if (items === null) {
        setNotFound(true);
      }

      if (items !== null) {
        setOrder(items.lines);
        setTotal(items.total);
        setName(items.name);
        setAddress(items.address);
        setCreated(items.created);
      }
      setLoading(false)
    };
    foo();
  }, []);

  function klikk(e: any, id: number){
    if(onClick) onClick(id);
  }

  if (notFound) {
    return <Redirect to="/notFound" />
  }

  return (
    <Fragment>
      <Helmet title="Pöntun" />
      <div className="orders">
        {loading && (
          <h2>Sæki vörur...</h2>
        )}
        <h1 className="orders__title">Pöntun #{id}</h1>
        <div className="order__info">
          <div className="order__info__item">
            <p>Nafn</p>
            <p>{name}</p>
          </div>
          <div className="order__info__item">
            <p>Heimilisfang</p>
            <p>{address}</p>
          </div>
          <div className="order__info__item">
            <p>Búin til</p>
            <p>{created}</p>
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
              {username && order.map((orderItem) => (
                <tr className="table__body__row">
                  <td className="table__body__item">
                    <Link to={`/product/${orderItem.product_id}`} onClick={(e: any) => klikk(e, orderItem.product_id)} className="order__link">
                      {orderItem.title}
                    </Link>
                  </td>
                  <td className="table__body__item">{orderItem.price}</td>
                  <td className="table__body__item">{orderItem.quantity}</td>
                  <td className="table__body__item">{orderItem.total}</td>
                </tr>
              ))}
              <tr className="table__body__total">
                <td className="table__body__item">{}</td>
                <td className="table__body__item">{}</td>
                <td className="table__body__item">{}</td>
                <td className="table__body__item">{total} kr.-</td>
              </tr>
            </tbody>        
          </table>        
        </div>

        <Link to="/orders" className="order__link">Aftur í pantanir</Link>
      </div>
    </Fragment>
  );
}