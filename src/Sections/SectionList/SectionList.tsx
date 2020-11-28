import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { ItemCard } from '../../components'
import { Section } from '../../graphql/hooks/useMenu'

interface SectionListProps {
  sections: Section[]
}

const useStyles = makeStyles({
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

export const SectionList: React.FC<SectionListProps> = ({ sections }) => {
  const classes = useStyles()

  return (
    <div data-testid="section-list">
      {sections.map((section) => (
        <div data-testid="section-list-section" key={section.id}>
          <h2 data-testid="section-title">{section.name}</h2>
          <p data-testid="section-description">{section.description}</p>
          <ul className={classes.items} data-testid="section-items">
            {section.items?.nodes.map((item) => (
              <li
                className={classes.item}
                key={item.id}
                data-testid="section-items-item"
              >
                <ItemCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
