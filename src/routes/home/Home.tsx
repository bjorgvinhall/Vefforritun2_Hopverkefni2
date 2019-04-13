import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import Product from '../product/Product';
import { getProducts } from '../../api/index';
import './Home.scss';
import { IProduct } from '../../api/types';

export default function Home() {
  const [products, setProducts] = useState([] as IProduct[]);
  useEffect(()=>{
    const foo = async () => {
      const items = await getProducts();
      setProducts(items.items);
    };
    foo();
  }, []);

  return (
    <Fragment>
      <Helmet title="Forsíða" />
      <h1>Nýjar vörur</h1>
      <div className="products">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
          ></Product>
        ))}
      </div>
    </Fragment>
  );
}

// {data.map((i: any ) => {
//   <Product
//     productDetails={i}
//   ></Product>
// })}