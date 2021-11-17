import { Alert, Button, Image, ImageProps, Input } from 'antd'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { colors, viewport, viewportV2 } from '../styles/variables'
import { DefaultPageTemplate } from './shared/templates/DefaultPageTemplate'
import { validate, emailValidate } from '../services/ValidationService';
import { login } from '../services/UserService';
import { AppContext } from '../contexts'

export default function LoginPage() {
  const history = useHistory()
  const location = useLocation()
  const { setUser } = useContext(AppContext)
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const submitLogin = async () => {
    if(!validate('Email', email)) return;
    if(!emailValidate(email)) return;
    if(!validate('Password', password)) return;

    let data = {email: email, password: password};

    const admindata = await login(data);
    if(admindata != ''){
      setUser({
        authenticated: true,
        email: admindata['email'],
        phone: admindata['phone'],
        private_key: admindata['private_key'],
        public_key: admindata['public_key'],
        paypal: admindata['paypal']
      })
      history.push('/')
    }    
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
              Login
            </div>            
            <div>
              Sign In to your Admin Panel
            </div>                 
          </div>  
          <div>
            <div>
              <S.Input maxLength={60} value={email} placeholder="Enter Username" onChange={event => setEmail(event.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'password')} />
            </div>
            <div>
              <S.Input maxLength={60} id='password' type='password' value={password} placeholder="Enter Password" onChange={event => setPassword(event.target.value)} onKeyPress={(e:any) => handleKeyPress(e, 'login')} />
            </div>
            <div style={{marginTop: '40px'}}>
              <S.Button id='login' onClick={submitLogin}>
                Login
              </S.Button>
              <Link to="/forgotpassword" style={{color: `${colors.red2}`, float: 'right', marginTop: '10px'}}>Forgot password?</Link>
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
    margin-top: 5rem;
    @media (min-width: ${props => props.theme.viewport.mobile}) {
      margin-top: 7rem;  
    }
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin-top: 15rem;    
      display: flex;
    }
    @media (min-width: ${props => props.theme.viewport.desktop}) {
      margin-top: 15rem;    
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
    padding-bottom: 7px;

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
    width: 90%;
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
    height: 300px;
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
