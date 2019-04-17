import React from 'react';
import './Cart.scss';
import {Link} from 'react-router-dom'

import Button from '../../components/button/Button';

export default function Cart(props: any) {
  const { cartItem, onClick } = props;
  
  function klikk(e: any, id: number){
    if(onClick) onClick(id);
  }

  return (
    <Link to={`/cart`} onClick={(e: any) => klikk(e, cartItem.id)} className="product" style={{ textDecoration: 'none', color: '#000' }}>
      <div className="cart__image"> 
        <img className="cart__img" src={cartItem.image}></img>
      </div>
      <div className="cart__info">
        <h3 className="cart__title">{cartItem.title}</h3>
        <p className="cart__text">Verð: {cartItem.price} kr.-</p>
      </div>
      <div className="cart__form">
        <div className="cart__form__top">
          <span>Fjöldi</span>
          <input className="cart__form__input" type="textarea"></input>
          <Button
            small={true}
            children="Uppfæra"
            // TODO onclick handler til að bæta í körfu + loading state
          ></Button>
        </div>
        <div className="cart__form__middle">
          <p>Samtals: {cartItem.price} kr.-</p>
        </div>
        <div className="cart__form__bottom">
          <Button
            small={true}
            children="Eyða línu"
            // TODO onclick handler til að bæta í körfu + loading state
          ></Button>
        </div>
      </div>
    </Link>
  );
}