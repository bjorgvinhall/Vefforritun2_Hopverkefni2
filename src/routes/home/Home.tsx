import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';

import Product from '../../components/product/Product';
import Button from '../../components/button/Button';
import Categories from '../categories/Categories';
import './Home.scss';

import { getProducts, getPage } from '../../api/index';
import { IProduct } from '../../api/types';
import Button from '../../components/button/Button';

export default function Home() {
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState({prev: '',self: '',next: ''});
  const [page, setpage] = useState(1);

  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const items = await getProducts(12);
      setProducts(items.items);
      setLinks({
        prev: items._links.prev,
        self: items._links.self,
        next: items._links.next,
      })
      setLoading(false)
    };
    foo();
  }, []);

  async function onSubmitNextPage(link: string) {
    const result = await getPage(link);
    setProducts(result.items);
    setLinks({
      prev: result._links.prev,
      self: result._links.self,
      next: result._links.next,
    })
    setpage(page + 1)
  }

  async function onSubmitPrevPage(link: string){
    const result = await getPage(link);
    setProducts(result.items);
    setLinks({
      prev: result._links.prev,
      self: result._links.self,
      next: result._links.next,
    })
    setpage(page - 1)
  }

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

        <div className="search__button">
            <Button
            ><NavLink className="header__link" activeClassName="header__link--selected" exact to="/categories">Skoða alla flokka
            </NavLink>
            </Button>
          </div>
        <Categories></Categories>
      </div>
    </Fragment>
  );
}

// <NavLink className="header__link" activeClassName="header__link--selected" exact to="/categories">Flokkar</NavLink>

// {data.map((i: any ) => {
//   <Product
//     productDetails={i}
//   ></Product>
// })}