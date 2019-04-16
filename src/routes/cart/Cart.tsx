import React, { useState, Fragment } from 'react';
import Helmet from 'react-helmet';

import './Cart.scss';
import CartItem from '../../components/cart/Cart';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input'

import { IProduct } from '../../api/types';
import { Ierrors } from '../../api/types';

export default function Cart() {
  const [data, setData] = useState({ name: '', address: '' });
  const [products] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([] as Ierrors[]);

/*   async function onSubmit(){
    setLoading(true);
    setErrors([]);
    const result = await registerUser(data.user, data.password, data.email);

    if (!result.success) {
      await setErrors(result.result);
      setLoading(false);
      return;
    } else {
      //Virkar ekki
      return <Redirect to='/'/>
    }
    setLoading(false);
    
  } */

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
      <div className={'cart'}>
        <div className={'cart__item'}>
          {loading && (
            <h2>Sæki vörur...</h2>
          )}
          {products.map((item) => (
            <CartItem
              onClick={null}
              key={item.id}
              cartItem={item}
            ></CartItem>
          ))}
        </div>
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