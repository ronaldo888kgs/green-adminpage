import { Button, Input, Image } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation, Link } from 'react-router-dom'
import { colors } from '../styles/variables'
import { TablePageTemplate } from './shared/templates/TablePageTemplate'
import Moment from 'moment';

export default function CollectionDetail() {
  const location = useLocation();
  // let create_date = location.state['create_date'];
  Moment.locale('en');

  return (
    <TablePageTemplate>
      <header>
        View Collection 
        <Link to='/collections' style={{float: 'right', background: '#2f353a', padding: '7px 15px 7px 15px', color: 'white', borderRadius: '5px'}}>Go to Collection List</Link>
      </header>
      <S.Content >
        <S.ImageDiv>
          <S.Image src = {location.state['image']}/>
        </S.ImageDiv>
        <S.DetailDiv>
          <S.Row>
            <div style={{width: '35%', display: 'inline-block'}}>Name: </div>
            <div style={{width: '65%', display: 'inline-block'}}>{location.state['name']}</div>
          </S.Row>
          <S.Row>
            <div style={{width: '35%', display: 'inline-block'}}>Description: </div>
            <div style={{width: '65%', display: 'inline-block'}}>
              <textarea style={{width: '100%', border: '0', alignContent: 'middle', lineHeight: '1.5rem', marginBottom: '-1.1rem'}} readOnly>{location.state['description']}</textarea>
            </div>
          </S.Row>
          <S.Row>
            <div style={{width: '35%', display: 'inline-block'}}>Status: </div>
            <div style={{width: '65%', display: 'inline-block'}}>{location.state['status']}</div>
          </S.Row>
          <S.Row>
            <div style={{width: '35%', display: 'inline-block'}}>Created Date: </div>
            <div style={{width: '65%', display: 'inline-block'}}>{Moment(location.state['create_date']).format('d MMMM YYYY')}</div>
          </S.Row>
        </S.DetailDiv>
      </S.Content>
    </TablePageTemplate>
  )
}

export const S = {
  ImageDiv: styled.div `
    text-align: center;
    width: 100%;
    border: 0;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: 200px;
      display: inline-block;
    }
  `,
  Image: styled(Image) `
    width: 150px;
    height: 150px;
  `,
  DetailDiv: styled.div `
    width: 100%;
    display: inline-block;
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: calc(90% - 200px);
      margin-left: 10%;
    }
  `,
  Row: styled.div `
    border-bottom: 1px solid ${props=>props.theme.gray['1']};
    line-height: 3rem;
  `,
  Content: styled.div `
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
