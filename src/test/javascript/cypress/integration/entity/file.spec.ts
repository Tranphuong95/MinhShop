import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('File e2e test', () =>
{
  let startingEntitiesCount = 0;

  before(() =>
  {
    cy.window().then(win =>
    {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/files*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('file');
    cy.wait('@entitiesRequest').then(({request, response}) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Files', () =>
  {
    cy.intercept('GET', '/api/files*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('file');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('File').should('exist');
    if (startingEntitiesCount === 0)
    {
      cy.get(entityTableSelector).should('not.exist');
    }
    else
    {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details File page', () =>
  {
    cy.intercept('GET', '/api/files*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('file');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0)
    {
      cy.get(entityDetailsButtonSelector).first().click({force: true});
      cy.getEntityDetailsHeading('file');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create File page', () =>
  {
    cy.intercept('GET', '/api/files*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('file');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('File');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit File page', () =>
  {
    cy.intercept('GET', '/api/files*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('file');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0)
    {
      cy.get(entityEditButtonSelector).first().click({force: true});
      cy.getEntityCreateUpdateHeading('File');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of File', () =>
  {
    cy.intercept('GET', '/api/files*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('file');
    cy.wait('@entitiesRequest').then(({request, response}) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('File');

    cy.get(`[data-cy="uuid"]`)
      .type('fbb5d871-dd42-4e20-b92a-a095ef01f7c1')
      .invoke('val')
      .should('match', new RegExp('fbb5d871-dd42-4e20-b92a-a095ef01f7c1'));

    cy.get(`[data-cy="pathFileOriginal"]`)
      .type('Brand Kenya generation', {force: true})
      .invoke('val')
      .should('match', new RegExp('Brand Kenya generation'));

    cy.get(`[data-cy="pathFileProcessed"]`).type('Solutions', {force: true}).invoke('val').should('match', new RegExp('Solutions'));

    cy.get(`[data-cy="nameFile"]`)
      .type('web functionalities', {force: true})
      .invoke('val')
      .should('match', new RegExp('web functionalities'));

    cy.get(`[data-cy="extension"]`).type('Synergized Glove', {force: true}).invoke('val').should('match', new RegExp('Synergized Glove'));

    cy.get(`[data-cy="typeFile"]`).type('Peso', {force: true}).invoke('val').should('match', new RegExp('Peso'));

    cy.get(`[data-cy="processed"]`).should('not.be.checked');
    cy.get(`[data-cy="processed"]`).click().should('be.checked');

    cy.get(`[data-cy="searchField"]`)
      .type('../fake-data/blob/hipster.txt', {force: true})
      .invoke('val')
      .should('match', new RegExp('../fake-data/blob/hipster.txt'));

    cy.get(`[data-cy="role"]`)
      .type('Vermont Summit structure', {force: true})
      .invoke('val')
      .should('match', new RegExp('Vermont Summit structure'));

    cy.get(`[data-cy="createdDate"]`).type('2021-01-29T19:04').invoke('val').should('equal', '2021-01-29T19:04');

    cy.get(`[data-cy="modifiedDate"]`).type('2021-01-30T04:51').invoke('val').should('equal', '2021-01-30T04:51');

    cy.get(`[data-cy="createdBy"]`)
      .type('virtual Paradigm Tools', {force: true})
      .invoke('val')
      .should('match', new RegExp('virtual Paradigm Tools'));

    cy.get(`[data-cy="modifiedBy"]`).type('Monitored', {force: true}).invoke('val').should('match', new RegExp('Monitored'));

    cy.get(`[data-cy="dataSize"]`).type('33435').should('have.value', '33435');

    cy.get(`[data-cy="comment"]`).type('lavender', {force: true}).invoke('val').should('match', new RegExp('lavender'));

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/files*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('file');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of File', () =>
  {
    cy.intercept('GET', '/api/files*').as('entitiesRequest');
    cy.intercept('GET', '/api/files/*').as('dialogDeleteRequest');
    cy.intercept('DELETE', '/api/files/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('file');
    cy.wait('@entitiesRequest').then(({request, response}) =>
    {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0)
      {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('file').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/files*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('file');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
