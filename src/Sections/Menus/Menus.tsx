import React from 'react'

import { useMenus } from '../../graphql/hooks'
import { Menu } from '.'

export const Menus = () => {
  const { loading, error, menus } = useMenus()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error?.message}</p>
  }

  return (
    <>
      {menus?.map((menu) => (
        <Menu menu={menu} />
      ))}
    </>
  )
}
