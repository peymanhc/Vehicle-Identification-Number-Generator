describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should display VIN Generator heading", () => {
    cy.contains("Vehicle Identification Number (VIN) Generator");
  });

  it("should generate VIN number", () => {
    cy.get('input[name="version"]').type("1379");
    cy.get('select[name="equipmentCode"]')
      .select("Base platform")
      .should("have.value", "000");
    cy.get('input[name="year"]').type("2021");
    cy.get('select[name="place"]').select("Turkey").should("have.value", "01");
    cy.get('input[name="serialNumber"]').type("1380");
    cy.get('[data-cy="generate"]').click();
    cy.get(".generated-vin").should("contain", "13790002021100138001");
    cy.get('[data-cy="search"]').click();
    cy.get('[data-cy="addVin"]').click();
  });
});
