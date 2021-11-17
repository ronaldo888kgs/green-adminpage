import React, { useState } from 'react'
import styled from 'styled-components'
import * as IoIcons from 'react-icons/io';
import { TablePageTemplate } from './shared/templates/TablePageTemplate'
import {
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(()=>({
  select: {
    wordWrap: 'normal',
    textTransform: 'none',
    display: 'inline-block',
    width: '100%',
    height: 'calc(1.5em + 0.75rem + 2px)',
    padding: '0.375rem 1.75rem 0.375rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#5c6873',
    verticalAlign: 'middle',
    backgroundColor: '#fff',
    border: '1px solid #e4e7ea',
    borderRadius: '0.25rem',
    background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%232f353a' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px`,
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none'
  }
}));

export default function ActivitiesPage() {
  const classes = useStyles();
  return (
    <TablePageTemplate>
      <header>
        <IoIcons.IoMdMenu style={{ fontSize: '20px', margin: '0 10px -5px'}} />
        Activity List
      </header>
      <S.TableDiv>
        <table>
          <thead>
            <tr>
              <th>Collection</th>
              <th>Item</th>
              <th>
                <div>Event</div>                  
                <select className={classes.select}>
                  <option value='all'>All</option>
                  <option value='minted'>Minted</option>
                  <option value='transfer'>Bids</option>
                  <option value='transfer'>Transfer</option>
                  <option value='commission'>Commission</option>
                  <option value='admincommission'>Admin Commission</option>
                </select>
              </th>
              <th>Price</th>
              <th>From</th>
              <th>To</th>
              <th>Transaction Hash</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <nav>
          <ul>
            <li>
              <a>Loading...</a>
            </li>
          </ul>
        </nav>
      </S.TableDiv>
    </TablePageTemplate>
  )
}

export const S = {
  TableDiv: styled.div `
    width: 100%;
    margin: 20px;
    background-color: #e4e7ea;
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
    overflow-x: auto;

    table {
      border: 1px solid #c8ced3;
      width: 100%;
      margin-bottom: 1rem;
      color: #23282c;
      
      th {
        vertical-align: bottom;
        border: 1px solid #c8ced3;
        border-bottom-width: 2px;
      }
  `
}
