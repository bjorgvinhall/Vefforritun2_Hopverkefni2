import React, { useState } from 'react';
import './Cart.scss';
import {Link, Redirect} from 'react-router-dom'

import { updateCart, removeFromCart } from '../../api/index';
import Button from '../../components/button/Button';
import { IProduct } from '../../api/types';
import { async } from 'q';

export default function Cart(props: any) {
  const { product, onClick, onChange } = props;
  
  const [details, setDetails] = useState(product);
  const [cartLoading, setCartLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [quantity, setQuantity] = useState(product.quantity);
  
  function onCartChange() {
    onChange();
  }

  function klikk(e: any, id: number){
    if(onClick) onClick(id);
  }

  function onChangeQuantity(e: any) {
    setQuantity(e.target.value)
  }

  async function updateCartHandler() {
    setCartLoading(true);
    setCartMessage('');
    if(quantity < 1) {
      setCartMessage('Vinsamlegast veljið fjölda stærri en 0');
      setCartLoading(false)
      return;
    }
    const result = await updateCart(product.id, quantity);
    
    if(result.success){
      setCartMessage('Karfa uppfærð!');
      setDetails(result.result)
    } else {
      setCartMessage('Villa kom upp')
    }
    setCartLoading(false);
    onCartChange();
  }

  async function removeFromCartHandler() {
    setCartMessage('');
    const result = await removeFromCart(product.id);
    if(result){
      setCartMessage('Karfa uppfærð!');
      setDeleted(true)
    } else {
      setCartMessage('Villa kom upp')
    }
    setCartLoading(false);
    onCartChange()
  }

  return (
    <Link to={`/cart`}  className={deleted ? "cart__item--deleted" : "cart__item"} style={{ textDecoration: 'none', color: '#000' }}>
      
      <div className="cart__image"> 
        <img className="cart__img" src={details.image}></img>
      </div>
      <div className="cart__info">
        <Link to={`/product/${details.product_id}`} onClick={(e: any) => klikk(e, details.product_id)} className="cart__title">
          <p>{details.title}</p>
        </Link>
        <p className="cart__price">Verð: {details.price} kr.-</p>
      </div>

      <div className="cart__form">
        <div className="cart__form__top">
          <span className="cart__form__number">Fjöldi:</span>
          <input className="cart__form__input" onChange={onChangeQuantity} type="number" min="1" value={quantity}></input>
          <Button
            onClick={updateCartHandler}
            small={true}
            children="Uppfæra"
            // TODO onclick handler til að bæta í körfu + loading state
          ></Button>
          {cartMessage && (
            <span className="cart__form__top__cartMessage">{cartMessage}</span>
          )}
        </div>
        <div className="cart__form__middle">
          <p>Samtals: {details.total} kr.-</p>
        </div>
        <div className="cart__form__bottom">
          <Button
            onClick={removeFromCartHandler}
            small={true}
            children="Eyða línu"
            // TODO onclick handler til að bæta í körfu + loading state
          ></Button>
        </div>
      </div>
    </Link>
  );
}