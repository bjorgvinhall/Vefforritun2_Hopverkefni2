import React, { useState } from 'react';

import './Register.scss';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input'
import { registerUser } from '../../api/index';
import { Ierrors } from '../../api/types';
import { Redirect } from 'react-router-dom'

export default function Register(props:any) {
  const [data, setData] = useState({ user: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([] as Ierrors[]);

  async function onSubmit(){
    setLoading(true);
    setErrors([]);
    const result = await registerUser(data.user, data.password, data.email);

    if (!result.success) {
      await setErrors(result.result);
      setLoading(false);
      return;
    } else {
      //Virkar ekki
      return <Redirect to='/'/>
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
  
  return (
    <div className={'register__wrapper'}>
    <h1>Nýskráning</h1>
    <div className="register__form">
    <Input
      label={'Notendanafn:'}
      onChange={onChangeUser}>
    </Input>
    <Input
      label={'Lykilorð:'}
      onChange={onChangePassword}>
    </Input>
    <Input
    label={'Netfang:'}
    onChange={onChangeEmail}>
    </Input>
    </div>

    <div className="register__button">
      <Button 
      onClick={onSubmit}
      >Nýskrá
      </Button>
    </div>
  <p>Innskráning</p>
  {/* errors && (
    <div className={'errors'}>
      <ul>
        {console.log(errors)}
        {errors.map((error: any) => (
          <li className={'errors__message'}>{error.error}</li>
        ))}
      </ul>
    </div>
        )*/}
</div>
  )
}
