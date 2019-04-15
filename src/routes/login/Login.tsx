import React, { useState } from 'react';

import './Login.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { loginUser } from '../../api/index';
import { any } from 'prop-types';
import { Ierrors } from '../../api/types';

export default function Login() {
  const [data, setData] = useState({user: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([] as Ierrors[]);

  async function onSubmit(){
    setLoading(true);
    const result = await loginUser(data.user, data.password);
    if(!result.success){
      setLoading(false);
      setErrors(result.result);
      console.log(errors);
    }
      setLoading(false);
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
          <ul>
            {console.log("RENDER", errors)}
            {errors && errors.map((error: any) => (
              <li className={'errors__message'}>{error.error}</li>
            ))}
            {/* {errors.length === 1 && (
              <li className={'errors__message'}>{errors[0].error}</li>
            )} */}
          </ul>
        </div>
    )}
    <div className={'login__form'}>
    <Input
    label={'Notendanafn:'}
    onChange={onSubmitUser}>
    </Input>
    <Input
    label={'Lykilorð:'}
    onChange={onSubmitPassword}>
    </Input>
    </div>
    <div className={'login__button'}>
    <Button
    onClick={onSubmit}>
    Skrá inn
    </Button>
    </div>
    <p>Nýskráning</p>
    </div>
  );
}
