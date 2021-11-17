import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../styles/variables'
import * as IoIcons from 'react-icons/io';
import { TablePageTemplate } from './shared/templates/TablePageTemplate'
import { useGlobalConfig } from '../hooks/ConfigHook'
import { useItems } from '../hooks/ItemHooks'
import { collection } from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroll-component'
import { ItemTemplate } from '../components/shared/template/rows/ItemTemplate'
import { API } from '../constants/api'
import { FooterCardMarketplaceLoading } from '../components/marketplace/FooterCardMarketplaceLoading'

export default function CollectionsPage() {
  const [searchKey, setSearchKey] = useState('')
  const[searchName, setSearchName] = useState('');
  const { paginationLimit } = useGlobalConfig()

  const { loading, hasMore, loadMore, items } = useItems(searchName, 20)
  const loader = (
    <S.CardsContainer>
      {[...Array(paginationLimit)].map(() => (
        // <CollectionTemplate key={`loading-${Math.random()}`} loading >
          <FooterCardMarketplaceLoading key={`loading-${Math.random()}`} loading />
        // </CollectionTemplate>
      ))}
    </S.CardsContainer>
  )

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  }

  const onSearch = () => {
    setSearchName(searchKey)
  }

  return (
    <TablePageTemplate>
      <header>
        <IoIcons.IoMdMenu style={{ fontSize: '20px', margin: '0 10px -5px'}} />
        Item List 
      </header>
      <S.ActionDIv >
        <S.Input onChange = {(e) => searchHandler(e)} value={searchKey} type='text' placeholder='Search'></S.Input>
        <div style={{display: 'inline-block', width: '230px'}}>
          <S.Button onClick={onSearch}>
            <IoIcons.IoMdSearch style={{width: '20px', height: '20px', marginBottom: '-7px'}} />
            Search
          </S.Button>
          <S.Button>
            <IoIcons.IoMdSync style={{width: '20px', height: '20px', marginBottom: '-5px'}} />
            Reset
          </S.Button>
        </div>
      </S.ActionDIv>
      <S.TableDiv>
        <InfiniteScroll next={loadMore} hasMore={hasMore} loader={loader} dataLength={items.length} style={{border: '1px solid #c8ced3'}}>
          <S.CardsContainer>
            <S.Header>
              <div>
                Image
              </div>
              <div>
                Name
              </div>
              <div>
                Description
              </div>
              <div>
                Price
              </div>
              <div>
                Like Count
              </div>
              <div>
                Status
              </div>
              <div>
                Action
              </div>
            </S.Header>
            {items.map(item => {
              const image = API.server_url + API.item_logo_image + String(item?.image)
              return (
                <ItemTemplate
                  key={`${item.id}`}
                  id={item.id}
                  image={image}
                  name={String(item?.name)}
                  description={item?.description}
                  price={item?.price}
                  like_count={item?.like_count}
                  status={item?.status}
                  create_date = {item?.create_date}
                  >
                </ItemTemplate>
              )
            })}
          </S.CardsContainer>
        </InfiniteScroll>
        {!loading && !collection.length && 
          <nav>
            <ul>
              <li>
                <a>Loading...</a>
              </li>
            </ul>
          </nav>
        }
      </S.TableDiv>
    </TablePageTemplate>
  )
}

export const S = {
  Header: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    text-align: center;

    div {
      height: 50px;
      padding-top: 15px;
      display: inline-block;
    }

    div: nth-child(1) {
      width: 79px;

      @media (min-width: ${props => props.theme.viewport.tablet}) {
        width: 70px;
      }
      @media (min-width: ${props => props.theme.viewport.desktop}) {
        width: 71px;
      }
      @media (min-width: ${props => props.theme.viewport.desktopl}) {
        width: 70px;
      }
      @media (min-width: ${props => props.theme.viewport.desktopll}) {
        width: 70px;
      }
      @media (min-width: ${props => props.theme.viewport.desktopXl}) {
        width: 70px;
      }
    }

    div: nth-child(2) {
      width: 168px;
      border-left: 1px solid #c8ced3;

      @media (min-width: ${props => props.theme.viewport.tablet}) {
        width: 150px;
      }
      @media (min-width: ${props => props.theme.viewport.desktopXl}) {
        width: 150px;
      }
    }

    div: nth-child(3) {
      width: 46%;
      border-left: 1px solid #c8ced3;

      @media (min-width: ${props => props.theme.viewport.tablet}) {
        width: 40%;
      }
    }

    div: nth-child(4) {
      width: 78px;
      border-left: 1px solid #c8ced3;

      @media (min-width: ${props => props.theme.viewport.tablet}) {
        width: 71px;
      }
      @media (min-width: ${props => props.theme.viewport.desktop}) {
        width: 70px;
      }
      @media (min-width: ${props => props.theme.viewport.desktopXl}) {
        width: 70px;
      }
    }

    div: nth-child(5) {
      width: 93px;
      border-left: 1px solid #c8ced3;

      @media (min-width: ${props => props.theme.viewport.tablet}) {
        width: 83px;
      }
      @media (min-width: ${props => props.theme.viewport.desktopXl}) {
        width: 83px;
      }
    }

    
    div: nth-child(6) {
      width: 10%;
      border-left: 1px solid #c8ced3;
    }
    
    div: nth-child(7) {
      width: 10%;
      border-left: 1px solid #c8ced3;
    }
  `,
  ActionDIv: styled.div `
    width: 100%;
    margin: 20px 20px 0 20px;
    border-radius: 5px;
    cursor: pointer;
    float: right;
  `,
  CardsContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1px;
    justify-content: flex-start;
    align-items: flex-start;
  `,
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
  `,
  Button: styled(Button)`
    margin-right: 20px !important;
    background-color: ${colors.red1};
    color: ${colors.white};
    border-radius: 5px !important;
    padding: 3px 15px 5px 15px !important;
    cursor: pointer !important;
    margin-top: 10px;

    &:hover,
    &:active,
    &:focus {
      background-color: ${colors.red2};
      opacity: 0.8;
    }
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      margin-bottom: 0px;
      margin-right: 0px !important;
      margin-left: 20px !important;
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
    display: inline-block;

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      width: calc(100% - 230px);
    }
  `
}
