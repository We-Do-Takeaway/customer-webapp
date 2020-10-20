import { Link } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'

import { MenuDetailCard } from '../components'
import { useMenu } from '../graphql/hooks'
import { HeaderContent } from '../layouts'
import { SectionList } from '../Sections'

interface MenuParams {
  menuId: string
}

const BreadCrumb = () => (
  <>
    <Link component={RouterLink} to="/" color="inherit">
      Menus
    </Link>
  </>
)

export const MenuPage: React.FC = () => {
  const { menuId } = useParams<MenuParams>()
  const { loading, error, menu } = useMenu(menuId)

  return (
    <HeaderContent breadcrumbs={<BreadCrumb />}>
      {loading && <p>Loading...</p>}
      {error && <p>{error?.message}</p>}
      <header>{menu && <MenuDetailCard menu={menu} />}</header>
      {menu && menu.sections && <SectionList sections={menu.sections} />}
    </HeaderContent>
  )
}
