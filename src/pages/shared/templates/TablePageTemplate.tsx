import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components'
import {AppContext} from '../../../contexts';

export type TemplatePageProps = {
  children: ReactNode
}

export function TablePageTemplate({ children }: TemplatePageProps) {
  const { isOpenDrawer } = useContext(AppContext);

  return (
    <>    
    <S.Container sidebar={isOpenDrawer} > 
      <S.Content>
        {children}
      </S.Content>      
    </S.Container>
    </>
  )
}

export const S = {  
  Container: styled.div<{ sidebar:boolean; }> `
    width: 100%;
    padding: 24px;
    padding-left: 24px;
    width: 100%;
    background: ${props => props.theme.white};
    display: block;
    align-items: center;
    min-height: calc(100vh - 67px);

    @media (min-width: ${props => props.theme.viewport.mobile}) {
      min-height: calc(100vh - 44px);
    }
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      padding: ${props => props.theme.margin.small};
      ${props => props.sidebar && 'padding-left: 262px !important;'}
    }

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      ${props => props.sidebar && 'padding-left: 262px !important;'}
    }
  `,
  Content: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 90px;
    border-radius: 5px;
    border: 1px solid #c8ced3;
    width: 100%;

    header {
      width: 100%;
      padding: 0.75rem 1.25rem;
      margin-bottom: 0;
      background-color: #f0f3f5;
      border-bottom: 1px solid #c8ced3;
    }

    @media (min-width: ${props => props.theme.viewport.tablet}) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      grid-template-columns: repeat(1, 1fr);

      > div:last-of-type {
        margin-bottom: 2vw;
      }
    }

    @media (min-width: ${props => props.theme.viewport.desktopXl}) {
      grid-template-columns: repeat(1, 1fr);

      > div:last-of-type {
        margin-bottom: 2vw;
      }
    }
  `
}
