import React from 'react'

import { Section } from '../graphql'
import { ItemCard } from '.'

interface SectionDisplayProps {
  section: Section
}

export const SectionDisplay: React.FC<SectionDisplayProps> = ({ section }) => (
  <div>
    <h2>{section.name}</h2>
    <p>{section.description}</p>
    {(section.items || []).map((item) => (
      <ItemCard item={item} />
    ))}
  </div>
)
