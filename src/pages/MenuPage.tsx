import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useParams } from 'react-router-dom'

import { HeaderContent } from '../layouts'
import { useMenu } from '../graphql/hooks'
import { ItemCard } from '../components'

interface MenuParams {
  menuId: string
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  item: {
    flex: '0 1 44%',
    marginBottom: 16,
    border: '1px solid transparent',
    borderRadius: 2,
  },
})

export const MenuPage: React.FC = () => {
  const { menuId } = useParams<MenuParams>()
  const { loading, error, menu } = useMenu(menuId)
  const classes = useStyles()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error?.message}</p>
  }

  return (
    <HeaderContent>
      <header>
        <h1>{menu?.name}</h1>
        <p>{menu?.description}</p>
        <p>{menu?.introduction}</p>
      </header>
      {menu &&
        menu?.sections?.map((section) => (
          <div key={section.id}>
            <h2>{section.name}</h2>
            <p>{section.description}</p>
            <ul className={classes.items}>
              {section.items?.map((item) => (
                <li className={classes.item} key={item.id}>
                  <ItemCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
    </HeaderContent>
  )
}
