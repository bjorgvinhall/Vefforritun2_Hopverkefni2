import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';

import CartItem from '../../components/cart/Cart';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import './Cart.scss';

import { getProducts, getCart } from '../../api/index';
import { IProduct, ICart } from '../../api/types';

export default function Cart() {
  const username = localStorage.getItem('username');

  const [cart, setCart] = useState([] as ICart[]);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false)
  const [data, setData] = useState({ name: '', address: '' });

  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const items = await getCart();
      console.log(items);
      if (items.lines.length === 0) {
        console.log('Halallala');
        
        setEmpty(true);
      }
      if (items !== null) {
        setCart(items.lines);
      } 
      setLoading(false)
    };
    foo();
  }, []);

  function onChangeName(e: any){
    setData({
      ...data,
      name: e.target.value,
    });
  }

  function onChangeAddress(e: any){
    setData({
      ...data,
      name: e.target.value,
    });
  }
  
  // skoða hvort notandi sé skráður inn
  if (!username) {
    return (
      <Fragment>
        <Helmet title="Karfa" />
        <div className="cart">
          <h1>Vinsamlegast skráðu þig inn til þess að skoða körfu.</h1>
          <Link to="/login" className="register__linkToLogin">Innskráning</Link>
        </div>
      </Fragment>
    );
  } 
  // skoða hvort karfan sé tóm
  else if (empty) {
    return (
      <Fragment>
      <Helmet title="Karfa" />
      <div className="cart">
        <h1>Karfan er tóm</h1>
        <Link to="/" className="register__linkToLogin">Aftur á forsíðu</Link>
      </div>
    </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Helmet title="Karfa" />
        <div className="cart">
          {loading && (
            <h2>Sæki vörur...</h2>
          )}
          {username && cart.map((product) => (
            <CartItem
            onClick={null}
            key={product.id}
            product={product}
          ></CartItem>
          ))}
        </div>
        <div className={'shipping'} >
          <h2 className={'shipping__header'}>Senda inn pöntun</h2>
          <div className={'shipping__form'}>
            <Input
              label={'Nafn:'}
              onChange={onChangeName}>
            </Input>
            <Input
              label={'Heimilisfang:'}
              onChange={onChangeAddress}>
            </Input>      
          </div>
          <div className="shipping__button">
            <Button 
              // onClick={onSubmit}
            >
              Senda inn pöntun
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}