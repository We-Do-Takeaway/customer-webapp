const sectionSel = (sectionNumber: number) =>
  `[data-testid="section-list-section"]:nth-child(${sectionNumber})`
const sectionItemSel = (sectionNumber: number, itemNumber: number) =>
  `[data-testid="section-list-section"]:nth-child(${sectionNumber}) [data-testid="section-items-item"]:nth-child(${itemNumber})`

context('Menu page', () => {
  before(() => {
    cy.visit('/menu/600dca30-c6e2-4035-ad15-783c122d6ea1')
  })

  it('display menu details', () => {
    cy.get('h2[data-testid="menu-detail-card-title"]')
      .first()
      .should('contain', 'Cafe comfort and waffles')

    cy.get('p[data-testid="menu-detail-card-description"]')
      .first()
      .should(
        'contain',
        "The cafe is all about food to make you feel better when you can't face the world or feel like you are going crazy. Have an all day breakfast, your mothers Sunday roast or help yourself to the biggest bowl of ice-cream will lots of extras"
      )
  })

  it('display sections', () => {
    cy.get('[data-testid="section-list"]').should('be.visible')
    cy.get('[data-testid="section-list-section"]').should('have.length', 2)
  })

  describe('Sections', () => {
    describe('Main menu', () => {
      it('show the main section title and description first', () => {
        cy.get(sectionSel(1)).within(() => {
          cy.get('[data-testid="section-title"]').should('contain', 'Main')
          cy.get('[data-testid="section-description"]').should(
            'contain',
            'Stuff to fill you up'
          )
        })
      })

      it('has one item in the main section', () => {
        cy.get(`${sectionSel(1)} [data-testid="item-card"]`).should(
          'have.length',
          1
        )
      })

      it('first main section item is a bowl of sausages', () => {
        cy.get(sectionItemSel(1, 1)).within(() => {
          cy.get('[data-testid="item-card-title"]').should(
            'contain',
            'Plate of sausages'
          )
          cy.get('[data-testid="item-card-description"]').should(
            'contain',
            'Big bowl of sausages'
          )

          cy.get('[data-testid="item-card-image"]')
            .should('have.css', 'background-image')
            .and(
              'contain',
              'url("https://www.wedotakeaway.com/images/sausages.jpg")'
            )
        })
      })
    })

    describe('Desert', () => {
      it('show the desert section title and description second', () => {
        cy.get(sectionSel(2)).within(() => {
          cy.get('[data-testid="section-title"]').should('contain', 'Desert')

          cy.get('[data-testid="section-description"]').should(
            'contain',
            'The best stuff'
          )
        })
      })

      it('has 2 items in the desert section', () => {
        cy.get(`${sectionSel(2)} [data-testid="item-card"]`).should(
          'have.length',
          2
        )
      })

      it('1st  desert item is a bowl of cherries', () => {
        cy.get(sectionItemSel(2, 1)).within(() => {
          cy.get('[data-testid="item-card-title"]').should(
            'contain',
            'Bowl of cherries'
          )

          cy.get('[data-testid="item-card-description"]').should(
            'contain',
            'Big bowl of cherries'
          )

          cy.get('[data-testid="item-card-image"]')
            .should('have.css', 'background-image')
            .and(
              'contain',
              'url("https://www.wedotakeaway.com/images/cherries.jpg")'
            )
        })
      })

      it('2nd desert item is Chocolate ice-cream surprise', () => {
        cy.get(sectionItemSel(2, 2)).within(() => {
          cy.get('[data-testid="item-card-title"]').should(
            'contain',
            'Chocolate ice-cream surprise'
          )

          cy.get('[data-testid="item-card-description"]').should(
            'contain',
            'An amazing mixture of chocolate and cherries'
          )

          cy.get('[data-testid="item-card-image"]')
            .should('have.css', 'background-image')
            .and(
              'contain',
              'url("https://www.wedotakeaway.com/images/choc-ice-cream.webp")'
            )
        })
      })
    })
  })
})
