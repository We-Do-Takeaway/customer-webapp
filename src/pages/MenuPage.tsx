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
  const { loading, error, menu } = useMenu(menuId)

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error?.message}</p>}
      <header>{menu && <MenuDetailCard menu={menu} />}</header>
      {menu && menu.sections && <SectionList sections={menu.sections.nodes} />}
    </>
  )
}

// TODO - re-introduce breadcrumbs
