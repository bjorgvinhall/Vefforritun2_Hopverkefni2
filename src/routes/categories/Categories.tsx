import React, { useState, useEffect } from 'react';
import { ICategory } from '../../api/types';
import {Link} from 'react-router-dom'
import { getCategories } from '../../api/index';
import './Categories.scss';

export default function CategoriesRoute() {
  
  const [categories, setCategories] = useState([] as ICategory[])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const foo = async () => {
      setLoading(true);
      const item = await getCategories();
      setCategories(item.items);
      setLoading(false)
    };
    foo();
  }, []);

  return (
    <div className="categories">
    <h3 className="categories__title">Skoðaðu vöruflokkana okkar</h3>
    <div className="categories__wrapper">
    {loading && (
            <h2>Sæki vörur...</h2>
          )}
    {categories.map((categories) => (
    <Link to={`/categories/${categories.id}`} className="categories__item" style={{textDecoration: 'none', color: '#000'}}>
          <h1 key={categories.id}>
            {categories.title}
          </h1>
          </Link>
        ))}
    </div>
    </div>
  );
}
