import React from 'react';
import './Product.scss';
import {Link} from 'react-router-dom'

export default function Product(props: any) {
  const { product, onClick } = props;
  function klikk(e: any, id: number){
    if(onClick) onClick(id);
  }
  return (
    <Link to={`/product/${product.id}`} onClick={(e: any) => klikk(e, product.id)} className="product" style={{ textDecoration: 'none', color: '#000' }}>
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
    </Link>
  );
}