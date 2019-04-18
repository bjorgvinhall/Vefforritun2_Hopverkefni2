import React, { Fragment, useState, useEffect } from 'react';
import { searchInCategory } from '../../api/index';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { Ierrors } from '../../api/types';
import './Search.scss';
import { Redirect } from 'react-router-dom'

export default function Search(props: any) {
  // const { id } = props.match.params;
  const id = 1;
  const [errors, setErrors] = useState([] as Ierrors[]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ searchString: '' });
  const [searched, setSearched] = useState(false);

  async function onSubmit(){
    setLoading(true);
    setErrors([]);
    const result = await searchInCategory(data.searchString, id);

    if (!result.success) {
      setErrors(result.result.errors);
    } else {
      setSearched(true);
    }
    setLoading(false);
  }

  function onSearch(e: any){
    setData({
      ...data,
      searchString: e.target.value,
    });
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
      <div className="search__button">
        <Button 
        onClick={onSubmit}
        >Leita
        </Button>
      </div>
    </div>
  </div>
  );
}
