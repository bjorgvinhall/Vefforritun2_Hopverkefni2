import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import './Product.scss';
import { getProductDetails, getProductsFromCat, addToCart } from '../../api/index'
import { IProduct } from '../../api/types';
import Button from '../../components/button/Button';
import Product from '../../components/product/Product'
import { appendFileSync } from 'fs';

export default function ProductRoute(props: any) {
  const { id } = props.match.params
  const username = localStorage.getItem('username');

  const [details, setDetails] = useState({} as IProduct);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [notFound, setNotFound] = useState(false);
  // Sækir upplýsingar um vöru og vörur í sama flokki
  useEffect(()=>{
    const foo = async () => {
      setCartMessage('')
      setLoading(true);
      const item: IProduct = await getProductDetails(id);
      if(item === null){
        setNotFound(true);
        return;
      }
      setDetails(item);
      const moreFromCat = await getProductsFromCat(id, 6);
      setProducts(moreFromCat);
      setLoading(false)
    };
    foo();
  }, []);

  async function onClickHandler(i: number) {
    setCartMessage('');
    setLoading(true);
    const item: IProduct = await getProductDetails(i);
    setDetails(item);
    setLoading(false);
  }

  function onChangeQuantity(e: any) {
    setQuantity(e.target.value)
  }

  async function addToCartHandler() {
    setCartLoading(true);
    setCartMessage('');
    if(quantity < 1) {
      setCartMessage('Vinsamlegast veljið fjölda stærri en 0');
      setCartLoading(false)
      return;
    }
    const result = await addToCart(details.id, quantity)
    if(result.success){
      setCartMessage(`${quantity} ${quantity == 1 ? 'vöru' : 'vörum'} bætt við!`);
    } else {
      setCartMessage('Villa kom upp')
    }
    setCartLoading(false);
    setQuantity(0)
  }

  if(notFound) return(
    <Redirect to="/notFound"></Redirect>
  )

  if(loading) return(
      <div className="details">
        <h3>Sæki upplýsingar</h3>
      </div>
  )

  return (
    <Fragment>
    <div className="details">
      <div className="details__image"> 
        <img className="details__img" src={details.image}></img>
      </div>
      <div className="details__info">
        <h3 className="details__title">{details.title}</h3>
        <p className="details__category">Flokkur: {details.category_title}</p>
        <p className="details__price">Verð: {details.price} kr.-</p>
        {typeof details.description === 'string' && (details.description.split('\n').map((item, key) => (
          <p className="details__description" key={key}>{item}</p> ))
        )}
        {username && !cartLoading && (
          <div className="details__lower">
            <span>Fjöldi</span>
            <input className="details__input" onChange={onChangeQuantity} type="number" min="1"></input>
            <Button
              onClick={addToCartHandler}
              small={true}
              children="Bæta við körfu"
              // TODO onclick handler til að bæta í körfu + loading state
            ></Button>
            {cartMessage && (
              <span className="details__cartMessage">{cartMessage}</span>
            )}
          </div>
        )}
        {cartLoading && (
          <div className="details__lower">
            <span>Bæti við körfu...</span>
          </div>            
        )}
      </div>
    </div>
    <div className="more">
      <h3>Meira úr {details.category_title}</h3>
      <div className="more__products">
        {products.map((product) => (
          <Product
            onClick={onClickHandler}
            key={product.id}
            product={product}
          ></Product>
        ))}
      </div>
    </div>
    </Fragment>
  );
}
