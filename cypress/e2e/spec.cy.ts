describe('Star Wars', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display page controls', () => {
    cy.get('[testId="result"]').should('be.visible');
    cy.get('[testId="button"]').should('be.visible').and('contain', 'Search');

    cy.get('[testId="filters"]')
      .should('be.visible')
      .and('contain', 'People')
      .and('contain', 'Starships')
      .and('contain', 'Height')
      .and('contain', 'Mass');

    cy.get('[testId="winner"]')
      .should('be.visible')
      .and('contain', 'Player One Score')
      .and('contain', 'Player Two Score');
  });

  describe('With people height filter active', () => {
    it('should announce winner when "Search"', () => {
      let count = 0;
      cy.intercept('GET', '/api/people/*', (req) => {
        count++;
        if (count === 1) {
          req.reply({ fixture: 'person1.json' });
        } else if (count === 2) {
          req.reply({ fixture: 'person2.json' });
        }
      });
      cy.get('[testId="button"]').click();

      cy.get('[testId="winner"]').should('contain', 'Player Two Wins!');
      cy.get('[testId="playerOneScore"]').should('contain', 0);
      cy.get('[testId="playerTwoScore"]').should('contain', 1);
    });

    it('should announce draw when "Search"', () => {
      cy.intercept('GET', '/api/people/*', { fixture: 'person1.json' });
      cy.get('[testId="button"]').click();

      cy.get('[testId="winner"]').should('contain', "It's a draw!");
      cy.get('[testId="playerOneScore"]').should('contain', 0);
      cy.get('[testId="playerTwoScore"]').should('contain', 0);
    });
  });

  describe('With starships length filter active', () => {
    it('should announce winner when "Search"', () => {
      cy.get('[testId="starshipsFilter"]').click();
      cy.get('[testId="starshipsLengthFilter"]').click();

      let count = 0;
      cy.intercept('GET', '/api/starships/*', (req) => {
        count++;
        if (count === 1) {
          req.reply({ fixture: 'starship1.json' });
        } else if (count === 2) {
          req.reply({ fixture: 'starship2.json' });
        }
      });
      cy.get('[testId="button"]').click();

      cy.get('[testId="winner"]').should('contain', 'Player One Wins!');
      cy.get('[testId="playerOneScore"]').should('contain', 1);
      cy.get('[testId="playerTwoScore"]').should('contain', 0);
    });

    it('should announce draw when "Search"', () => {
      cy.get('[testId="starshipsFilter"]').click();
      cy.get('[testId="starshipsLengthFilter"]').click();

      cy.intercept('GET', '/api/starships/*', { fixture: 'starship1.json' });
      cy.get('[testId="button"]').click();

      cy.get('[testId="winner"]').should('contain', "It's a draw!");
      cy.get('[testId="playerOneScore"]').should('contain', 0);
      cy.get('[testId="playerTwoScore"]').should('contain', 0);
    });
  });
});
