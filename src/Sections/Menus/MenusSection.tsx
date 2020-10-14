import React from 'react'

import { useMenus } from '../../graphql/hooks'
import { MenusSectionItem } from '.'

export const MenusSection = () => {
  const { loading, error, menus } = useMenus()

  if (loading) {
    return <></>
  }

  if (error) {
    return <p>Error: {error?.message}</p>
  }

  return (
    <>
      {menus?.map((menu) => (
        <MenusSectionItem key={menu.id} menu={menu} />
      ))}
    </>
  )
}
