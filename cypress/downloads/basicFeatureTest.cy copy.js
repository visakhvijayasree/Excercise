/// <reference types="cypress" />

describe('E2E test cases', () => {
  var xeData;
  describe('E2E testing in Currency Converter Page', () => {
    var xeData;

    before(() => {
      cy.fixture('xe_data').then((data) => {
        xeData = data;
      });
    });
    beforeEach(() => {
      cy.visit(xeData.values.url_currencyConverter);
    });

    it('Validating error message when alphabet characters are entered instead of numerical characters', () => {
      var errorText = xeData.values.errorForAlphabetsEntry;
      cy.get(xeData.elements.amountErrorIndication).should('not.be.visible');
      cy.get(xeData.elements.amountTextField).type(xeData.values.invalidInputs);
      cy.get(xeData.elements.amountErrorIndication).should(
        'have.text',
        errorText
      );
    });

    it('Validating the from field features the option INR - Indian Rupee', () => {
      var market_INR = xeData.values.market_INR;
      var market_India = xeData.values.market_India;
      var fromField = xeData.elements.fromMarketCurrency;
      cy.get(fromField).click();

      cy.get(xeData.elements.liMarket_INR).click();
      cy.contains(market_INR);
      cy.contains(market_India);
    });

    it('Validating the conversion form features the Convert button', () => {
      var fromField = xeData.elements.fromMarketCurrency;
      var toField = xeData.elements.toMarketCurrency;
      //set "FROM" field to GBP
      cy.get(fromField).click();
      cy.get(xeData.elements.liMarket_GBP).click();
      //set "TO" field to EUR
      //cy.get(toField).click();
      cy.get(xeData.elements.toMarketCurrency)
        .type(xeData.values.market_EUR)
        .click();
      cy.get(xeData.elements.amountTextField).type(xeData.values.validInputs);
      cy.contains('button', xeData.values.buttonConvert).click({ force: true });
    });
  });
  describe('E2E testing in Send Money Page', () => {
    before(() => {
      cy.fixture('xe_data').then((data) => {
        xeData = data;
      });
    });
    beforeEach(() => {
      cy.visit(xeData.values.url_sendMoney);
    });

    it('Validating Register Now button is enabled once the email and password fields are entered', () => {
      //var errorText = xeData.values.errorForAlphabetsEntry;
      cy.contains(xeData.values.signInSendPage).click();

      cy.contains('button', xeData.values.buttonRegisterNow).should(
        'be.disabled'
      );

      //   cy.get(xeData.elements.amountErrorIndication).should('not.be.visible');
      cy.get(xeData.elements.email).type(xeData.values.emailValue, {
        force: true,
      });
      cy.get(xeData.elements.password).type(xeData.values.passwordValue, {
        force: true,
      });
      cy.contains('button', xeData.values.buttonRegisterNow).should(
        'not.be.disabled'
      );
    });
  });
});
