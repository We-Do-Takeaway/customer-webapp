import React from 'react'

import { HeaderContent } from '../../layouts'
import { Menus } from '../../Sections'

export const Home: React.FC = () => (
  <HeaderContent>
    <div data-testid="home">
      <Menus />
    </div>
  </HeaderContent>
)
