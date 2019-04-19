import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'

import './Login.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { loginUser } from '../../api/index';
import { any } from 'prop-types';
import { Ierrors } from '../../api/types';

export default function Login() {
  const [data, setData] = useState({user: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(null);
  const [errors, setErrors] = useState([] as Ierrors[]);

  async function onSubmit(){
    setLoading(true);
    setErrors([]);
    const result = await loginUser(data.user, data.password);
    if(!result.success){
      setLoading(false);
      setErrors(result.result);
      return;
    }
    // Login successful
    localStorage.setItem('token', result.result.token);
    localStorage.setItem('username', result.result.user.username);
    setLoginSuccessful(result.result.user.username);
  }
  
  if(loginSuccessful){
    return <Redirect to="/" />
  }

  function onSubmitUser(e: any) {
    setData({
      ...data,
      user: e.target.value,
    });
    
  }

  function onSubmitPassword(e: any) {
    setData({
      ...data,
      password: e.target.value,
    });

  }

  return (
    <div className={'login__wrapper'}>
      <h1> Innskráning </h1>
      {errors && (
        <div className={'errors'}>
          {errors && errors.map((error: any) => (
            <p key={error.field} className={'errors__message'}>{error.error}</p>
          ))}
      </div>
      )}
      <div className={'login__form'}>
        <Input
          label={'Notendanafn:'}
          type={'text'}
          onChange={onSubmitUser}>
        </Input>
        <Input
          label={'Lykilorð:'}
          type={'password'}
          onChange={onSubmitPassword}>
        </Input>
      </div>
      <div className={'login__button'}>
        <Button
          onClick={onSubmit}>
          Skrá inn
        </Button>
      </div>
      <Link to="/register" className="login__linkToRegister">Nýskrá</Link>
    </div>
  );
}
