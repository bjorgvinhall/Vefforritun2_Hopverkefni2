import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Category.scss';
import { getProductsFromCat, getCategoryDetails, searchInCategory } from '../../api/index';
import { IProduct, ICategory, Ierrors } from '../../api/types';
import Product from '../../components/product/Product';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

export default function Category(props: any) {
  const { id } = props.match.params;

  const [categories, setCategories] = useState({} as ICategory);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState([] as Ierrors[]);
  const [data] = useState({ searchString: '' });

  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const cat: ICategory = await getCategoryDetails(id);
      if(cat === null){
        setNotFound(true);
        return;
      }
      setCategories(cat);
      const itemsFromCat = await getProductsFromCat(id, 100);
      setProducts(itemsFromCat);
      setLoading(false)
    };
    foo();
  }, []);

  async function onSubmit(){
    setLoading(true);
    setErrors([]);
    const result = await searchInCategory(data.searchString);

    // todo
  }

  function onSearch(e: any){
    // todo
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
        <h1>{categories.title}</h1>

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
        </div>
  </Fragment>
  );
}