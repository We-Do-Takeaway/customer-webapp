import React from 'react'

import { useMenus } from '../../graphql'
import { MenuSummaryCard } from '../../components'

export const MenuList: React.FC = () => {
  const { loading, errors, data: menus } = useMenus()

  if (loading) {
    return <></>
  }

  if (errors) {
    return (
      <>
        {errors.map((error) => (
          <p key={error.message}>{error.message}</p>
        ))}
      </>
    )
  }

  return (
    <>
      {menus?.map((menu) => (
        <MenuSummaryCard key={menu.id} menu={menu} />
      ))}
    </>
  )
}
