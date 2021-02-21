import React from 'react'
import { useParams } from 'react-router-dom'

import { MenuDetailCard } from '../components'
import { useMenu } from '../graphql'
import { SectionList } from '../Sections'

interface MenuParams {
  menuId: string
}

export const MenuPage: React.FC = () => {
  const { menuId } = useParams<MenuParams>()
  const { loading, errors, data } = useMenu(menuId)

  return (
    <>
      {loading && <p>Loading...</p>}
      {errors &&
        errors.map((error) => <p key={error.message}>{error.message}</p>)}

      <header>{data && <MenuDetailCard menu={data} />}</header>
      {data && data.sections && <SectionList sections={data?.sections} />}
    </>
  )
}
