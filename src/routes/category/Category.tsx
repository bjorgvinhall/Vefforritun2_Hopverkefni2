import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Category.scss';
import { getCategoryDetails, getCategory, searchInCategory } from '../../api/index';
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
  const [searched, setSearched] = useState(false);

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

  async function onSubmitSearch(){
    setLoading(true);
    setErrors([]);
    const result = await searchInCategory(data.searchString, id);
    console.log('result í search.tsx: ' + result);
    console.log('result.success: ' + (result.success));

    if (!result.success) {
      setErrors(result.result.errors);
    } else {
      setSearched(true);
    }
    console.log('products út frá search bbyyyyy: ' + JSON.stringify(result.result.items));
    setProducts(result.result.items);
    setLoading(false);
    setNotFound(false);
  }

  function onSearch(e: any){
    setData({
      ...data,
      searchString: e.target.value,
    });
  }
  console.log('searchString: ' + data.searchString);
  console.log('category.title: ' + category.title);
 
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
        <Link to={`/products?search=${data.searchString}&category=${category.id}`} className="categorySearch" style={{ textDecoration: 'none', color: '#000' }}>
          <div className="search__button">
            <Button 
            onClick={onSubmitSearch}
            >Leita
            </Button>
          </div>
        </Link>
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