import React, { useState } from 'react';

import './Register.scss';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input'



export default function Register(props:any) {
  const [data, setData] = useState({ user: '', password: '', email: '' });
  
  async function onSubmit() {
    // e.preventDefault();
    console.log(data.user);

  }

  function onChangeUser(e: any){
    setData({
      ...data,
      user: e.target.value,
    });
    console.log("e.target", data.user)
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
    label={'Lykilorð:'}>
    </Input>
    <Input
    label={'Netfang:'}>
    </Input>
    </div>

    <div className="register__button">
      <Button 
      onClick={onSubmit}
        >Nýskrá
      </Button>
    </div>
  <p>Innskráning</p>
</div>
  
   
  )
}
