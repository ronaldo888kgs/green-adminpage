import { Button, Input } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../styles/variables'
import { TablePageTemplate } from './shared/templates/TablePageTemplate'

export default function SettingsPage() {

  const[searchKey, setSearchKey] = useState('');
  const searchHandler = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  }

  return (
    <TablePageTemplate>
      <header>
        Settings 
      </header>
      <S.ActionDIv >
        <div style={{marginBottom: '10px'}}>Admin Commission</div>
        <S.Input onChange = {(e) => searchHandler(e)} value={searchKey} type='text' placeholder='Type into Comminsion'></S.Input>
        <S.Button>
          Save
        </S.Button>
      </S.ActionDIv>
    </TablePageTemplate>
  )
}

export const S = {
  ActionDIv: styled.div `
    width: 100%;
    margin: 20px 20px 0 20px;
    border-radius: 5px;
    cursor: pointer;
    float: right;
  `,  
  Button: styled(Button)`
    background-color: ${colors.red1};
    color: ${colors.white};
    border-radius: 5px !important;
    padding: 3px 15px 5px 15px !important;
    cursor: pointer !important;
    margin-top: 10px;
    margin-bottom: 20px;

    &:hover,
    &:active,
    &:focus {
      background-color: ${colors.red2};
      opacity: 0.8;
    }
  `,
  Input: styled(Input)`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #5c6873;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e4e7ea;
    border-radius: 0.25rem;
    margin-bottom: 10px;
    width: 100%;
  `
}
