import React, { useState } from 'react';
import {Link} from 'react-router-dom'

import './Register.scss';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input'
import { registerUser } from '../../api/index';
import { Ierrors } from '../../api/types';
import { Redirect } from 'react-router-dom'

export default function Register(props:any) {
  const [data, setData] = useState({ user: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [errors, setErrors] = useState([] as Ierrors[]);

  async function onSubmit(){
    setLoading(true);
    setErrors([]);
    const result = await registerUser(data.user, data.password, data.email);

    if (!result.success) {
      setErrors(result.result.errors);
    } else {
      setRegistered(true);
    }
    setLoading(false);
  }

  function onChangeUser(e: any){
    setData({
      ...data,
      user: e.target.value,
    });
  }

  function onChangePassword(e: any){
    setData({
      ...data,
      password: e.target.value,
    });
  }

  function onChangeEmail(e: any){
    setData({
      ...data,
      email: e.target.value,
    });
  }

  if(registered){
    return(
      <div className={'register__wrapper'}>
        <h1>Nýskráning</h1>
        <h3 className="register__success">Nýskráning tókst, vinsamlegast skráðu þig inn</h3>
        <Link to="/login" className="register__linkToLogin">Innskráning</Link>
      </div>
    )
  }
  
  return (
    <div className={'register__wrapper'}>
    <h1>Nýskráning</h1>
    {errors && (
          <div className={'errors'}>
            {errors && errors.map((error: any) => (
              <p key={error.field} className={'errors__message'}>{error.field}, {error.error}</p>
            ))}
        </div>
    )}
    <div className="register__form">
    <Input
      label={'Notendanafn:'}
      type={'text'}
      onChange={onChangeUser}>
    </Input>
    <Input
      label={'Lykilorð:'}
      type={'password'}
      onChange={onChangePassword}>
    </Input>
    <Input
    label={'Netfang:'}
    type={'email'}
    onChange={onChangeEmail}>
    </Input>
    </div>

    <div className="register__button">
      <Button 
      onClick={onSubmit}
      >Nýskrá
      </Button>
    </div>
    <Link to="/login" className="register__linkToLogin">Innskráning</Link>
  </div>
  );
}