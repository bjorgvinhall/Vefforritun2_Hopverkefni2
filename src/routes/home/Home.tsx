import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import Product from '../../components/product/Product';
import Categories from '../categories/Categories';
import './Home.scss';

import { getProducts } from '../../api/index';
import { IProduct } from '../../api/types';

export default function Home() {
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const items = await getProducts(12);
      setProducts(items.items);
      setLoading(false)
    };
    foo();
  }, []);

  return (
    <Fragment>
      <Helmet title="Forsíða" />
      <div className="home">
        <h1>Nýjar vörur</h1>
        <div className="products">
          {loading && (
            <h2>Sæki vörur...</h2>
          )}
          {products.map((product) => (
            <Product
              onClick={null}
              key={product.id}
              product={product}
            ></Product>
          ))}
        </div>
        <p>TODO, gera categories og birta hér</p>
        <Categories></Categories>
      </div>
    </Fragment>
  );
}

// {data.map((i: any ) => {
//   <Product
//     productDetails={i}
//   ></Product>
// })}