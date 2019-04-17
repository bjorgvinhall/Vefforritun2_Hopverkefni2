import React, { Fragment, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import './Products.scss';
import Helmet from 'react-helmet';

import Product from '../product/Product';
import Categories from '../../routes/categories/Categories';
import { getProducts, getProductsFromCat } from '../../api/index';
import { IProduct } from '../../api/types';

export default function Products(props: any) {
  const { category, onClick } = props;
  function klikk(e: any, id: number ){
    if(onClick) onClick(id);
  }

  return (
    <Link to={`/categories/${category.id}`} onClick={(e: any) => klikk(e, category.id)} className="products" style={{ textDecoration: 'none', color: '#000' }}>
          <Product>
          </Product>
      </Link>
  );
}