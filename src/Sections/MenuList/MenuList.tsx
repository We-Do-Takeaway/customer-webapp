import React from 'react'

import { useMenus } from '../../graphql/hooks'
import { MenuSummaryCard } from '../../components'

export const MenuList: React.FC = () => {
  const { loading, error, menus } = useMenus()

  if (loading) {
    return <></>
  }

  if (error) {
    return <p>Error: {error?.message}</p>
  }

  return (
    <>
      {menus?.nodes.map((menu) => (
        <MenuSummaryCard key={menu.id} menu={menu} />
      ))}
    </>
  )
}
