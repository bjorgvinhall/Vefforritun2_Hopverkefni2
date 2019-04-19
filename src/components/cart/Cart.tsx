import React, { useState } from 'react';
import './Cart.scss';
import {Link} from 'react-router-dom'

import { updateCart, removeFromCart } from '../../api/index';
import Button from '../../components/button/Button';
import { IProduct } from '../../api/types';
import { async } from 'q';

export default function Cart(props: any) {
  const { product, onClick } = props;
  
  const [details, setDetails] = useState({} as IProduct);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [quantity, setQuantity] = useState(0);

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
    const result = await updateCart(details.id, quantity);
    
    if(result.success){
      setCartMessage('Karfa uppfærð!');
    } else {
      setCartMessage('Villa kom upp')
    }

    setCartLoading(false);
    setQuantity(0)
  }

  async function removeFromCartHandler() {
    setCartMessage('');
    const result = await removeFromCart(product.id);
    if(result.success){
      setCartMessage('Karfa uppfærð!');
    } else {
      setCartMessage('Villa kom upp')
    }

    setCartLoading(false);
  }

  return (
    <Link to={`/cart`}  className="cart__item" style={{ textDecoration: 'none', color: '#000' }}>
      
      <div className="cart__image"> 
        <img className="cart__img" src={product.image}></img>
      </div>
      <div className="cart__info">
        <Link to={`/product/${product.product_id}`} onClick={(e: any) => klikk(e, product.product_id)} className="cart__title">
          <p>{product.title}</p>
        </Link>
        <p className="cart__price">Verð: {product.price} kr.-</p>
      </div>

      <div className="cart__form">
        <div className="cart__form__top">
          <span>Fjöldi:</span>
          <input className="cart__form__input" onChange={onChangeQuantity} type="number" min="1" value={product.quantity}></input>
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
          <p>Samtals: {product.price} kr.-</p>
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