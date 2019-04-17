import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import './Cart.scss';
import CartItem from '../../components/cart/Cart';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input'

import { getCart } from '../../api/index';
import { IProduct, ICart, Ierrors } from '../../api/types';

export default function Cart() {
  const [data, setData] = useState({ name: '', address: '' });
  
  const [cart, setCart] = useState([] as ICart[]);
  const [errors, setErrors] = useState([] as Ierrors[]);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const foo = async () => {      
      setLoading(true);
      const items = await getCart();
      console.log('Hér: ', items);

      /* if (items === null) {
        return (
          <p>Karfan er tóm :(</p>
        );
      } */

      setCart(items.items);
      setLoading(false);
    };
    foo();
  }, []);


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
      <div className="cart">
        <h1>Karfa</h1>
        <div className="cart__item">
          {loading && (
            <h2>Sæki vörur...</h2>
          )}
          {products.map((item) => (
            <p>{item.title}</p>
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