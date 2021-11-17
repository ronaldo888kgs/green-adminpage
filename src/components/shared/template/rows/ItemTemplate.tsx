import { Skeleton, Spin } from 'antd'
import React, { ReactNode, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import notFound from '../../../../assets/notfound.svg'
import { imgLH3, safeIpfsUrl } from '../../../../services/UtilService'
import { colorsV2, fonts, viewportV2 } from '../../../../styles/variables'
import * as IoIcons from 'react-icons/io';

export type ItemTemplateProps = {
  id?: string
  like_count?: number
  image?:string
  name?: string
  description?: string
  price?: number
  status?: number
  create_date?: string
  className?: string
  loading?: boolean
  children?: ReactNode
}

export function ItemTemplate({
  id,
  like_count,
  image,
  name,
  description,
  price,
  status,
  create_date,
  loading,
  className,
  children
}: ItemTemplateProps) {
  const history = useHistory();
  const metadataImage = image
  const [selectedImage, setSelectedImage] = useState(metadataImage || notFound)
  const onImageError = () => {
    setSelectedImage(notFound)
  }

  const detailView = () =>{
    history.push({ pathname: '/item/detail', state: {image: image, name: name, description: description, status: status, create_date: create_date}});
  }
  return (
    <S.Row>
      <S.Content>
        <Spin indicator={<Skeleton.Avatar active size={40} shape='circle' />} spinning={!!loading} />
        <div style={{height: '50px', width: '70px'}}>
          <S.Img
            src={imgLH3(selectedImage, 400)}
            className={selectedImage === notFound ? 'img-fail' : ''}
            onError={onImageError}
            alt={name || 'not found'}
            hidden={!!loading}
            loading='lazy'
          />
        </div>
        <div style={{height: '50px', width: '150px', borderLeft: '1px solid #c8ced3', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div>{name}</div>
        </div>
        <div style={{height: '50px', width: '50%', borderLeft: '1px solid #c8ced3', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <textarea style={{width: '100%', border: '0', textAlign: 'center', alignContent: 'middle'}} value={description} readOnly />          
        </div>
        <div style={{height: '50px', width: '70px', borderLeft: '1px solid #c8ced3'}}>
          <div>{price}</div>
        </div>
        <div style={{height: '50px', width: '83px', borderLeft: '1px solid #c8ced3', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {like_count}
        </div>
        <div style={{height: '50px', width: '83px', borderLeft: '1px solid #c8ced3', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {status}
        </div>
        <div style={{height: '50px', width: '83px', borderLeft: '1px solid #c8ced3', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {create_date}
        </div>
        <div style={{height: '50px', width: '10%', borderLeft: '1px solid #c8ced3', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <IoIcons.IoMdEye onClick={detailView} />
        </div>
      </S.Content>
      <div className={className}>{children}</div>
    </S.Row>
  )
}

export const S = {
  Row: styled.div`
    width: 100%;
    box-sizing: border-box;
    background: ${props=>props.theme.white};
    margin: 0 auto;

    &:hover {
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow ease-in 250ms;
    }

    .ant-spin.ant-spin-spinning {
      width: 100%;
      height: auto;
      max-height: 40px;
      margin: auto;
    }
  `,
  Content: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    text-align: center;
  `,
  Img: styled.img`
    width: 50px;
    height: auto;
    max-height: 50px;
    -webkit-user-drag: none;
  `,
  Tag: styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 32px;
    background: ${props=>props.theme.white};
    padding: 10px;
    border-radius: 16px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: ${props=>props.theme.black};
    font-family: ${fonts.nunito};
  `,

  Tags: styled.aside`
    position: absolute;
    margin-top: -48px;
    margin-left: 16px;
    width: auto;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      margin-right: 10px;
    }
  `,
  LoadArea: styled.div`
    width: 1000%;
  `
}
