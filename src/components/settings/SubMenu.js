import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as IoIcons from 'react-icons/io';
import {AppContext} from '../../contexts'

const SidebarLink = styled(Link)`
  display: flex;
  color: #444;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #f5f5f5;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 14px;
  font-size: 16px;
  margin-bottom: 5px;
`;


const SubMenu = ({ item }) => {
  const history = useHistory();
  const { setUser } = useContext(AppContext)

  const onclick = () => {
    setUser({authenticated: false, username: '', email: '', firstname: '', lastname: ''})
    history.push('/')
  }
  return (
    <>
      <SidebarLink to={item.path} onClick={item.path=='#' && onclick}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>  
    </>
  );
};

export default SubMenu;