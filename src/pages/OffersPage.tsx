import React from 'react'
import styled from 'styled-components'
import * as IoIcons from 'react-icons/io';
import { TablePageTemplate } from './shared/templates/TablePageTemplate'

export default function OffersPage() {

  return (
    <TablePageTemplate>
      <header>
        <IoIcons.IoMdMenu style={{ fontSize: '20px', margin: '0 10px -5px'}} />
        Offer List
      </header>
      <S.TableDiv>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Sender name</th>
              <th>Reciever name</th>
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
