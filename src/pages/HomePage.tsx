import React from 'react'

import { HeaderContent } from '../layouts'
import { MenusSection } from '../Sections'

export const HomePage: React.FC = () => (
  <HeaderContent>
    <div data-testid="home-page">
      <MenusSection />
    </div>
  </HeaderContent>
)
