import React from 'react'

import { HeaderContent } from '../layouts'
import { MenusSection } from '../Sections'

export const HomePage: React.FC = () => (
  <HeaderContent>
    <div data-testid="home">
      <MenusSection />
    </div>
  </HeaderContent>
)
