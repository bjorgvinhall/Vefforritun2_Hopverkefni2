import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Category.scss';
import { getProductsFromCat, getCategoryDetails, getCategory } from '../../api/index';
import { IProduct, ICategory } from '../../api/types';
import Product from '../../components/product/Product';
import Search from '../../components/search/Search';

export default function Category(props: any) {
  const { id } = props.match.params;

  const [categories, setCategories] = useState({} as ICategory);
  const [products, setProducts] = useState([] as IProduct[]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  // console.log(products) gefur vörur úr röngum flokki

  useEffect(()=>{
    const foo = async () => {
      setLoading(true);
      const cat: ICategory = await getCategoryDetails(id);
      // console.log(cat) er {"id":12,"title":"Computers"}
      if(cat === null){
        setNotFound(true);
        return;
      }
      setCategories(cat);
      const itemsFromCat = await getCategory(id, 100);
      // id hér er rétt ID
      setProducts(itemsFromCat);
      // itemsFromCat gefur okkur vörur úr röngum flokki
      // -> hélt að þetta væri að gulltryggja vörur úr réttum flokki
      setLoading(false)
    };
    foo();
  }, []);
  // console.log(JSON.stringify(products));
  // fyrir utan useEffect fallið er categories {"id":12,"title":"Computers"}, annars tómur hlutur {}

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
        <Search
          onClick={null}>
        </Search>

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