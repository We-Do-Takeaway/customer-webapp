import React from 'react'
import { MenuSection } from '../graphql/hooks'
import { ItemCard } from '.'

interface SectionDisplayProps {
  section: MenuSection
}

export const SectionDisplay: React.FC<SectionDisplayProps> = ({ section }) => (
  <div>
    <h2>{section.name}</h2>
    <p>{section.description}</p>
    {section.items?.map((item) => (
      <ItemCard item={item} />
    ))}
  </div>
)
