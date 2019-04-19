import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Category.scss';
import { getProductsFromCat, getCategoryDetails, getCategory } from '../../api/index';
import { IProduct, ICategory } from '../../api/types';
import Product from '../../components/product/Product';
import Search from '../../components/search/Search';
import Button from '../../components/button/Button';

export default function Category(props: any) {
  const { id } = props.match.params;

  const [category, setCategory] = useState({} as ICategory);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const category: ICategory = await getCategoryDetails(id);
      if(category === null){
        setNotFound(true);
        return;
      }
      setCategory(category);
      const itemsFromCat = await getCategory(id, 100);
      setProducts(itemsFromCat);
      setLoading(false)
    };
    foo();
  }, []);
 
  async function onSubmitPrev(){
    // todo
  }

  async function onSubmitNext(){
    // todo
  }

  async function searchInCat(){
    // setProducts() og það sem Search klasinn skilar hér inní!
  }

  /*onFetchData={(pageSize, pageIndex)} => {
    // til að fá út blaðsíðunúmer
  } */

  if(notFound) return(
    <Redirect to="/notFound"></Redirect>
  )

  if(loading) return(
    <div className="details">
      <h3>Sæki upplýsingar</h3>
    </div>)

  return (
    <Fragment>
      <div className="home">
        <h1>{category.title}</h1>
        <Search
          onClick={searchInCat}
          id={category.id}
          ></Search>

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

        <div className="page__form">
          <div className="search__button">
            <Button 
              onClick={onSubmitPrev}
              >Fyrri síða
            </Button>
          </div>

          <p>Síða 1</p>

          <div className="search__button">
            <Button 
              onClick={onSubmitNext}
              >Næsta síða
            </Button>
          </div>

       </div>

      </div>
  </Fragment>
  );
}