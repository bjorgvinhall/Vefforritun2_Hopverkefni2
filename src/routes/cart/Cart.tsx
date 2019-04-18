import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import CartItem from '../../components/cart/Cart';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import './Cart.scss';

import { getProducts, getCart } from '../../api/index';
import { IProduct, ICart } from '../../api/types';

export default function Cart() {
  const [cart, setCart] = useState([] as ICart[]);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: '', address: '' });
  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const items = await getCart();
      setCart(items.lines);
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

  return (
    <Fragment>
      <Helmet title="Karfa" />
      <div className="cart">
          {loading && (
            <h2>Sæki vörur...</h2>
          )}
          {cart.map((product) => (
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

// {data.map((i: any ) => {
//   <Product
//     productDetails={i}
//   ></Product>
// })}