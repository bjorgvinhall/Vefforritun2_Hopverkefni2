import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Category.scss';

import { getCategoryDetails, getCategory, searchInCategory } from '../../api/index';

import { IProduct, ICategory, Ierrors } from '../../api/types';
import Product from '../../components/product/Product';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

export default function Category(props: any) {
  const { id } = props.match.params;

  const [category, setCategory] = useState({} as ICategory);
  const [products, setProducts] = useState([] as IProduct[]);
  const [errors, setErrors] = useState([] as Ierrors[]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [page, setPage] = useState(1);

  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const category: ICategory = await getCategoryDetails(id);
      if(category === null){
        setNotFound(true);
        return;
      }
      setCategory(category);
      const itemsFromCat = await getCategory(id, 3);
			console.log("TCL: foo -> itemsFromCat", itemsFromCat)
      setProducts(itemsFromCat.items);
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

  async function onSubmitPage(newPage: number) {
    const categ = await getCategory(id, 3);
    const nextPage = categ._links.next.href;
    const nextPageItems = nextPage.items;
    setProducts(nextPageItems);
    setPage(page + newPage);
  }

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
        {page > 1 && (
            <div className="search__button">
            <Button 
              onClick={() => { onSubmitPage(-1)}}
              >Fyrri síða
            </Button>
          </div>
        )}
          <p>Síða {page}</p>
          <div className="search__button">
            <Button 
              onClick={() => { onSubmitPage(1)}}
              >Næsta síða
            </Button>
          </div>
       </div>
      </div>
  </Fragment>
  );
}