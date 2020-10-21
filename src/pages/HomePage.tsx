import React from 'react'

import { HeaderContent } from '../layouts'
import { MenuList } from '../Sections'

export const HomePage: React.FC = () => (
  <HeaderContent>
    <div data-testid="home-page">
      <MenuList />
    </div>
  </HeaderContent>
)
