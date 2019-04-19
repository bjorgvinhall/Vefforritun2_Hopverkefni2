import React, { Fragment, useState, useEffect } from 'react';
import { searchInCategory, getCategoryDetails } from '../../api/index';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Product from '../../components/product/Product';
import { Ierrors, ICategory, IProduct } from '../../api/types';
import './Search.scss';
import { Redirect, Link } from 'react-router-dom'

export default function Search(props: any) {
  // const { category, onClick } = props;
  const { id, onClick } = props;

  const [errors, setErrors] = useState([] as Ierrors[]);
  const [category, setCategory] = useState({} as ICategory);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState({ searchString: '' });
  const [searched, setSearched] = useState(false);
  
  function klikk(e: any, id: string){
    if(onClick) onClick(id);
  }
  
  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const category: ICategory = await getCategoryDetails(id);
      if(category === null){
        setNotFound(true);
        return;
      }
      setCategory(category);
    };
    foo();
  }, []);

  async function onSubmit(){
    setLoading(true);
    setErrors([]);
    const result = await searchInCategory(data.searchString, id);
    console.log('result í search.tsx: ' + result);
/*
    if (!result.success) {
      setErrors(result.errors);
    } else {
      setSearched(true);
    }
    setProducts(result.items);
    setLoading(false);
    */
  }

  function onSearch(e: any){
    setData({
      ...data,
      searchString: e.target.value,
    });
  }
  console.log('searchString: ' + data.searchString);
  console.log('category.title: ' + category.title);

  if(searched) {
    return(
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
    )
  }

  return (
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
        <Link to={`/products?search=${data.searchString}&category=${category.title}`} onClick={(e: any) => klikk(e, id)} className="categorySearch" style={{ textDecoration: 'none', color: '#000' }}>
          <div className="search__button">
            <Button 
            onClick={onSubmit}
            >Leita
            </Button>
          </div>
        </Link>
        </div>
      </div>
  );
}