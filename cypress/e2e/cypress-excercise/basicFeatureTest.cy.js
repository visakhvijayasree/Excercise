/// <reference types="cypress" />

describe('E2E test cases', () => {
  var mainData;

  before(() => {
    cy.fixture('main_Data').then((data) => {
      mainData = data;
    });
  });

  describe('E2E testing in BRIGHTHR portal', () => {
    before(() => {
      // LOGIN TO THE APP
      cy.visit('/lite');
      cy.get(mainData.elements.loginButton).click();
      cy.get(mainData.elements.email).type(mainData.values.emailValue);
      cy.get(mainData.elements.password).type(mainData.values.passwordValue);
      cy.get(mainData.elements.signInButton).click();
    });

    function callEmpNew(
      empFirstName,
      empLastName,
      empPhoneNumber,
      empJobTitle,
      empEmail
    ) {
      cy.get(mainData.elements.empFirstName).type(empFirstName);
      cy.get(mainData.elements.empLastName).type(empLastName);
      cy.get(mainData.elements.empEmail).type(empEmail);
      cy.get(mainData.elements.empPhoneNumber).type(empPhoneNumber);

      cy.get(mainData.elements.empJobTitle).type(empJobTitle);
      //get the current date
      const currentDate = new Date();
      const currentDayOfMonth = currentDate.getDate();
      cy.get(mainData.elements.empStartDate).click();
      cy.get(mainData.elements.empStartDate)
        .contains(currentDayOfMonth)
        .click();

      cy.get(mainData.elements.empSaveDetails).click();
    }

    it('Adding a new Employee ', () => {
      cy.get(mainData.elements.signOutButton).should('be.visible');
      cy.get(mainData.elements.homeButton).should('be.visible');
      cy.visit('/employee-hub');
      cy.get(mainData.elements.addEmployee).click();
      cy.wait(3500);
      callEmpNew(
        mainData.values.empAddFirstName,
        mainData.values.empAddLastName,
        mainData.values.empAddPhoneNumber,
        mainData.values.empAddJobTitle,
        mainData.values.empAddEmail
      );
      cy.get(mainData.elements.addAnotherEmp).click();

      callEmpNew(
        mainData.values.empAddAnotherFirstName,
        mainData.values.empAddAnotherLastName,
        mainData.values.empAddAnotherPhoneNumber,
        mainData.values.empAddAnotherJobTitle,
        mainData.values.empAddAnotherEmail
      );
      cy.visit('/employee-hub');

      cy.wait(3500);
      cy.contains(mainData.values.empAddFirstName).should('exist');
      cy.contains(mainData.values.empAddLastName).should('exist');
      cy.contains(mainData.values.empAddJobTitle).should('exist');

      cy.contains(mainData.values.empAddAnotherFirstName).should('exist');
      cy.contains(mainData.values.empAddAnotherLastName).should('exist');
      cy.contains(mainData.values.empAddAnotherJobTitle).should('exist');
    });

    it.skip('Deleting a new Employee ', () => {
      //delete existing employees
      cy.wait(3500);
      //delete all employees if exisiting
      cy.visit('/employee-hub');
      cy.get(mainData.elements.editButton).then(($elements) => {
        // Loop through each element and click on it
        $elements.each((index, element) => {
          cy.wrap(element).click();
          cy.get('a', {
            failOnStatusCode: false,
          })
            .contains(mainData.elements.deleteEmployeeRecord)
            .should('exist')
            .then(() => {
              cy.contains(mainData.elements.deleteEmployeeRecord).click();
              cy.get(mainData.elements.checkBoxConfirmDelete).click({
                force: true,
              });
              cy.get(mainData.elements.deleteEmployeeButton).click();
              cy.wait(5500);
            });
        });
      });
      //delete existing employees
    });
  });
});
