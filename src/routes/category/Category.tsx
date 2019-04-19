import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Category.scss';

import { getProductsFromCat, getCategoryDetails, getCategory, searchInCategory } from '../../api/index';

import { IProduct, ICategory, Ierrors } from '../../api/types';
import Product from '../../components/product/Product';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

export default function Category(props: any) {
  const { id, onClick } = props.match.params;

  const [category, setCategory] = useState({} as ICategory);
  const [products, setProducts] = useState([] as IProduct[]);
  const [errors, setErrors] = useState([] as Ierrors[]);
  const [data, setData] = useState({ searchString: '' });
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchString, setSearchString] = useState('');


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

  function onSearch(e: any) {
    setSearchString(e.target.value)
  }

  async function onSubmit() {
    setLoading(true);
    const result = await searchInCategory(searchString, id);

    if (!result.success) {
      setErrors(result.result.errors);
    }
    setProducts(result.result.items);
    setLoading(false);
  }

 
  async function onSubmitPrev(){
    // todo
  }

  async function onSubmitNext(){
    // todo
  }

  async function searchInCat(){
    // setProducts(x) og x = það sem Search klasinn skilar hér inní!
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
        {/* <Search
          onClick={searchInCat}
          id={category.id}
          ></Search> */}
        <div className={'search__wrapper'}>
        {errors && (
          <div className={'errors'}>
            {errors && errors.map((error: any) => (
              <p key={error.field} className={'errors__message'}>{error.field}, {error.error}</p>
            ))}
          </div>
        )}
        <div className="search__form">
          <Input
            label={'Leita:'}
            onChange={onSearch}>
          </Input>
          <div className="search__button">
            <Button 
            onClick={onSubmit}
            >Leita
            </Button>
          </div>
        </div>
      </div>
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