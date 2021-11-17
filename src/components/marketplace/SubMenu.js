import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as IoIcons from 'react-icons/io';

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
  font-weight: bold;
`;

const SubLabel = styled.span`
  margin-left: 13px;
  font-weight: normal;
`;

const DropdownLink = styled(Link)`
  background: #f1e8e8;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #444;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;
const SidebarButton = styled.button`
  color: red;
  border: 1px solid red;
  border-radius: 5px;
  align-items: center;
  list-style: none;
  height: 35px;
  width: 40%;
  margin-left: 20px;
  margin-top: 10px;
  text-decoration: none;
  &:hover {
    background: red;
    cursor: pointer;
    color: white;
  }
`;


const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const SubMenuDiv = styled.div`
    ${() => (item.type=='button' ? 'height: 100px;line-height: 30px; background-color: #f1e8e8;' : '')};    
  `;

  const showSubnav = () => setSubnav(!subnav);

  const subButtonClicked = (e, v) => {
    alert(v);
  }

  const collectionData = [
    {
      title: 'Collection 1',
      path: '#',
      icon: <IoIcons.IoIosPaper />
    },
    {
      title: 'Collection 2',
      path: '#',
      icon: <IoIcons.IoIosPaper />
    },
    {
      title: 'Collection 3',
      path: '#',
      icon: <IoIcons.IoIosPaper />
    }
  ];

  const [collections, setCollections] = useState(collectionData);
  const [searchKey, setSearchKey] = useState('');
  const collectionSearchHandler = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  }

  useEffect(()=>{
    if(searchKey == '') setCollections(collectionData);
    let newCollection = [];
    for(let i = 0; i < collectionData.length; i++) {
      if(collectionData[i].title.search(searchKey) != -1)
        newCollection.push(collectionData[i]);
    }
    setCollections(newCollection);
  },[searchKey])

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {/* {item.icon} */}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        <SubMenuDiv>
          {(item.title=='Sort by'||item.title=='Price')?
            item.subNav.map((subitem, index) => {
              return (             
                <SidebarButton key={index} onClick={(e)=>subButtonClicked(e, subitem.path)}>{subitem.title}</SidebarButton>
              )
            })
            :
            item.title=='Collections'?
            <div style={{backgroundColor: '#f1e8e8', paddingTop: '10px'}}>
              <div style={{margin: '0 0 10px 50px'}}>
                <input onChange = {(e) => collectionSearchHandler(e)} value={searchKey} type='text' placeholder='Search' style={{padding: '0.375rem 0.75rem', fontSize: '0.875rem',
                  fontWeight: '400', lineHeight: '1.5', color: '#5c6873', backgroundColor: '#fff', backgroundClip: 'padding-box', border: '1px solid #e4e7ea',
                  borderRadius: '0.25rem', marginBottom: '10px'}}></input>
              </div>
              {collections.map((subitem, index) => {
                return (
                  <DropdownLink to={subitem.path} key={index}>
                    {subitem.icon}
                    <SubLabel>{subitem.title}</SubLabel>
                  </DropdownLink>
                )
              })}
            </div>
            :
            item.subNav.map((subitem, index) => {
              return (
                <DropdownLink to={subitem.path} key={index}>
                  {subitem.icon}
                  <SubLabel>{subitem.title}</SubLabel>
                </DropdownLink>
              )
            })
          }        
        </SubMenuDiv>
      }
    </>
  );
};

export default SubMenu;