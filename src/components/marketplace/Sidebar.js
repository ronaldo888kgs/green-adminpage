import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import * as IoIcons from 'react-icons/io';

const NavLogo = styled(Link)`
  font-size: 2rem;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #c8ced3;
  justify-content: flex-start;
`;

const NavIcon = styled(Link)`
  font-size: 2rem;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #c8ced3;
  justify-content: space-between;
`;

const SidebarNav = styled.nav`
  background: #f7fbfb;
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 85px;
  color: #444;
  left: ${({ sidebar }) => (sidebar ? '0' : '-250px')};
  transition: 350ms;
  z-index: 10;
  overflow-y: scroll;

`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = ({sidebarChange}) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
    sidebarChange();
  }

  const FilterIcon = ()=> {
    return (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 30 30" height="1em" width="1em" style={{display: 'inline-block', marginBottom: '-15px'}}>
        <g>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path fillRule="nonzero" d="M14 14v6l-4 2v-8L4 5V3h16v2l-6 9zM6.404 5L12 13.394 17.596 5H6.404z"></path>
        </g>
      </svg>
    );
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#000000' }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <div>
                <FilterIcon />
                <div style={{fontSize: '16px',display: 'inline-block'}}>Filter</div>                
              </div>
              {sidebar? 
                <IoIcons.IoIosArrowRoundBack onClick={showSidebar} style={{ marginRight: '10px'}} />
                :
                <IoIcons.IoIosArrowRoundForward onClick={showSidebar} style={{ marginRight: '10px'}} />
              }
            </NavIcon>
            {sidebar&& SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;