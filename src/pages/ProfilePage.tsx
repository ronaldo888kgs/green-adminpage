import { Button, Input } from 'antd'
import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { colors } from '../styles/variables'
import {AppContext} from '../contexts';
import { updateProfile } from '../services/UserService';
import { validate, emailValidate } from '../services/ValidationService';
import { TablePageTemplate } from './shared/templates/TablePageTemplate'

export default function ProfilePage() {
  const {user, setUser} = useContext(AppContext);
  const [email, setEmail] = useState(user.email)
  const [privatekey, setPrivatekey] = useState(user.private_key)
  // const [publickey, setPublickey] = useState(user.public_key)
  const [phone, setPhone] = useState(user.phone)
  const [paypal, setPaypal] = useState(user.paypal)

  const handleKeyPress = (e: any, target: string) => {
    if(e.key === 'Enter'){
      document.getElementById(target).focus();           
    }
  }

  const handleSubmit = async () => {
    if(!validate('Email', email)) return;
    if(!emailValidate(email)) return;
    if(!validate('Private Key', privatekey)) return;
    // if(!validate('Public Key', publickey)) return;
    if(!validate('Paypal Address', paypal)) return;
    if(!emailValidate(paypal)) return;

    let data = {email: email, private_key: privatekey, phone: phone, paypal: paypal};
    const admindata = await updateProfile(data);
    if(admindata != {}){    
      setUser({
        authenticated: true,
        email: admindata['email'],
        phone: admindata['phone'],
        private_key: admindata['private_key'],
        public_key: admindata['public_key'],
        paypal: admindata['paypal']
      })
    }
  }
  
  return (
    <TablePageTemplate>
      <header>General Settings</header>
      <div style={{width: '100%', padding: '7px', borderRadius: '5px', cursor: 'pointer'}}>
        <S.InputDiv>
          Email
          <S.Input maxLength={60} id='email' value={email} placeholder="Enter Email" onChange={(event:any) => setEmail(event.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'privatekey')} />
        </S.InputDiv>
        <S.InputDiv>
          Private Key
          <S.Input maxLength={60} id='privatekey' value={privatekey} placeholder="Enter Private Key of your Wallet" onChange={(event:any) => setPrivatekey(event.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'phone')} />
        </S.InputDiv>
        <S.InputDiv>
          Phone Number
          <S.Input maxLength={60} id='phone' value={phone} placeholder="Enter Phone Number" onChange={(event:any) => setPhone(event.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'paypal')} />
        </S.InputDiv>
        <S.InputDiv>
          Paypal Address
          <S.Input maxLength={60} id='paypal' value={paypal} placeholder="Enter Paypal Address" onChange={(event:any) => setPaypal(event.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'update')} />
        </S.InputDiv>
      </div>
      <div style={{width: '100%'}}>
        <S.Button id='update' onClick={handleSubmit}>
          Save
        </S.Button>
      </div>
    </TablePageTemplate>
  )
}

export const S = {
  InputDiv: styled.div `
    width: 100%;
    padding: 10px 20px 10px 20px;
    display: inline-block;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: 50%;
    }
  `,
  Input: styled(Input) `
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${props=>props.theme.gray['4']};
    background-color: ${props=>props.theme.gray['1']};
    background-clip: padding-box;
    border: 1px solid ${props=>props.theme.gray['2']};
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    `,
  Button: styled(Button)`
    display: inline-block !important;
    margin-left: 27px !important;
    margin-bottom: 20px;
    background-color: ${colors.red1};
    color: ${colors.white};
    border-radius: 5px !important;
    padding: 3px 15px 5px 15px !important;
    cursor: pointer !important;

    &:hover,
    &:active,
    &:focus {
      background-color: ${colors.red2};
      opacity: 0.8;
    }
  `
}
