import { Alert, Button, Image, ImageProps, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors, viewport, viewportV2 } from '../styles/variables'
import { DefaultPageTemplate } from './shared/templates/DefaultPageTemplate'
import { validate, emailValidate } from '../services/ValidationService';
import { forgot } from '../services/UserService';

export default function ForgotPasswordPage() {
  const history = useHistory()

  const [email, setEmail] = useState<string>()

  const submit = async () => {
    if(!validate('Email', email)) return;
    if(!emailValidate(email)) return;

    let data = { email: email};

    const isUpdate = await forgot(data);
    if(isUpdate)
      history.push('/');
  }
  const handleKeyPress = (e: any, target: string) => {
    if(e.key === 'Enter'){
      document.getElementById(target).focus();           
    }
  }
  return (
    <DefaultPageTemplate>
      <S.Container>
        <S.LoginBox> 
          <div>
            <div style={{fontSize: '28px', fontWeight: 'bold'}}>
              Forgot Password
            </div>                  
          </div>  
          <div>
            <div>
              <S.Input maxLength={60} value={email} placeholder="Enter Email" onChange={event => setEmail(event.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'submit')} />
            </div>
            <div style={{marginTop: '20px'}}>
              <S.Button id='submit' onClick={submit}>
                Submit
              </S.Button>
              <Link to="/" style={{color: `${colors.red2}`, float: 'right', marginTop: '10px'}}>Go to Login?</Link>
            </div>
          </div>     
        </S.LoginBox>
      </S.Container>
    </DefaultPageTemplate>
  )
}

const S = {
  Container: styled.div`
    width: 100%;
    justify-content: center;
    margin-top: 10rem;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin-top: 16rem;    
      display: flex;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin-top: 16rem;    
      display: flex;
    }
  `,
  Button: styled(Button)`
    border-radius: 8px;
    background-color: ${colors.red1};
    color: ${colors.white};
    border: none;
    box-shadow: none;
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    height: 40px;

    &:hover,
    &:active,
    &:focus {
      background-color: ${colors.red2};
      color: ${colors.white};
      opacity: 0.8;
      box-shadow: none;
      border: none;
    }
  `,
  Input: styled(Input)`
    border-radius: 5px;
    border: none;
    box-shadow: 1px 1px 5px hsl(0deg 0% 0% / 5%);
    margin-top: 20px;
  `,
  Alert: styled(Alert)`
    border-radius: 8px;
    font-weight: 400;

    .ant-alert-message {
      margin-bottom: 8px;
      font-size: 14px;
    }
  `,
  LoginBox: styled.div`
    width: 100%;
    max-width: 400px;
    height: 200px;
    display: block !important;
    padding: 20px;    
    border: 1px solid #d0d0d1;
    border-radius: 5px;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: 50%;
      display: inline-block !important;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      width: 50%;
      display: inline-block !important;
    }
  `,
  SignupBox: styled.div`
    width: 100%;
    max-width: 400px;
    height: 300px;
    display: block !important;
    padding: 20px;
    background-color: ${colors.red2};
    border: 1px solid #d0d0d1;
    border-radius: 5px;
    color: white;
    text-align: center;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: 50%;
      display: inline-block !important;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      width: 50%;
      display: inline-block !important;
    }
  `
}
