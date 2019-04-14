import React, { Fragment } from 'react';
import './Product.scss';
// import { Image } from 'cloudinary-react';

export default function Product(props: any) {
  const { product } = props;

  
  return (
    <div className="product">
      <div className="product__image"> 
        <img className="product__img" src={product.image}></img>
      </div>
      <div className="product__info">
      <div className="product__left">
        <p className="product__title">{product.title}</p>
        <p className="product__category">{product.category_title}</p>
      </div>
      <p className="product__price">{product.price} kr.-</p>
    </div>
    </div>
  );
}
