import React, { Fragment, useState, useEffect } from 'react';
import './Product.scss';
import { getProductDetails, getProductsFormCat } from '../../api/index'
import { IProduct } from '../../api/types';
import Button from '../../components/button/Button';
import Product from '../../components/product/Product'
import { AnyAaaaRecord } from 'dns';

export default function ProductRoute(props: any) {
  const { id } = props.match.params

  // TODO loading state?
  const [details, setDetails] = useState({} as IProduct);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  // Sækir upplýsingar um vöru
  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const item: IProduct = await getProductDetails(id);
      setDetails(item);
      setLoading(false)
    };
    foo();
  }, []);
  // Sækir vörur í sama flokki
  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const items = await getProductsFormCat(id, 6);
      setProducts(items);
      setLoading(false)
    };
    foo();
  }, []);

  async function onClickHandler(i: number) {
    setLoading(true);
    const item: IProduct = await getProductDetails(i);
    setDetails(item);
    setLoading(false);
  }

  if(loading) return(
      <div className="details">
        <h3>Sæki upplýsingar</h3>
      </div>)

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
        <div className="details__lower">
          <span>Fjöldi</span>
          <input className="details__input" type="textarea"></input>
          <Button
            small={true}
            children="Bæta við körfu"
            // TODO onclick handler til að bæta í körfu + loading state
          ></Button>
        </div>
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
